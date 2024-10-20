import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons({txt,onClick,className}) {
  return (

      <Button className={className} variant="contained"  onClick={onClick}>{txt}</Button>

  );
}
