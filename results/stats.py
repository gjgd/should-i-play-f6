import json

x1 = []
y1 = []
x2 = []
y2 = []

with open("./results/games-where-black-played-f6.json", "r") as f1:
  games = json.load(f1)
  number_of_games = 0
  won = 0
  lost = 0
  drawn = 0
  for key, value in games.items():
    won += value['0-1']
    lost += value['1-0']
    drawn += value['1/2-1/2']
    number_of_games += value['0-1'] + value['1-0'] + value['1/2-1/2']
  print('Black played f6 in', number_of_games, 'games')
  print('win', won, 'lost', lost, 'drawn', drawn)
  print(number_of_games, won + lost + drawn)
  print('average score', (won - lost) / number_of_games)

with open("./results/games-where-white-played-f3.json", "r") as f2:
  games = json.load(f2)
  number_of_games = 0
  won = 0
  lost = 0
  drawn = 0
  for key, value in games.items():
    won += value['1-0']
    lost += value['0-1']
    drawn += value['1/2-1/2']
    number_of_games += value['0-1'] + value['1-0'] + value['1/2-1/2']
  print('White played f3 in', number_of_games, 'games')
  print('win', won, 'lost', lost, 'drawn', drawn)
  print(number_of_games, won + lost + drawn)
  print('average score', (won - lost) / number_of_games)
