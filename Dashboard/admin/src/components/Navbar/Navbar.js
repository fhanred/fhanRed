import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { TfiPowerOff } from 'react-icons/tfi';
import Logo from '../../assets/Logo/logo3.png';
import { logout } from '../../Redux/Actions/actions';
import './Navbar.css';

function Navbar() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <AppBar position="fixed" elevation={0} className="navbar">
      <Toolbar className="toolbar">
        <div className="navbar-logo">
          <img src={Logo} alt="Logo de la compañía" className="logo-image" />
        </div>
        <div style={{ flexGrow: 1 }} /> {/* Espacio flexible para empujar los elementos al extremo */}
        {userInfo && ( // Mostrar el icono de apagado solo si hay un usuario logueado
          
              <IconButton
                edge="end"
                color="inherit"
                aria-label="Cerrar Sesión"
                onClick={handleLogout}
              >
                <TfiPowerOff />
              </IconButton>
           
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;



