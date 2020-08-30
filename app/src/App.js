import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
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

function App() {
  const [color, setColor] = React.useState(WHITE);
  const [graphData, setGraphData] = React.useState(null);
  const move = 'f6';

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const computeGraph = () => {
    const moveData = data[color][move] || {};
    const graphData = Object.entries(moveData).map(([elo, outcome]) => {
      const averageScore = computeScore(data[color]['*'][elo]);
      const score = computeScore(outcome);
      return [elo, score, averageScore];
    });
    const firstRow = ['x', `games where ${color} played ${move}`, 'all games'];
    setGraphData([firstRow, ...graphData]);
  }


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
          <Button onClick={computeGraph} color='primary'>
            Compute graph
          </Button>
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