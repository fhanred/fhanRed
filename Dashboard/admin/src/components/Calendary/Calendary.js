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

const assignedTasksData = assignedTasks.data || { assignments: [] }; 
const events = assignedTasksData.assignments.map(task => ({
  
  id: task.id,
  title: getNameRazonSocial(task.n_documento), 
}));
console.log(events)
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


// assign: {
//   error: false,
//   data: {
//     assignments: [
//       {
//         id: 1,
//         turno: 'Tarde',
//         taskDate: '2024-03-24',
//         createdAt: '2024-03-15T21:31:12.904Z',
//         updatedAt: '2024-03-15T21:31:12.904Z',
//         taskId: 2,
//         n_documento: '51690062'
//       },
//       {
//         id: 2,
//         turno: 'Tarde',
//         taskDate: '2024-03-12',
//         createdAt: '2024-03-15T21:34:15.908Z',
//         updatedAt: '2024-03-15T21:34:15.908Z',
//         taskId: 3,
//         n_documento: '111112'
//       }
//     ]
//   }
// },