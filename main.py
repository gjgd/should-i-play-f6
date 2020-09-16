import re
import datetime
import pprint as pp
import json
from tqdm import tqdm

db_name = "lichess_db_standard_rated_2020-07.pgn"

def sanitize_move(move):
    # Remove annotation, captures and checks and mate
    sanitized_move = re.sub(r'[?!x+#]', '', move)
    # Remove position character. Example: R1d1 -> Rd1 or Ndf2 -> Nf2
    if len(sanitized_move) == 4 and sanitized_move[0] in ['R', 'N', 'Q', 'B']:
        sanitized_move = sanitized_move[0] + sanitized_move[2:]
    return sanitized_move

def record_move(database, elo, color, move, score, move_index=None):
    move_index = move_index if move_index is None else int(move_index)
    if move_index is None:
        # All
        game_period = 'A'
    elif move_index < 10:
        # Opening
        game_period = 'O'
    elif move_index > 40:
        # Endgame
        game_period = 'E'
    else:
        # Middlegame
        game_period = 'M'
    if color not in database:
        database[color] = {}
    if move not in database[color]:
        database[color][move] = {}
    str_elo = str(elo)
    if str_elo not in database[color][move]:
        database[color][move][str_elo] = {}
    if game_period not in database[color][move][str_elo]:
        database[color][move][str_elo][game_period] = {}
    scores = score.split('-')
    assert(len(scores) == 2)
    individual_score = scores[0] if color == 'white' else scores[1]
    if individual_score not in database[color][move][str_elo][game_period]:
        database[color][move][str_elo][game_period][individual_score] = 1
    else:
        database[color][move][str_elo][game_period][individual_score] += 1

limit = 1e5
n = 0
all_games = {}
white_elo = 0
black_elo = 0
with tqdm(total=limit) as pbar:
    with open(db_name) as f:
        for line in f:
            line = line.rstrip()
            # Get the line in the PGN that lists the moves
            if "[WhiteElo" in line:
                white_elo = int(re.findall('[WhiteElo] "(.*)"', line)[0])
            if "[BlackElo" in line:
                black_elo = int(re.findall('[BlackElo] "(.*)"', line)[0])
            if "1. " in line:
                game_elo = (white_elo + black_elo) / 2
                game_elo = int(game_elo - game_elo % 100)
                white_elo = int(white_elo - white_elo % 100)
                black_elo = int(black_elo - black_elo % 100)
                n += 1
                if n > limit:
                    break
                if n % 1e3 == 0:
                    pbar.update(1e3)
                # Ignore weirdly formatted games that don't have an outcome
                score = line.split(' ')[-1]
                if score not in ["1-0", "0-1", "1/2-1/2"]:
                    continue
                # Clean up annotations
                line = re.sub(r'{[^}]+}', '', line)
                # Go through all the moves
                moves = line.split(' ')
                white_to_play = True
                record_move(all_games, white_elo, "white", '*', score)
                record_move(all_games, black_elo, "black", '*', score)
                move_index = 0
                for move in moves:
                    if move in ['', '1-0', '0-1', '1/2-1/2']:
                        continue
                    if "..." in move:
                        continue
                    if move[0].isdigit():
                        move_index = move.split('.')[0]
                        if white_to_play == False:
                            error = "Error in the game {} on move {}".format(
                                line, move)
                            raise Exception(error)
                        white_to_play = True
                        continue
                    move = sanitize_move(move)
                    if white_to_play:
                        record_move(all_games, white_elo, "white", move, score, move_index)
                        white_to_play = False
                    else:
                        record_move(all_games, black_elo, "black", move, score, move_index)
                        white_to_play = True


now = str(datetime.datetime.now())
filename = './results/{}-{}.json'.format(now, int(limit))
with open(filename, 'w') as result_file:
    pretty_json = json.dumps(all_games)
    print(pretty_json, file=result_file)
