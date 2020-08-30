import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chart from 'react-google-charts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  WHITE,
  BLACK,
  computeScore,
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

function App() {
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
      return queryMove
    } else {
      return 'f6';
    }
  });
  const [graphData, setGraphData] = React.useState(null);

  React.useEffect(() => {
    const computeGraph = () => {
      const moveData = data[color][move] || {};
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
      const firstRow = ['x', `games where ${color} played ${move}`, 'all games'];
      setGraphData([firstRow, ...graphData]);
    };

    computeGraph();
    updateQueryParameter('color', color);
    updateQueryParameter('move', move);
  }, [color, move]);

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className='App'>
      <Paper elevation={3}>
        <Typography variant='h2' component='h2' gutterBottom>
          Should I play {move}?
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Database contains {whiteTotal} games
        </Typography>
        <div>
          <FormControlLabel
            value={WHITE}
            control={
              <Radio
                checked={color === WHITE}
                onChange={handleChange}
                color='primary'
              />
            }
            label={WHITE}
          />
          <FormControlLabel
            value={BLACK}
            control={
              <Radio
                checked={color === BLACK}
                onChange={handleChange}
                color='primary'
              />
            }
            label={BLACK}
          />
          <Autocomplete
            id='combo-box-demo'
            options={color === WHITE ? whiteMoves : blackMoves}
            getOptionLabel={(option) => option}
            style={{ width: 100 }}
            renderInput={(params) => (
              <TextField {...params} label='Move' variant='outlined' />
            )}
            value={move}
            onChange={(event, newValue) => {
              setMove(newValue);
            }}
          />
          {graphData && graphData.length > 1 ? (
            <Chart
              width={'600px'}
              height={'400px'}
              chartType='LineChart'
              loader={<div>Loading Chart</div>}
              data={graphData}
              options={{
                hAxis: {
                  title: 'Elo',
                },
                vAxis: {
                  title: 'Average score',
                },
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </Paper>
    </div>
  );
}

export default App;
