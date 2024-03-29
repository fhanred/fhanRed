import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { fetchAssignedTasks, deleteTask } from "../../Redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const localizer = dayjsLocalizer(dayjs);

function Calendary() {
  const dispatch = useDispatch();
  const assignedTasks = useSelector((state) => state.assign.data?.assignments);
  const tasks = useSelector((state) => state.tasks);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const userRole = useSelector((state) => state.authentication.user.id_role);

  const users = useSelector((state) => state.usersData);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  useEffect(() => {
    dispatch(fetchAssignedTasks());
  }, [dispatch]);

  const getNameRazonSocial = (n_documento) => {
    const user = users.find((user) => user.n_documento === n_documento);
    return user ? user.name_razonSocial : "";
  };

  const events = assignedTasks?.map((task) => {
    const start = new Date(`${task.taskDate}T${task.startTurno}`);
    const end = new Date(`${task.taskDate}T${task.endTurno}`);
    const selectedTaskObject = tasks.data.tasks.find((t) => t.taskId === task.taskId);
    const tareaName = selectedTaskObject ? selectedTaskObject.nameTask : "Tarea desconocida";

    return {
      id: task.id,
      title: getNameRazonSocial(task.n_documento),
      start,
      end,
      turno: task.turno,
      tareaName: tareaName
    };
  }) || [];

  const handleSelectSlot = ({ start, end }) => {
    setSelectedDay({ start, end });
    setSelectedTask(null);
  };

  const handleEventClick = (event) => {
    setSelectedTask(event);
  };

  const handleDeleteTask = async () => {
    if (deleteTaskId) {
      try {
        await dispatch(deleteTask(deleteTaskId));
        setDeleteTaskId(null);
        setSelectedTask(null);
        Swal.fire('Tarea eliminada', '', 'success');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="container">
    
      <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        style={{
          position: "fixed",
          top: "calc(100px + 20px)",
          left: "20px",
          zIndex: "999"
        }}
      >
        <Link to="/homePage" className="link">
          <Button style={{ margin: '10px' }}>Volver</Button>
        </Link>
      </ButtonGroup>

      <Calendar
        
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "auto" }}
        eventContent={({ event }) => (
          <div>
            <b>{event.title}</b> ({event.turno})-  - {event.tareaName}
          </div>
        )}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        toolbar={{
          agenda: { eventHeight: 50 },
          hoy: { eventHeight: 50 },
          semana: { eventHeight: 50 },
          mes: { eventHeight: 50 },
          
        }}
        messages={{
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          next: "Siguiente",
        
        }}
      />
      {selectedTask && (
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Horario Inicial</th>
                <th>Horario Final</th>
                <th>Fecha</th>
                <th>Tarea asignada</th>
                <th>Eliminar tarea</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedTask.title}</td>
                <td>{selectedTask.start.toLocaleTimeString()}</td>
                <td>{selectedTask.end.toLocaleTimeString()}</td>
                <td>{selectedTask.start.toLocaleDateString()}</td>
                <td>{selectedTask.tareaName}</td>
                <td>
                  <Button onClick={() => setDeleteTaskId(selectedTask.id)}>Eliminar</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {deleteTaskId && (
        <div>
          <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
          <Button onClick={handleDeleteTask}>Confirmar Eliminación</Button>
          <Button onClick={() => setDeleteTaskId(null)}>Cancelar</Button>
        </div>
      )}
    </div>
  );
}

export default Calendary;
