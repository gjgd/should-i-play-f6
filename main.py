import re

db_name = "lichess_db_standard_rated_2020-07.pgn"

limit = 1e4
i = 0
games = 0
games_where_white_played_f3 = {}
games_where_black_played_f6 = {}
with open(db_name) as f:
    for line in f:
        # Get the line in the PGN that lists the moves
        if "1. " in line:
            i += 1
            if i > limit:
                break
            games += 1
            line = line.rstrip()
            # Ignore weirdly formatted games that don't have an outcome
            score = line.split(' ')[-1]
            if score not in ["1-0", "0-1", "1/2-1/2"]:
                continue
            # Stats about white playing f3
            white_played_f3 = re.findall(r'\d\. f3', line)
            if white_played_f3:
                if score in games_where_white_played_f3:
                    games_where_white_played_f3[score] += 1
                else:
                    games_where_white_played_f3[score] = 1
            # Stats about black playing f6
            black_played_f6 = re.findall(r'[^\.] f6', line)
            if black_played_f6:
                if score in games_where_black_played_f6:
                    games_where_black_played_f6[score] += 1
                else:
                    games_where_black_played_f6[score] = 1


print("Number of games played", games)
print("Games where white played f3", games_where_white_played_f3)
print("Games where black played f6", games_where_black_played_f6)
