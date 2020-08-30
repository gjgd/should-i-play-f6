import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { WHITE } from '../utils';
import { whiteMoves, blackMoves } from '../data';

const MoveInput = ({ color, move, onChange }) => {
  return (
    <Autocomplete
      id='move-input'
      options={color === WHITE ? whiteMoves : blackMoves}
      getOptionLabel={(option) => option}
      style={{ width: 150 }}
      renderInput={(params) => (
        <TextField {...params} label='Move' variant='outlined' />
      )}
      value={move}
      onChange={onChange}
    />
  );
};

export default MoveInput;
