# Should I play f6 ?

GM Ben Finegold notoriously says "Never play f6 [as black, or f3 as white]"

I was wondering if / when this is actually good advice and made a website to find out: https://should-i-play-f6.gjgd.xyz/

This project aims at finding out if and when this is good advice, using a few lines of python code, and 70,592,022 games from [Lichess](lichess.org)

The code and the results are available on Github: https://github.com/gjgd/should-i-play-f6

# Features

This website allows you to:

-  pick any move played by white or black, and compare the average score of the games where this move was played against a baseline of the average score for all games.
- calculate a plot of the average score of your move as a function of the elo range, to see how successfully the move was played by players of various elo
- filter games and keep only the games where the move was played in the opening, the middle game or the endgame.

## Definitions

### Average score

The average score S of a move X is:
`S = (1 * wins + 0.5 * draws + 0 * losses) / (wins + draws + losses)`

where:
- `wins` is the number of games won when playing the move X
- `draws` is the number of games drawn when playing the move X
- `losses` is the number of games lost when playing the move X

### Opening / Middle game / End game

The part of the game that happens before move 10 is the opening.

The part of the game that happens between move 10 and move 40 is the middle game.

The part of the game that happens after move 40 is the endgame.

⚠️ Note that these three definitions are subjective and highly debatable, for example and engame would be more accurately defined by the point where the queens are traded off, however for the purpose of this project it was simpler to just consider the number of move in order to filter out openings and engames.
