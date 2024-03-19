import React from 'react'

import {Button, ButtonGroup} from '@mui/material';
import {Link} from 'react-router-dom'

export default function Worker() {
  return (
    <div className='container'>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Link to="/altaEmpleado" className="link">
          <Button style={{margin: '10px'}}>Crear Empleado</Button>
        </Link>
        <Link to="/modificarEmpleado" className="link">
          <Button style={{margin: '10px'}}>ABM Empleado</Button>
        </Link>
       
      </ButtonGroup>
    
      </div>
  )
}
