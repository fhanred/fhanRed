import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { TfiPowerOff } from 'react-icons/tfi';
import Logo from '../../assets/Logo/Logo.jpg';
import './Navbar.css';
import { cleanDetail } from '../../Redux/Actions/actions';

function Navbar() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo); 

  // Función para cerrar la sesión del usuario
  const handleLogout = () => {
    dispatch(cleanDetail()); // Borra la información del usuario al cerrar sesión
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="Logo de la compañía" className="logo-image" />
      </div>
      {userInfo ? ( // Si hay un usuario conectado, muestra la información del usuario
        <div className="navbar-user">
          <div className="user-avatar">
            <FaUserCircle size={50} />
          </div>
          <div className="user-info">
            <span>Hola, {userInfo.name}</span>
            <div
              className="logout-icon"
              title="Cerrar Sesión"
              onClick={handleLogout}
            >
              <TfiPowerOff size={24} />
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
