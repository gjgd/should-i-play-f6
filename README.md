# Should I play f6 ? https://should-i-play-f6.gjgd.xyz/

GM Ben Finegold notoriously says 
> Never play f6 [as black, or f3 as white]"

I was wondering if and when this is actually good advice and made a website to analyze 70.315.588 games from the Lichess July 2020 database (https://database.lichess.org/) and find out

https://should-i-play-f6.gjgd.xyz/

## Features

This website allows you to:

- Pick any move played by white or black, and compare the average score of the games where this move was played against a baseline of the average score for all games.
- Calculate a plot of the average score of your move as a function of the elo range, to see how successfully the move was played by players of various elo
- Filter games and keep only the games where the move was played in the opening, the middle game or the endgame.

# Results

## Should I play f6?

According to the statistical analysis of 11.693.245 where f6 was played in the middle game, we can see that it has a consistently lower average score than the baseline of all games: https://should-i-play-f6.gjgd.xyz/?color=black&move=f6

The results are almost the same for white playing f3: on average playing this move does worse than the baseline: https://should-i-play-f6.gjgd.xyz/?color=white&move=f3

This concludes the initial question: playing f6 (or f3) is on average a worse move.

**Disclaimer: This result does not mean you should never play f6 (or f3), use your best judgement and have fun in your games!**

## Additional results

**Castling**: I initially thought castling would result in a high game score, but it turns out it is not the case. For example with white castling short: https://should-i-play-f6.gjgd.xyz/?color=white&move=O-O the blue line is exactly the same as the red line which means players who castle do not get a decisive advantage compared to the average of all game. I think this is because castling happens in most games. It would be interesting to compare games where white castled VS games where white didn't castle instead. A project for another time  ¯\_(ツ)_/¯

**Piece sacrifices**: To find a great move, we are therefore looking at moves that are more rarely played but still give a decisive advantage. For example piece sacrifices or gambits. Here is the graph for Bxh7: https://should-i-play-f6.gjgd.xyz/?color=white&move=Bh7. Here the blue line is above the red line, meaning this move is better than the average. This move is very typical of the "Greek Gift" scenario, and often leads to white having a strong attack with the correct setup.

**Gambits**: Another example of this is Nxf7: https://should-i-play-f6.gjgd.xyz/?color=white&move=Nf7 which is move played in quite a few gambits, including my favorite: The Fried Lived Attack. In this graph, the advantage is even more decisive.

**Ke2**: https://should-i-play-f6.gjgd.xyz/?color=white&move=Ke2. Not going to comment too much about this one, except that the site must be bugged because it shows this move as being bad even though it's clearly winning... Will have to investigate.

# Additional details

## Definitions

The **average score** S of a move X is:
`S = (1 * wins + 0.5 * draws + 0 * losses) / (wins + draws + losses)`

where:
- `wins` is the number of games won when playing the move X
- `draws` is the number of games drawn when playing the move X
- `losses` is the number of games lost when playing the move X

The part of the game that happens before move 10 is the **opening**

The part of the game that happens between move 10 and move 40 is the **middle game**

The part of the game that happens after move 40 is the **endgame**

⚠️ Note that these three definitions are subjective and highly debatable, for example an engame would be more accurately defined by the point in the game where the queens are traded off, however for the purpose of this project it was simpler to just consider the number of move in order to filter out openings and engames.

## Sanitizing moves

Some moves in the Lichess database came with 
- Annotations: for example `b4!` or `Kf1??`
- Comments: for example  `e4 [The king pawn opening]`
- Computer analysis: for example `e4 [+0.23]`

All of these were removed to only keep the arithmetic notation.

Additionnally I also chose to deduplicate positional notation (`Rfd1` -> `Rd1`) and captures (`Bxf7` -> `Bf7` or `exd5` -> `ed5`)

## Tech stack

- The script to build the database was written in Python
- The webapp was writter in React JS
- The deployment to AWS CloudFront is done with the Serverless framework
- The CI/CD is ran using Github Actions.
