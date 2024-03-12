import React, { useEffect } from "react";
import ManagerDesigningTask from "../ManagerDesigningTask/ManagerDesigningTask";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./Task.css";
import "./BasicSelect/BasicSelect";
import BasicSelect from "./BasicSelect/BasicSelect";
import BasicSelect2 from "./BasicSelect2/BasicSelect2";
import BasicDateTimePicker from "./BasicDateTimePicker/BasicDateTimePicker";
import AccessibleTable from "./AccessibleTable/AccessibleTable";



const Task = () => {
 
  return (
    <div className="task-container-all">
      <div className="task-container-components">
    <NavLink to="/MangerDesigningTask">
    <button >
       Asignar tareas</button>{" "}
    {/* </NavLink> */}
    </NavLink>

    

    <BasicDateTimePicker/>

    <BasicSelect/>

    <BasicSelect2/>

    <AccessibleTable/>
    </div>
    </div>
  );
};

export default Task;