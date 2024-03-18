import React from 'react';
import '../Vouchers/vouchers.css';
import {Button, ButtonGroup } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Link } from "react-router-dom";

export default function Vouchers() {

  const history= useHistory()
  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  const facturaFormik = useFormik({
    initialValues: {
      facturas: '',
      rangoDesde: '',
      rangoHasta: '',
    },
    onSubmit: handleSubmit,
  });

  const notaDebitoFormik = useFormik({
    initialValues: {
      notaDebito: '',
      rangoDesdeDebito: '',
      rangoHastaDebito: '',
    },
    onSubmit: handleSubmit,
  });

  const notaCreditoFormik = useFormik({
    initialValues: {
      notaCredito: '',
      rangoDesdeCredito: '',
      rangoHastaCredito: '',
    },
    onSubmit: handleSubmit,
  });

  const recibosFormik = useFormik({
    initialValues: {
      numeracionRecibos: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className='container'>
            <ButtonGroup
        variant="contained"
        aria-label="Basic button group"
        style={{
          position: "fixed",
          top: "calc(100px + 20px)",
          left: "20px",
          zIndex: "999"
        }}
      >
        <Link to="/homePage" className="link">
          <Button style={{margin: '10px'}}>Volver</Button>
        </Link>
      </ButtonGroup> 
      <div className='title-container'>
      <h2 className='form-title'>Actualización de comprobantes</h2>
      
      </div>
      <div className='formulario'>
      {/* Formulario para Facturas */}
      <form className='form-container' onSubmit={facturaFormik.handleSubmit}>
        <h3 className='form-title'>Facturas</h3>
        <label className='label' htmlFor="facturas">Facturas Res/Dian N°</label>
        <input className='imput-label'
          id="facturas"
          name="facturas"
          type="text"
          onChange={facturaFormik.handleChange}
          value={facturaFormik.values.facturas}
        />

        <label className='label' htmlFor="rangoDesde">Rango Desde</label>
        <input className='imput-label'
          id="rangoDesde"
          name="rangoDesde"
          type="text"
          onChange={facturaFormik.handleChange}
          value={facturaFormik.values.rangoDesde}
        />

        <label className='label' htmlFor="rangoHasta">Rango Hasta</label>
        <input className='imput-label'
          id="rangoHasta"
          name="rangoHasta"
          type="text"
          onChange={facturaFormik.handleChange}
          value={facturaFormik.values.rangoHasta}
        />
<ButtonGroup>
          
  <div className='button-container'>
  <Button type="submit">Enviar</Button>
  </div>
  </ButtonGroup>
        
      </form>

      {/* Formulario para Nota de Débito */}
      <form className='form-container' onSubmit={notaDebitoFormik.handleSubmit}>
        <h3 className='form-title'>Nota de Débito</h3>
        <label className='label' htmlFor="notaDebito">Nota Débito Res/Dian N°</label>
        <input className='imput-label'
          id="notaDebito"
          name="notaDebito"
          type="text"
          onChange={notaDebitoFormik.handleChange}
          value={notaDebitoFormik.values.notaDebito}
        />

        <label className='label' htmlFor="rangoDesdeDebito">Rango Desde</label>
        <input className='imput-label'
          id="rangoDesdeDebito"
          name="rangoDesdeDebito"
          type="text"
          onChange={notaDebitoFormik.handleChange}
          value={notaDebitoFormik.values.rangoDesdeDebito}
        />

        <label className='label' htmlFor="rangoHastaDebito">Rango Hasta</label>
        <input className='imput-label'
          id="rangoHastaDebito"
          name="rangoHastaDebito"
          type="text"
          onChange={notaDebitoFormik.handleChange}
          value={notaDebitoFormik.values.rangoHastaDebito}
        />

<ButtonGroup>
          
          <div className='button-container'>
          <Button type="submit">Enviar</Button>
          </div>
          </ButtonGroup>
      </form>

      {/* Formulario para Nota de Crédito */}
      <form className='form-container' onSubmit={notaCreditoFormik.handleSubmit}>
        <h3 className='form-title'>Nota de Crédito</h3>
        <label className='label' htmlFor="notaCredito">Nota Crédito Res/Dian N°</label>
        <input className='imput-label'
          id="notaCredito"
          name="notaCredito"
          type="text"
          onChange={notaCreditoFormik.handleChange}
          value={notaCreditoFormik.values.notaCredito}
        />

        <label className='label' htmlFor="rangoDesdeCredito">Rango Desde</label>
        <input className='imput-label'
          id="rangoDesdeCredito"
          name="rangoDesdeCredito"
          type="text"
          onChange={notaCreditoFormik.handleChange}
          value={notaCreditoFormik.values.rangoDesdeCredito}
        />

        <label className='label' htmlFor="rangoHastaCredito">Rango Hasta</label>
        <input className='imput-label'
          id="rangoHastaCredito"
          name="rangoHastaCredito"
          type="text"
          onChange={notaCreditoFormik.handleChange}
          value={notaCreditoFormik.values.rangoHastaCredito}
        />

<ButtonGroup>
          
          <div className='button-container'>
          <Button type="submit">Enviar</Button>
          </div>
          </ButtonGroup>
      </form>

      {/* Formulario para Recibos */}
      <form className='form-container' onSubmit={recibosFormik.handleSubmit}>
        <h3 className='form-title'>Recibos</h3>
        <label className='label' htmlFor="numeracionRecibos">Actualizar numeración </label>
        <input className='imput-label'
          id="numeracionRecibos"
          name="numeracionRecibos"
          type="text"
          onChange={recibosFormik.handleChange}
          value={recibosFormik.values.numeracionRecibos}
        />

<ButtonGroup>
          
          <div className='button-container'>
          <Button type="submit">Actualizar</Button>
          </div>
          </ButtonGroup>
      </form>
      </div>
    </div>
  );
}
