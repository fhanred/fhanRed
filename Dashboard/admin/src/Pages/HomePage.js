import * as React from 'react';
import '../Pages/Style/styles.css';
import {Button, ButtonGroup} from '@mui/material';
import {Link} from 'react-router-dom'

const HomePage = () => {

  return (
    <div className='container'>
     <ButtonGroup variant="contained" aria-label="Basic button group">
        <Link to="/gestion-empleados" className="link">
          <Button>GESTION DE EMPLEADOS</Button>
        </Link>
        <Link to="/clientes" className="link">
          <Button>CLIENTES</Button>
        </Link>
        <Link to="/tareas" className="link">
          <Button>TAREAS</Button>
        </Link>
        <Link to="/caja" className="link">
          <Button>CAJA</Button>
        </Link>
        <Link to="/comprobantes" className="link">
          <Button>COMPROBANTES</Button>
        </Link>
      </ButtonGroup>
    
  
    </div>
  );
}


 


export default HomePage;
