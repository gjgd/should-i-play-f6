import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { WHITE, BLACK } from '../utils';

const ColorRadioButton = ({ color, onChange }) => {
  return (
    <>
      <FormControlLabel
        value={WHITE}
        control={
          <Radio
            checked={color === WHITE}
            onChange={onChange}
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
            onChange={onChange}
            color='primary'
          />
        }
        label={BLACK}
      />
    </>
  );
};

export default ColorRadioButton;
