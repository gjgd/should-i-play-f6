# Should I play f6 ?

GM Ben Finegold notoriously says `"Never play f6 [as black, or f3 as white]"`

Is this good advice from a statistical perspective? I made a website to analyze 70.315.588 games from the [Lichess July 2020 database](https://database.lichess.org/) in order to find out:

# https://should-i-play-f6.gjgd.xyz/

This website allows you to:

- Pick any move played by white or black, and compare the average score of the games where this move was played against a baseline of the average score for all games.
- Calculate a plot of the average score of your move as a function of the elo range, to see how successfully the move was played by players of various elo
- Filter games and keep only the games where the move was played in the opening, the middle game or the endgame.

# Results

Check out this reddit post for a discussion about the results: https://www.reddit.com/r/chess/comments/iv8qxf/update_should_i_play_f6_some_extra_analysis/

# Technical details

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

# Using the project

## Python script

To analyze the first 10.000 games of a PGN stored locally, run:
```bash
python main.py lichess_db_standard_rated_2020-07.pgn 10000
```

To analyze the first 70.000.000 games from a PGN stored in S3, run:
```bash
python main.py s3://gjgd-chess/lichess_db_standard_rated_2020-07.pgn 70000000
```

## The web app

```bash
cd app/
npm install
npm run start
```

## Tech stack

- The script to build the database can be run using Python3
- The webapp was written in React JS and uses the CRA tools
- The deployment to AWS CloudFront is done with the Serverless framework
- The CI/CD is ran using Github Actions.
