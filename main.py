import re
import pprint as pp

db_name = "lichess_db_standard_rated_2020-07.pgn"

limit = 1e5
i = 0
games = 0
all_games = {}
games_where_white_played_f3 = {}
games_where_black_played_f6 = {}
for i in range(40):
    all_games[i * 100] = {
       "1-0":0,
       "0-1": 0,
       "1/2-1/2": 0
    }
    games_where_white_played_f3[i * 100] = {
       "1-0":0,
       "0-1": 0,
       "1/2-1/2": 0
    }
    games_where_black_played_f6[i * 100] = {
       "1-0":0,
       "0-1": 0,
       "1/2-1/2": 0
    }
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
            i += 1
            if i > limit:
                break
            games += 1
            # Ignore weirdly formatted games that don't have an outcome
            score = line.split(' ')[-1]
            if score not in ["1-0", "0-1", "1/2-1/2"]:
                continue
            # Stats about white playing f3
            white_played_f3 = re.findall(r'\d\. f3', line)
            if white_played_f3:
                games_where_white_played_f3[white_elo - white_elo % 100][score] += 1
            # Stats about black playing f6
            black_played_f6 = re.findall(r'[^\.] f6', line)
            if black_played_f6:
                games_where_black_played_f6[black_elo - black_elo % 100][score] += 1
            # Stats about all the games
            average_elo = (white_elo + black_elo) / 2
            all_games[average_elo - average_elo % 100][score] += 1


# Compute advantage score = (games won - games lost) / number of games
for i in range(40):
    # White
    white_games = games_where_white_played_f3[i * 100]
    number_of_white_games = white_games['1-0'] + white_games['0-1'] + white_games['1/2-1/2']
    if number_of_white_games > 0:
        white_games['advantage_score'] = (white_games['1-0'] - white_games['0-1']) / number_of_white_games
    else:
        del games_where_white_played_f3[i * 100]

    # Black
    black_games = games_where_black_played_f6[i * 100]
    number_of_black_games = black_games['1-0'] + black_games['0-1'] + black_games['1/2-1/2']
    if number_of_black_games > 0:
        black_games['advantage_score'] = (black_games['0-1'] - black_games['1-0']) / number_of_black_games
    else:
        del games_where_black_played_f6[i * 100]

    # All
    all = all_games[i * 100]
    number_or_games = all['1-0'] + all['0-1'] + all['1/2-1/2']
    if number_or_games == 0:
        del all_games[i * 100]

print("Number of games played", games)
print("All games")
pp.pprint(all_games)
print("Games where white played f3")
pp.pprint(games_where_white_played_f3)
print("Games where black played f6")
pp.pprint(games_where_black_played_f6)
