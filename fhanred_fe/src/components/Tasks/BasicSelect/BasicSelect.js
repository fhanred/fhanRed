import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [employee, setEmployee] = React.useState('');

  const handleChange = (event) => {
    setEmployee(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Elegir empleado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employee}
          label="employee"
          onChange={handleChange}
        >
          <MenuItem value={employee}>Employee 1</MenuItem>
          <MenuItem value={employee}>Employee 2</MenuItem>
          <MenuItem value={employee}>Employee 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}