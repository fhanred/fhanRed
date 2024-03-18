import * as React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import {Link} from 'react-router-dom'

const HomePage = () => {

  return (
    <div className='container'>
      
     <ButtonGroup variant="contained" aria-label="Basic button group" >
        <Link to="/empleados" className="link">
          <Button style={{margin: '10px'}}>GESTION DE EMPLEADOS</Button>
        </Link>
        <Link to="/clientes" className="link">
          <Button style={{margin: '10px'}}>CLIENTES</Button>
        </Link>
        <Link to="/tareas" className="link">
          <Button style={{margin: '10px'}}>TAREAS</Button>
        </Link>
        <Link to="/caja" className="link">
          <Button style={{margin: '10px'}}>CAJA</Button>
        </Link>
        <Link to="/comprobantes" className="link">
          <Button style={{margin: '10px'}}>COMPROBANTES</Button>
        </Link>
      </ButtonGroup>
    
  
    </div>
  );
}


 


export default HomePage;
