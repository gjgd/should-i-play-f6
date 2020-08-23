import re
import pprint as pp

db_name = "lichess_db_standard_rated_2020-07.pgn"

limit = 1e5
i = 0
games = 0
games_where_white_played_f3 = {}
games_where_black_played_f6 = {}
for i in range(40):
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


print("Number of games played", games)
print("Games where white played f3")
pp.pprint(games_where_white_played_f3)
print("Games where black played f6")
pp.pprint(games_where_black_played_f6)
