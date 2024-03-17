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
      startHour = 9; // 9am
      endHour = 16; // 4pm
    } else if (task.turno === "Tarde") {
      startHour = 16; // 4pm
      endHour = 23; // 11pm
    } else {
      // Manejo de otro caso o error si es necesario
      startHour = 0;
      endHour = 0;
    }

    const start = new Date(task.taskDate);
    start.setHours(startHour, 0, 0, 0);

    const end = new Date(task.taskDate);
    end.setHours(endHour, 0, 0, 0);

    return {
      id: task.id,
      title: getNameRazonSocial(task.n_documento),
      start,
      end,
      turno: task.turno,
      tarea: task.taskId
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
          <Button>Volver</Button>
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
            <b>{event.title}</b> ({event.turno})
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
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          next:'Siguiente',
          back:'Anterior'
        }}
      />
      {selectedTask && (
        <div className="task-details">
          <h2>Detalle de la tarea:</h2>
          <table>
            <tbody>
              <tr>
                <td>Nombre:</td>
                <td>{selectedTask.title}</td>
              </tr>
              <tr>
                <td>Turno:</td>
                <td>{selectedTask.turno}</td>
              </tr>
              <tr>
                <td>Fecha:</td>
                <td>{selectedTask.start.toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Tarea:</td>
                <td>{selectedTask.tarea}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Calendary;
