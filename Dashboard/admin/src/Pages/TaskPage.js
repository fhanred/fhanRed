import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import 'react-datepicker/dist/react-datepicker.css';
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, assignTaskToUser, getTasks } from "../Redux/Actions/actions";

import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';


export default function TaskPage() {

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");


  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersData);
  const tasks = useSelector((state) => state.tasks);
  const filteredUsers = usersData.filter(user => user.id_role === 2 || user.id_role === 3);

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

  const handleChangeStart = (value) => {
    setSelectedStart(dayjs(value)); // Convertir a objeto Time
  };

  const handleChangeEnd = (value) => {
    setSelectedEnd(dayjs(value)); // Convertir a objeto Time
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedUser || !selectedTask || !selectedDate || !selectedStart || !selectedEnd) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Para continuar debe llenar todas las casillas",
      });
      return;
    }

    const selectedUserObject = usersData.find(user => user.n_documento === selectedUser);

    if (!selectedUserObject) {
      console.error('Usuario no encontrado');
      return;
    }

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const formattedStartTime = selectedStart.format('HH:mm');
    const formattedEndTime = selectedEnd.format('HH:mm');

    const formData = {
      taskId: selectedTask,
      n_documento: selectedUserObject.n_documento,
      startTurno: formattedStartTime,
      endTurno: formattedEndTime,
      taskDate: formattedDate
    };

    console.log('Form Data:', formData);
    dispatch(assignTaskToUser(selectedTask, selectedUserObject.n_documento, formattedStartTime, formattedEndTime, formattedDate));

    setAlertMessage("Tarea asignada");

    Swal.fire({
      icon: "success",
      title: "Tarea asignada correctamente",
      text: "La tarea ha sido asignada al empleado exitosamente.",
    });

    setSelectedUser("");
    setSelectedTask("");
    setSelectedDate(null);
    setSelectedStart(null);
    setSelectedEnd(null);

    setTimeout(() => {
      setAlertMessage("");
    }, 2000);

  };

  return (
    <Box className="container" sx={{ minWidth: 120 }}>
      <ButtonGroup
        className='button-group-container'
        variant="contained"
        aria-label="Basic button group"
        style={{
          position: "fixed",
          top: "calc(100px + 20px)",
          right: "20px",
          zIndex: "999",
          margin: "20px",

        }}
      >
        <Link to="/calendario" >
          <Button style={{ margin: '10px' }}>Ver Calendario</Button>
        </Link>
        <Link to="/homePage">
          <Button style={{ margin: '10px' }}>Volver </Button>
        </Link>
      </ButtonGroup>

      {alertMessage && (
        <div className="alert">
          <span>{alertMessage}</span>
        </div>
      )}

      <form className="form-container" onSubmit={handleSubmit} style={{ width: "100%" }}>
        <h3 className="form-title">Asignar tareas</h3>
        {usersData.length > 0 ? (
          <FormControl fullWidth >
            <InputLabel className='imput-label' id="employee-label">Elegir empleado</InputLabel>
            <Select className='imput-label'
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
          <FormControl fullWidth className="imput-label">
            <InputLabel className='imput-label' id="task-label">Elegir tarea</InputLabel>
            <Select className='imput-label'
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              selected={selectedDate}
              onChange={handleDateChange}
              format="dd/MM/yyyy" // Formato de fecha
              placeholder="Selecciona una fecha" // Texto del placeholder 
            />
            <div>
              <TimePicker
                label="Horario de ingreso"
                value={selectedStart}
                format="HH:mm"
                onChange={handleChangeStart}
              />
            </div>
            <div>
              <TimePicker
                label="Horario de egreso"
                value={selectedEnd}
                format="HH:mm"
                onChange={handleChangeEnd}
              />
            </div>


          </LocalizationProvider>
        </div>

        <ButtonGroup className="imput-label">

          <Button type="submit">Asignar Tarea</Button>


        </ButtonGroup>
      </form>
      {/* Renderizar la tabla de usuarios con roles 2 y 3 */}
      <div className="user-table">

        <table>
          <thead>
            <tr>
              <th>Nombre/Razón Social</th>
              <th>Número de Documento</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.n_documento}>
                <td>{user.name_razonSocial}</td>
                <td>{user.n_documento}</td>
                <td>{user.id_role === 2 ? "Técnico" : user.id_role === 3 ? "Ventas" : "Otro Rol"}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>





    </Box>

  );
}
