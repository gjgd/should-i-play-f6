import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import json

x1 = []
y1 = []
x2 = []
y2 = []

with open("./results/games-where-black-played-f6.json", "r") as f1:
  games = json.load(f1)
  for key, value in games.items():
    x1.append(int(key))
    y1.append(value["average_score"])

with open("./results/games-where-white-played-f3.json", "r") as f2:
  games = json.load(f2)
  for key, value in games.items():
    x2.append(int(key))
    y2.append(value["average_score"])

black = plt.plot(x1, y1, 'g')
white = plt.plot(x2, y2, 'r')
plt.plot(x1, [0] * len(y1), 'b')
plt.title("Evolution of average scores by ELO when f3/f6 is played")
plt.xlabel('ELO')
plt.ylabel('average score')

red_patch = mpatches.Patch(color='red', label='Games where white played f3')
green_patch = mpatches.Patch(color='green', label='Games where black played f6')
plt.legend(handles=[red_patch, green_patch])
plt.savefig('./results/plot.png')
