import React from "react";
import "./Perfil.css";
import { NavLink } from "react-router-dom";

function Perfil() {
  return (
    <div className="profile-container-all">
      <div className="profile-container-1">
        <div className="profile-container-img"></div>

        <div className="profile-data">
         

          <h3>Natalia Viuche</h3>
          <h3>Super Administrador</h3>
          <h3>natalia.viuche@fhanred.com</h3>
          
        </div>

        <div className="profile-button-tarea">
          <button>Tareas</button>
        </div>
      </div>

      <div className="profile-container-2">
        
        <NavLink
          to={`/admin/clientesContratos`}
          className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
        >
          {" "}
          <button>Contrato</button>{" "}
        </NavLink>
        <NavLink
          to={`/admin/facturacion`}
          className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
        >
          {" "}
          <button>Facturar</button>{" "}
        </NavLink>
        <NavLink
          to={`/admin/changePassword`}
          className={({ isActive }) => (isActive ? "ActiveOption" : "Option")}
        >
          {" "}
          <button>Cambiar contraseña</button>{" "}
        </NavLink>
      </div>
    </div>
  );
}

export default Perfil;
