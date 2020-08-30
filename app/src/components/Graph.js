import React from 'react';
import Chart from 'react-google-charts';

const Graph = ({ graphData }) => {
  if (graphData && graphData.length > 1) {
    return (
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
    );
  } else {
    return <></>;
  }
};

export default Graph;
