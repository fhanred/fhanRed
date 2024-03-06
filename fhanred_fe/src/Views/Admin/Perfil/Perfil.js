import React, { useState, useEffect } from "react";
import "./Perfil.css";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showNoContractsModal } from "../../../Redux/Actions/actions"; 
import Swal from "sweetalert2";

function Perfil() {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const user = useSelector((state) => state.authentication.user);
  const userRole = user ? user.id_role : null;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const handleTasksButtonClick = () => {
    // No es necesario hacer nada aquí si el usuario no tiene permisos
  };

  return (
    <div className="profile-container-all">
      <div className="profile-container-1">
        {/* Contenido del perfil */}
        <div className="profile-container-img"></div>
        <div className="profile-data">
          <h3>{user.name_razonSocial}</h3>
          <h3>{getRolName(userRole)}</h3>
          <h3>{user.email}</h3>
        </div>
        <div className="profile-button-tarea">
          {(userRole === 0 || userRole === 1) ? (
            null // No renderizar el botón "Tareas" si el usuario no tiene permisos
          ) : (
            <button onClick={handleTasksButtonClick}>Tareas</button>
          )}
        </div>
      </div>

      <div className="profile-container-2">
        {/* Lógica para mostrar botones según el rol del usuario */}
        {userRole === 0 && (
          <p>Aun no eres cliente. Por favor, contacta con el administrador.</p>
        )}
        {userRole !== 0 && (
          <>
            <NavLink to="/contracts">
              <button>Ir a Contrato</button>{" "}
            </NavLink>
            <NavLink to={`/resumen`} className={({ isActive }) => isActive ? "ActiveOption" : "Option"}>
              <button>Ver Resumen</button>{" "}
            </NavLink>
            <NavLink to={`/changePassword`} className={({ isActive }) => isActive ? "ActiveOption" : "Option"}>
              <button>Cambiar contraseña</button>{" "}
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

function getRolName(rol) {
  switch (rol) {
    case 0:
      return "Usuario no cliente";
    case 1:
      return "Cliente";
    case 2:
      return "Técnico";
    case 3:
      return "Cajero";
    case 4:
      return "Administrador";
    default:
      return "Rol desconocido";
  }
}

export default Perfil;
