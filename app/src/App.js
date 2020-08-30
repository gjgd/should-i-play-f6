import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import Chart from "react-google-charts";
import { WHITE, BLACK, computeScore } from './utils';
import { blackAverage, whiteAverage, data, whiteTotal } from './data';

function App() {
  const [color, setColor] = React.useState(WHITE);
  const [graphData, setGraphData] = React.useState(null);
  const move = 'f6';

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
  }, [color]);

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className='App'>
      <Paper elevation={3}>
        <Typography variant='h2' component='h2' gutterBottom>
          Should I play f6?
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
