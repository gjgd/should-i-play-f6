import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Chart from "react-google-charts";
import data from './data/result.json';

const WHITE = 'white';
const BLACK = 'black';

const computeScore = (outcome) => {
  const wins = outcome['1'] || 0;
  const losses = outcome['0'] || 0;
  const draws = outcome['1/2'] || 0;
  const score = (1 * wins + 0.5 * draws + 0 * losses) / (wins + draws + losses);
  return score;
};

const blackAverage = Object.entries(data[BLACK]['*']).reduce((acc, [elo, outcome]) => {
  return {
    ...acc,
    [elo]: computeScore(outcome),
  };
}, {});
const whiteAverage = Object.entries(data[WHITE]['*']).reduce((acc, [elo, outcome]) => {
  return {
    ...acc,
    [elo]: computeScore(outcome),
  };
}, {});
const blackTotal = Object.entries(data[BLACK]['*']).reduce((acc, [elo, outcome]) => {
  const wins = outcome['1'] || 0;
  const losses = outcome['0'] || 0;
  const draws = outcome['1/2'] || 0;
  return acc + wins + losses + draws;
}, 0);
const whiteTotal = Object.entries(data[WHITE]['*']).reduce((acc, [elo, outcome]) => {
  const wins = outcome['1'] || 0;
  const losses = outcome['0'] || 0;
  const draws = outcome['1/2'] || 0;
  return acc + wins + losses + draws;
}, 0);
if (whiteTotal !== blackTotal) {
  throw new Error('totals are not matching');
}

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
        Should I play f6?
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
                series: {
                  1: { curveType: 'function' },
                },
              }}
              rootProps={{ 'data-testid': '2' }}
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
