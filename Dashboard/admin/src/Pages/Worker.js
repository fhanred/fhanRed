import React from 'react'
import '../Pages/Style/styles.css';
import {Button, ButtonGroup} from '@mui/material';
import {Link} from 'react-router-dom'

export default function Worker() {
  return (
    <div className='container'>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Link to="/altaEmpleado" className="link">
          <Button>Crear Empleado</Button>
        </Link>
        <Link to="/eliminarEmpleado" className="link">
          <Button>ABM Empleado</Button>
        </Link>
       
      </ButtonGroup>
    
      </div>
  )
}
