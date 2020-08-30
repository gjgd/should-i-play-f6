import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MoveInput, Graph, ColorRadioButtons } from './components';
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

const App = () => {
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

  React.useEffect(() => {
    const moveData = data[color][move] || {};
    const numberOfGames = computeNumberOfGames(moveData);
    const graphData = Object.entries(moveData).map(([elo, outcome]) => {
      const score = computeScore(outcome);
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
  }, [color, move]);

  return (
    <div className='App'>
      <Paper elevation={3}>
        <Typography variant='h2' component='h2'>
          Should I play {move}?
        </Typography>
        <Typography>Database contains {whiteTotal} games</Typography>
        <ColorRadioButtons color={color} onChange={(event) => {
          setColor(event.target.value);
        }} />
        <MoveInput
          color={color}
          move={move}
          onChange={(_, newValue) => {
            setMove(newValue);
          }}
        />
        <Graph graphData={graphData} title={graphTitle} />
      </Paper>
    </div>
  );
}

export default App;
