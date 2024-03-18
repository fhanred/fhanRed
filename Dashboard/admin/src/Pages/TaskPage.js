import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, assignTaskToUser, getTasks } from "../Redux/Actions/actions";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

export default function TaskPage() {
  const [nDocumento, setNDocumento] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersData);
  const tasks = useSelector((state) => state.tasks);
// Filtrar usuarios con roles 2 y 3
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

  const handleChangeShift = (event) => {
    setSelectedShift(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedUser || !selectedTask || !selectedDate || !selectedShift) {
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

    const formData = {
      taskId: selectedTask,
      n_documento: selectedUserObject.n_documento,
      turno: selectedShift,
      taskDate: formattedDate
    };

    console.log('Form Data:', formData);
    dispatch(assignTaskToUser(selectedTask, selectedUserObject.n_documento, selectedShift, formattedDate));

     // Mostrar la alerta
     setAlertMessage("Tarea asignada");

     Swal.fire({
      icon: "success",
      title: "Tarea asignada correctamente",
      text: "La tarea ha sido asignada al empleado exitosamente.",
    });

     // Limpiar los estados
     setSelectedUser("");
     setSelectedTask("");
     setSelectedDate(null);
     setSelectedShift("");

   // Después de 3 segundos, ocultar la alerta
   setTimeout(() => {
    setAlertMessage("");
  }, 2000);

};


  return (

    <Box className="container"  sx={{ minWidth: 120 }}>
     <ButtonGroup 
  variant="contained" 
  aria-label="Basic button group" 
  style={{ 
    position: "fixed", 
    top: "calc(100px + 20px)", // Altura del navbar + espacio
    right: "20px", 
    zIndex: "999", // Asegura que el botón esté por encima de otros elementos
    margin:"20px",
    
  }}
>
  <Link to="/calendario" >
    <Button style={{margin: '10px'}}>Ver Calendario</Button>
  </Link>
  <Link to="/homePage">
  <Button style={{margin: '10px'}}>Volver </Button>
  </Link>
 
</ButtonGroup>

       {alertMessage && (
        <div className="alert">
          <span>{alertMessage}</span>
        </div>
      )}
    
      <form className="form-container" onSubmit={handleSubmit} style={{width:"100%"}}>
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

          <DatePicker className='imput-label'
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy" // Formato de fecha
            placeholderText="Selecciona una fecha" // Texto del placeholder
           
          />
        </div>


        <FormControl fullWidth className="imput-label">
          <InputLabel className='imput-label'  id="shift-label">Turno</InputLabel>
          <Select className='imput-label'
            labelId="shift-label"
            value={selectedShift}
            onChange={handleChangeShift}
          >
            <MenuItem value="Mañana">Mañana</MenuItem>
            <MenuItem value="Tarde">Tarde</MenuItem>
          </Select>
        </FormControl>
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
