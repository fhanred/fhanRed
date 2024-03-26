import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getTasks } from "../Redux/Actions/actions";
import { useHistory } from "react-router-dom";
//import Swal from 'sweetalert2';
import { Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom'

export default function Worker() {

  // const [nDocumento, setNDocumento] = useState("");
  // const [selectedUser, setSelectedUser] = useState("");
  // const [selectedTask, setSelectedTask] = useState("");
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedShift, setSelectedShift] = useState("");
  // const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersData);

  const filteredUsers = usersData.filter(user => user.id_role === 2 || user.id_role === 3);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getTasks());
  }, [dispatch]);

  // const handleChangeUser = (event) => {
  //   setSelectedUser(event.target.value);
  // };

  // const handleChangeTask = (event) => {
  //   setSelectedTask(event.target.value);
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // const handleChangeShift = (event) => {
  //   setSelectedShift(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  // if (!selectedUser || !selectedTask || !selectedDate || !selectedShift) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "Error",
  //     text: "Para continuar debe llenar todas las casillas",
  //   });
  //   return;
  // }



  // const selectedUserObject = usersData.find(user => user.n_documento === selectedUser);

  // if (!selectedUserObject) {
  //   console.error('Usuario no encontrado');
  //   return;
  // }

  // const formattedDate = selectedDate.toISOString().split('T')[0];

  // const formData = {
  //   taskId: selectedTask,
  //   n_documento: selectedUserObject.n_documento,
  //   turno: selectedShift,
  //   taskDate: formattedDate
  // };




  return (

    <div className='container'>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Link to="/altaEmpleado" className="link">
          <Button style={{ margin: '10px' }}>Nuevo Empleado</Button>
        </Link>
        <Link to="/homePage" className="link">
          <Button style={{ margin: '10px' }}>Volver</Button>
        </Link>

      </ButtonGroup>
      <h3 className="form-title" style={{ width: '100%', textAlign: 'center' }}>Gestión empleados</h3>
      {/* Renderizar la tabla de usuarios con roles 2 y 3 */}
      <div className="user-table">

        <table>
          <thead>
            <tr>
              <th>Nombre/Razón Social</th>
              <th>Número de Documento</th>
              <th>Rol</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.n_documento}>
                <td>{user.name_razonSocial}</td>
                <td>{user.n_documento}</td>
                <td>{user.id_role === 2 ? "Técnico" : user.id_role === 3 ? "Ventas" : "Otro Rol"}</td>
                <td>
                  <Link to={{ pathname: "/modificarEmpleado", state: { n_documento: user.n_documento } }} className="link">
                    <Button style={{ margin: '10px' }}>Editar Empleado</Button>
                  </Link>



                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>







    </div>
  )
}
