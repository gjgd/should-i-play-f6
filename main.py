import datetime
import json
import boto3
from smart_open import open
from utils import sanitize_move, record_move, parseFile

limit = 1e5

db_name = "lichess_db_standard_rated_2020-07.pgn"

url = 's3://gjgd-chess/lichess_db_standard_rated_2020-07.pgn'
session = boto3.Session(profile_name='chess')
with open(url, 'rb', transport_params={'session': session}) as f:
    all_games = parseFile(f, limit)

filename = './results/{}-{}.json'.format(str(datetime.datetime.now()), int(limit))
with open(filename, 'w') as result_file:
    pretty_json = json.dumps(all_games)
    print(pretty_json, file=result_file)
