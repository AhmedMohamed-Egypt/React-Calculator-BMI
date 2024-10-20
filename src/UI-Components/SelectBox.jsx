import * as React from 'react';

import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox({children,title,value,label,onChange,className}) {
 

  return (
   
      <FormControl fullWidth  className={className}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
         
          onChange={onChange}
        >
         {children}
        </Select>
      </FormControl>
    
  );
}
