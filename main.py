import re
import pprint as pp
import json

db_name = "lichess_db_standard_rated_2020-07.pgn"

def sanitize_move(move):
    # Remove annotation, captures and checks
    sanitized_move = re.sub(r'[?!x+]', '', move)
    return sanitized_move

def record_move(database, elo, color, move, score):
    if color not in database:
        database[color] = {}
    str_elo = str(elo)
    if str_elo not in database[color]:
        database[color][str_elo] = {}
    if move not in database[color][str_elo]:
        database[color][str_elo][move] = {}
    if score not in database[color][str_elo][move]:
        database[color][str_elo][move][score] = 1
    else:
        database[color][str_elo][move][score] += 1

limit = 1e4
n = 0
all_games = {}
white_elo = 0
black_elo = 0
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
            # Ignore weirdly formatted games that don't have an outcome
            score = line.split(' ')[-1]
            if score not in ["1-0", "0-1", "1/2-1/2"]:
                continue
            # Clean up annotations
            line = re.sub(r'{[^}]+}', '', line)
            # Go through all the moves
            moves = line.split(' ')
            white_to_play = True
            for move in moves:
                if move in ['', '1-0', '0-1', '1/2-1/2']:
                    continue
                if "..." in move:
                    continue
                if move[0].isdigit():
                    if white_to_play == False:
                        error = "Error in the game {} on move {}".format(
                            line, move)
                        raise Exception(error)
                    white_to_play = True
                    continue
                move = sanitize_move(move)
                if white_to_play:
                    record_move(all_games, white_elo, "white", move, score)
                    white_to_play = False
                else:
                    record_move(all_games, black_elo, "black", move, score)
                    white_to_play = True


with open('./app/src/data/result.json', 'w') as result_file:
    pretty_json = json.dumps(all_games)
    print(pretty_json, file=result_file)
