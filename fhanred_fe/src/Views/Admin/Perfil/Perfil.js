import React, { useState } from "react";
import "./Perfil.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchContractDetails } from "../../../Redux/Actions/actions";
import { mockContrato } from "./mockContrato";
import Task from "../../../components/Tasks/Tasks";



function Perfil() {
  const [showContract, setShowContract] = useState(false);

  //cambios hechos por carla
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  /*  const handleContract = () => {
    dispatch(fetchContractDetails({
      name: 'este es el contrato'
      // Otros campos del perfil
    }));
  }; */

  return (
    <div className="profile-container-all">
      {showContract ? (
        <div className="contract-container">
          <button onClick={() => setShowContract(false)}>
            Ocultar contrato
          </button>{" "}
          <h1>Contrato prueba</h1>
          <h3>Ultimo pago realizado: {mockContrato.data.ultimo_pago} </h3>
        </div>
      ) : (
        <>
          <div className="profile-container-1">
            <div className="profile-container-img"></div>

            <div className="profile-data">
              <h3>Natalia Viuche</h3>
              <h3>Super Administrador</h3>
              <h3>natalia.viuche@fhanred.com</h3>
            </div>

            <div className="profile-button-tarea">
            <NavLink to="/Task">
            <button >Tareas</button>{" "}
            {/* </NavLink> */}
            </NavLink>
            </div>
          </div>

          <div className="profile-container-2">
           
            <NavLink to="/contracts">
            <button >Ir a Contrato</button>{" "}
            {/* </NavLink> */}
            </NavLink>
            <NavLink
              to={`/resumen`}
              className={({ isActive }) =>
                isActive ? "ActiveOption" : "Option"
              }
            >
              {" "}
              <button>Ver Resumen</button>{" "}
            </NavLink>
            <NavLink
              to={`/changePassword`}
              className={({ isActive }) =>
                isActive ? "ActiveOption" : "Option"
              }
            >
              {" "}
              <button>Cambiar contraseña</button>{" "}
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}

export default Perfil;