import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";

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
          details: ''
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
        {({ isSubmitting }) => (
          <div className="formDiv">
            <Form>
              <div>
                <label htmlFor="streetType">Tipo de calle:</label>
                <Field type="text" name="streetType" />
                <ErrorMessage name="streetType" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="streetNumber">Número de calle:</label>
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



