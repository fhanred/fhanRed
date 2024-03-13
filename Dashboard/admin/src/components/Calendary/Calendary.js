import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { fetchAssignedTasks } from "../../Redux/Actions/actions";
import { useSelector, useDispatch } from "react-redux";

const localizer = dayjsLocalizer(dayjs);

function Calendary() {
  const dispatch = useDispatch();
  const assignedTasks = useSelector((state) => state.assign.data.assignments);;
  const users = useSelector((state) => state.usersData); 
  
  const [n_documento, setNDocumento] = useState("");
  
  
  useEffect(() => {
    // Si no ingrasas un documento en el input te trae todas las tareas a todos los usuarios
    dispatch(fetchAssignedTasks(n_documento));
  }, [dispatch, n_documento]);

  const getNameRazonSocial = (n_documento) => {
    const user = users.find(user => user.n_documento === n_documento);
    return user ? user.name_razonSocial : "";
  };

  const events = assignedTasks.map(task => ({
    id: task.id,
    title: getNameRazonSocial(task.n_documento), 
   
  }));

  return (
    <div className="container">
      <Calendar
        localizer={localizer}
        events={events} 
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "auto" }}
      />
    </div>
  );
}

export default Calendary;
