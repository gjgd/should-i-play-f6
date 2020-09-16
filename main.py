import datetime
import json
import boto3
from smart_open import open
from utils import sanitize_move, record_move, parseFile
import sys

limit = 1e5

db_name = "lichess_db_standard_rated_2020-07.pgn"
# python main.py lichess_db_standard_rated_2020-07.pgn 10000
# python main.py s3://gjgd-chess/lichess_db_standard_rated_2020-07.pgn 10000
if len(sys.argv) != 3:
    print('Usage: python main.py <filename> <number-of-games-to-analyse>')
    exit(1)
file_name = sys.argv[1]
limit = int(sys.argv[2])

if (file_name.startswith('s3://')):
    session = boto3.Session(profile_name='chess')
    with open(file_name, 'rb', transport_params={'session': session}) as f:
        all_games = parseFile(f, limit)
else:
    with open(db_name) as f:
        all_games = parseFile(f, limit)

with open('./results/{}-{}.json'.format(str(datetime.datetime.now()), int(limit)), 'w') as result_file:
    pretty_json = json.dumps(all_games)
    print(pretty_json, file=result_file)
