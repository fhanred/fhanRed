import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUsers,
  assignTaskToUser,
  getTasks
} from "../Redux/Actions/actions";
import './Style/styles.css';

export default function TaskPage() {
  const [nDocumento, setNDocumento] = useState('');
  const [turno, setTurno] = useState('');
  const [taskDay, setTaskDay] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersData);
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTasks());
  }, [dispatch]);

  const handleChangeUser = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleChangeTask = (event) => {
    setSelectedTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(assignTaskToUser(selectedTask, nDocumento, turno, taskDay));
  };

  return (
    <Box className="container" sx={{ minWidth: 120 }}>
      <form onSubmit={handleSubmit}>
        {usersData.length > 0 ? ( // Verificar si hay usuarios disponibles
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Elegir empleado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedUser}
              onChange={handleChangeUser}
            >
              {usersData
                .filter(user => user.id_role === 2 || user.id_role === 3)
                .map(user => (
                  <MenuItem key={user.n_documento} value={user.n_documento}>{user.name_razonSocial}</MenuItem>
                ))}
            </Select>
          </FormControl>
        ) : (
          <p>No hay empleados disponibles</p>
        )}
        
        {tasks.data && tasks.data.tasks.length > 0 ? ( // Verificar si hay tareas disponibles
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Elegir tarea</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTask}
              onChange={handleChangeTask}
            >
              {tasks.data.tasks.map(task => (
                <MenuItem key={task.taskId} value={task.taskId}>{task.nameTask}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <p>No hay tareas disponibles</p>
        )}
        
        <button type="submit">Asignar Tarea</button>
      </form>
    </Box>
  );
}
