# Should I play f6 (chess project)

GM Ben Finegold notoriously says "Never play f6 [as black, or f3 as white]"

This project is about finding out if and when this is good advice, using a few lines of python code, and 70,592,022 games from [Lichess](lichess.org)

## Methodology

The methodology is straightforward:
- Download a lot of games
- Only keep the games where white played f3 or black played f6
- Count how many times they won, lost or drew

## Database

The stats from this project come from the Lichess database website (https://database.lichess.org/).

We used the games from July 2020, here is the direct link to download the games: https://database.lichess.org/standard/lichess_db_standard_rated_2020-07.pgn.bz2

/!\ Beware that the compressed PGN is 17GB in size and 140GB after decompression

## Results

### Analysis

Out of 70.338.008 games that were analyzed
- There were 15.850.891 games (22.5% of games) in which white played f3
- There were 15.284.078 games (21.7% of games) in which black played f6

First of all, note that some of these games might be the same because a game where white played f3 and black played f6 would be counted in both categories

We can see that black and white will play f6 and f3 respectively in roughly the same proportion. However I was also surprised that f3/f6 happened in that many games: 22.5% and 21.7%. My guess is it has to do with the endgame, where you will eventually start pushing your pawns.

Now for the scores! In all those games:
- When white played f3 they won 7.074.502 games, lost 7.846.995 and drew 929.394
- When black played f6 they won 6.446.881 games, lost 7.967.157 and drew 870.040

We could compare those numbers in terms of win rate, but those wouldn't take into account the draws, so we will define a measure called "Advantage score" for the sake of this project defined as such:

average score = (number of games won - number of games lost) / number of games

Even though draws are not explicitly present in this formula, they are accounted for in the total number of games: a higher draw rate would decrease the average score which is what we want intuitively.

Getting back to the score, we have
- When white played f3 they have an average score of -0.049
- When black played f6 they have an average score of -0.099

Both average scores are negative, which indicates **playing f3/f6 is indeed a bad idea!** Note that white's average score is better than black's by a factor of two. That is probably because of white's tempo advantage of making the first move.

In any case, even though on average white is slightly more likely to win than black, when they play f3/f6 they both have a negative average score, indicating that there change of winning is less than 50%. Hence playing f3/f6 is negatively affecting black and white's average score.

GM Ben Finegold seems to be right!

## TODOs

- replace "advantage" with "average score"
- write section about comparing by elo: What I find really cool about this result is that the data confirms the intuition: f3/f6 is a complicated move which will trip up weaker player, but can be used a tool to win for stronger player. Corrolation is almost linear!