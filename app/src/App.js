import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MoveInput, Graph, ColorRadioButtons, GamePeriodCheckboxes } from './components';
import {
  WHITE,
  BLACK,
  computeScore,
  computeNumberOfGames,
  updateQueryParameter,
  getQueryParameter,
} from './utils';
import {
  blackAverage,
  whiteAverage,
  data,
  whiteTotal,
  blackMoves,
  whiteMoves,
} from './data';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(4),
  },
}));

const App = () => {
  const classes = useStyles();
  const [color, setColor] = React.useState(() => {
    const queryColor = getQueryParameter('color');
    if ([WHITE, BLACK].includes(queryColor)) {
      return queryColor;
    } else {
      return BLACK;
    }
  });
  const [move, setMove] = React.useState(() => {
    const queryMove = getQueryParameter('move');
    const moves = color === WHITE ? whiteMoves : blackMoves;
    if (moves.includes(queryMove)) {
      return queryMove;
    } else {
      return 'f6';
    }
  });
  const [graphData, setGraphData] = React.useState(null);
  const [graphTitle, setGraphTitle] = React.useState('');
  const [gamePeriods, setGamePeriods] = React.useState({
    // openings
    O: true,
    // middlegames
    M: true,
    // endgames
    E: true,
  });

  React.useEffect(() => {
    const moveData = data[color][move] || {};
    const numberOfGames = computeNumberOfGames(moveData, gamePeriods);
    const graphData = Object.entries(moveData).map(([elo, outcome]) => {
      const score = computeScore(outcome, gamePeriods);
      if (color === WHITE) {
        return [elo, score, whiteAverage[elo]];
      }
      if (color === BLACK) {
        return [elo, score, blackAverage[elo]];
      }
      throw new Error('color should be white or black');
    });
    const firstRow = [
      'x',
      `games where ${color} played ${move}`,
      'all games',
    ];
    setGraphData([firstRow, ...graphData]);
    setGraphTitle(
      `There are ${numberOfGames} games where ${color} played ${move}`,
    );
    updateQueryParameter('color', color);
    updateQueryParameter('move', move);
  }, [color, move, gamePeriods]);

  const Content = () => {
    return (
      <Grid container direction='column'>
        <Typography variant='h2' component='h2'>
          Should I play {move}?
        </Typography>
        <Typography>Database contains {whiteTotal} games</Typography>
        <Grid container>
          <Grid item>
            <Typography variant='h5' className={classes.title}>Choose a move</Typography>
          </Grid>
          <Grid item container spacing={1} alignItems='center'>
            <Grid item>
              <Typography>Include games where</Typography>
            </Grid>
            <Grid item>
              <ColorRadioButtons
                color={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <Typography>played the move</Typography>
            </Grid>
            <Grid item>
              <MoveInput
                color={color}
                move={move}
                onChange={(_, newValue) => {
                  setMove(newValue);
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='h5' className={classes.title}>Filter by game period</Typography>
          </Grid>
          <Grid item container spacing={1} alignItems='center'>
            <Grid item>
              <Typography>
                Include games where the move was played in the
              </Typography>
            </Grid>
            <Grid item>
              <GamePeriodCheckboxes
                gamePeriods={gamePeriods}
                onChange={(event) => {
                  const newGamePeriods = {
                    ...gamePeriods,
                    [event.target.name]: Boolean(event.target.checked),
                  };
                  setGamePeriods(newGamePeriods);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant='h5' className={classes.title}>Result</Typography>
        </Grid>
        <Grid item>
          <Graph graphData={graphData} title={graphTitle} />
        </Grid>
      </Grid>
    );
  }
  return (
    <div className='App'>
      <Grid container alignItems='center' justify='center'>
        <Grid item md={4} sm={0}></Grid>
        <Grid item md={4} sm={0}>
          <Content />
        </Grid>
        <Grid item md={4} sm={0}></Grid>
      </Grid>
    </div>
  );
}

export default App;
