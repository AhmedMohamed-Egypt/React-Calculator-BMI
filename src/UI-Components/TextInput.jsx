import * as React from 'react';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

function TextInput({value,onChange,endTitle}) {
  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" onChange={onChange} value={value} >
    <OutlinedInput
      id="outlined-adornment-weight"
      endAdornment={<InputAdornment position="end">{endTitle}</InputAdornment>}
      aria-describedby="outlined-weight-helper-text"
      inputProps={{
        'aria-label': 'Weight',
      }}
        label="Weight"
      variant="outlined"
      
    />
   <InputLabel htmlFor="outlined-adornment-password">Weight</InputLabel>
  </FormControl>
  )
}

export default TextInput
