import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function GamePeriodCheckboxes({ onChange, gamePeriods }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={gamePeriods[0]}
            onChange={onChange}
            name="0"
            color="primary"
          />
        }
        label="Include openings"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={gamePeriods[1]}
            onChange={onChange}
            name="1"
            color="primary"
          />
        }
        label="Include middlegames"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={gamePeriods[2]}
            onChange={onChange}
            name="2"
            color="primary"
          />
        }
        label="Include engames"
      />
    </FormGroup>
  );
}
