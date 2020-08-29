import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

function App() {
  const WHITE = 'white';
  const BLACK = 'black';
  const [color, setColor] = React.useState(WHITE);

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
        </div>
      </Paper>
    </div>
  );
}

export default App;
