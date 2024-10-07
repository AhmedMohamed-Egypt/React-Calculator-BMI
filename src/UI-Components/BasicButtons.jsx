import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons({txt,onClick}) {
  return (

      <Button variant="contained"  onClick={onClick}>{txt}</Button>

  );
}
