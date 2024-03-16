import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, assignTaskToUser, getTasks } from "../Redux/Actions/actions";
import "./Style/styles.css";


export default function TaskPage() {
  const [nDocumento, setNDocumento] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState("");

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChangeShift = (event) => {
    setSelectedShift(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    

    const selectedUserObject = usersData.find(user => user.n_documento === selectedUser);
    
    if (!selectedUserObject) {
      console.error('Usuario no encontrado');
      return;
    }
  
    const formattedDate = selectedDate.toISOString().split('T')[0]; 
  
    const formData = {
      taskId: selectedTask, 
      n_documento: selectedUserObject.n_documento, 
      turno: selectedShift, 
      taskDate: formattedDate 
    };
  
    console.log('Form Data:', formData);
    dispatch(assignTaskToUser(selectedTask, selectedUserObject.n_documento, selectedShift, formattedDate));
  };
  

  return (
   
    <Box className="container" sx={{ minWidth: 120 }}>
      <form onSubmit={handleSubmit}>
        {usersData.length > 0 ? (
          <FormControl fullWidth>
            <InputLabel id="employee-label">Elegir empleado</InputLabel>
            <Select
              labelId="employee-label"
              value={selectedUser}
              onChange={handleChangeUser}
            >
              {usersData
                .filter((user) => user.id_role === 2 || user.id_role === 3)
                .map((user) => (
                  <MenuItem key={user.n_documento} value={user.n_documento}>
                    {user.name_razonSocial}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        ) : (
          <p>No hay empleados disponibles</p>
        )}

        {tasks.data && tasks.data.tasks.length > 0 ? (
          <FormControl fullWidth>
            <InputLabel id="task-label">Elegir tarea</InputLabel>
            <Select
              labelId="task-label"
              value={selectedTask}
              onChange={handleChangeTask}
            >
              {tasks.data.tasks.map((task) => (
                <MenuItem key={task.taskId} value={task.taskId}>
                  {task.nameTask}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <p>No hay tareas disponibles</p>
        )}

        <div>
    
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" // Formato de fecha
        placeholderText="Selecciona una fecha" // Texto del placeholder
      />
    </div>


        <FormControl fullWidth>
          <InputLabel id="shift-label">Turno</InputLabel>
          <Select
            labelId="shift-label"
            value={selectedShift}
            onChange={handleChangeShift}
          >
            <MenuItem value="Mañana">Mañana</MenuItem>
            <MenuItem value="Tarde">Tarde</MenuItem>
          </Select>
        </FormControl>

        <button type="submit">Asignar Tarea</button>
      </form>
    </Box>
    
  );
}
