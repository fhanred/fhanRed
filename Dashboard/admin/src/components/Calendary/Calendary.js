import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { fetchAssignedTasks } from "../../Redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

const localizer = dayjsLocalizer(dayjs);

function Calendary() {
  const dispatch = useDispatch();
  const assignedTasks = useSelector((state) => state.assign.data?.assignments);
  const tasks = useSelector((state) => state.tasks);

  const users = useSelector((state) => state.usersData);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [n_documento, setNDocumento] = useState("");

  useEffect(() => {
    dispatch(fetchAssignedTasks(n_documento));
  }, [dispatch, n_documento]);

  const getNameRazonSocial = (n_documento) => {
    const user = users.find((user) => user.n_documento === n_documento);
    return user ? user.name_razonSocial : "";
  };

  const events = assignedTasks?.map((task) => {
    let startHour, endHour;

    if (task.turno === "Mañana") {
      startHour = 8; 
      endHour = 12;  
    } else if (task.turno === "Tarde") {
      startHour = 12;  
      endHour = 17; 
    } else {
      // Manejo de otro caso o error si es necesario
      startHour = 0;
      endHour = 0;
    }

    const start = new Date(task.taskDate);
    start.setHours(startHour, 0, 0, 0);

    const end = new Date(task.taskDate);
    end.setHours(endHour, 0, 0, 0);

    // Obtener el nombre de la tarea
    const selectedTaskObject = tasks.data.tasks.find((t) => t.taskId === task.taskId);
    const tareaName = selectedTaskObject ? selectedTaskObject.nameTask : "Tarea desconocida";

    return {
      id: task.id,
      title: getNameRazonSocial(task.n_documento),
      start,
      end,
      turno: task.turno,
      tarea: task.taskId,
      tareaName: tareaName // Agregar el nombre de la tarea al evento
    };
  }) || [];

  const handleSelectSlot = ({ start, end }) => {
    setSelectedDay({ start, end });
    setSelectedTask(null);
  };

  const handleEventClick = (event) => {
    setSelectedTask(event);
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
          <Button style={{margin: '10px'}}>Volver</Button>
        </Link>
      </ButtonGroup>
      <Calendar className="form-container"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "auto" }}
        eventContent={({ event }) => (
          <div>
            <b>{event.title}</b> ({event.turno}) - {event.tareaName}
          </div>
        )}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        toolbar={{
          agenda: { eventHeight: 50 },
          day: { eventHeight: 50 },
          week: { eventHeight: 50 },
          month: { eventHeight: 50 }
        }}
        messages={{
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          next: "Siguiente",
          back: "Anterior"
        }}
      />
      {selectedTask && (
        <div className="user-table">

          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Turno</th>
                <th>Fecha</th>
                <th>Tarea</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedTask.title}</td>
                <td>{selectedTask.turno}</td>

                <td>{selectedTask.start.toLocaleDateString()}</td>
                <td>{selectedTask.tareaName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Calendary;

