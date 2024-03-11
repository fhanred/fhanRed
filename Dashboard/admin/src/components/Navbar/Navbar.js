import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { TfiPowerOff } from 'react-icons/tfi';
import Logo from '../../assets/Logo/Logo.jpg';
import './Navbar.css';
import { logout } from '../../Redux/Actions/actions';

function Navbar() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  //const history = useHistory()

  // Función para cerrar la sesión del usuario
  const handleLogout = () => {
    dispatch(logout()); // Borra la información del usuario al cerrar sesión
    //history.push('/')
  };

  return (
    <nav className="navbar">
      
      <div className="navbar-logo">
        <img src={Logo} alt="Logo de la compañía" className="logo-image" />
      </div>
      {userInfo ? ( // Si hay un usuario conectado, muestra la información del usuario
        <div className="navbar-user">
          
          <div className="user-info">
           
            <div
              className="logout-icon"
              title="Cerrar Sesión"
              onClick={handleLogout}
            >
              <TfiPowerOff  />
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;