import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  optionsCalle
} from "./arrayOptions";

const Address = ({ onSubmit }) => {
  const validate = (values) => {
    const errors = {};
  
    if (!values.streetType) {
      errors.streetType = 'El tipo de calle es requerido';
    }
    if (!values.streetNumber) {
      errors.streetNumber = 'El número de calle es requerido';
    }
    if (!values.orientation) {
      errors.orientation = 'La orientación es requerida';
    }
    if (!values.addressNumber) {
      errors.addressNumber = 'El número de dirección es requerido';
    }
    if (!values.details) {
      errors.details = 'Los detalles adicionales son requeridos';
    }
  
    return errors;
  };

  return (
    <div className="container">
      <h2>Ingresa los detalles de la dirección:</h2>
      <Formik
        initialValues={{
          streetType: '',
          streetNumber: '',
          orientation: '',
          addressNumber: '',
          details: '',
         
        }}
        onSubmit={(values, { setSubmitting }) => {
          const address = `${values.streetType} ${values.streetNumber} ${values.orientation} # ${values.addressNumber} # ${values.details}`;
          // Llama a la función onSubmit pasando los datos
          onSubmit({
            ...values,
            direccion: address
          });
          setSubmitting(false);
        }} 
        validate={validate}
      >
        {({ isSubmitting, handleChange, handleBlur }) => (
          <div className="formDiv">
            <Form>
            <div>
  <label htmlFor="streetType">Tipo de calle:</label>
  <Field as="select" name="streetType" onChange={handleChange} onBlur={handleBlur}>
    <option value="">Selecciona un tipo de calle</option>
    <option value="Calle">Calle</option>
    <option value="Avenida">Avenida</option>
    <option value="Carrera">Carrera</option>
    <option value="Callejón">Finca</option>
    <option value="Vereda">Finca</option>
  </Field>
  <ErrorMessage name="streetType" component="div" className="error" />
</div>

              <div>
                <label htmlFor="streetNumber">Nombre o Numero de Calle:</label>
                <Field type="text" name="streetNumber" />
              </div>

              <div>
                <label htmlFor="orientation">Orientación:</label>
                <Field type="text" name="orientation" />
              </div>

              <div>
                <label htmlFor="addressNumber">Número de dirección:</label>
                <Field type="text" name="addressNumber" />
              </div>

              <div>
                <label htmlFor="details">Detalles adicionales:</label>
                <Field type="text" name="details" />
              </div>

              <button type="submit" disabled={isSubmitting}>
                Confirmar dirección
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Address;



