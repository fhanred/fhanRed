import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const history = useHistory();
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

  // Verificar si el usuario está autenticado
  if (!isAuthenticated) {
    
    history.push('/');
    return null; 
  }

  // Si el usuario está autenticado, renderizar el contenido de Home
  return (
    <div>
       return <div className='container-home'>Hola Bienvenido! Me encuentro en construcción</div>;
      {/* Aquí va el contenido de Home */}
    </div>
  );
};

export default Home;