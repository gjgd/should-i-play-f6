import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function GamePeriodCheckboxes({ onChange, gamePeriods }) {
  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={gamePeriods['O']}
              onChange={onChange}
              name='O'
              color='primary'
            />
          }
          label='Opening'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={gamePeriods['M']}
              onChange={onChange}
              name='M'
              color='primary'
            />
          }
          label='Middlegame'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={gamePeriods['E']}
              onChange={onChange}
              name='E'
              color='primary'
            />
          }
          label='Endgame'
        />
      </FormGroup>
    </>
  );
}
