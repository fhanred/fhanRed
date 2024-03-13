import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect2() {
  const [task, setTask] = React.useState('');

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Asignar tarea</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={task}
          label="task"
          onChange={handleChange}
        >
          <MenuItem value={task}>Caja</MenuItem>
          <MenuItem value={task}>Ventas</MenuItem>
          <MenuItem value={task}>Ténico</MenuItem>
          <MenuItem value={task}>Otro</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}