import React from "react";
import { Formik, Form, Field } from "formik";
import {
  optionsPlan,
  optionsEstrato,
  optionsZona,
  optionsVivienda,
  optionsMunicipio,
  optionsFacturaDigital
} from "./arrayOptions";

function SelectPlan({ onSubmit, nextStep, previousStep }) {
  return (
    <div className="container">
      <Formik
        initialValues={{
          estrato: "estrato",
          zona: "zona",
          tipoVivienda: "tipoVivienda",
          municipio: "municipio",
          barrio: "barrio",
          facturaDigital: "facturaDigital",
          name_plan: "200 MG - DEDICADO",
          barrio_vereda: "Uno"
        }}
        validate={(values) => {
          const errors = {};

          const selectFields = ["estrato", "zona", "tipoVivienda", "municipio", "facturaDigital"];
          selectFields.forEach(field => {
            if (!values[field]) {
              errors[field] = 'Selecciona una opción';
            }
          });

          if (!values.barrio) {
            errors.barrio = 'Campo requerido';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          // Imprimir los valores del formulario en la consola
          console.log(values);
          // Llama a la función onSubmit para enviar los datos al backend
          onSubmit(values);
          // Avanza al siguiente paso
          nextStep();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange, handleBlur }) => (
          <Form>
            <div>
              <label htmlFor="name_plan">Plan:</label>
              <Field as="select" name="name_plan" onChange={handleChange} onBlur={handleBlur}>
                <option value="">Selecciona una opción</option>
                {optionsPlan.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label htmlFor="estrato">Estrato:</label>
              <Field as="select" name="estrato" onChange={handleChange} onBlur={handleBlur}>
                <option value="">Selecciona una opción</option>
                {optionsEstrato.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div> 

            <div>
              <label htmlFor="zona">Zona:</label>
              <Field as="select" name="zona" onChange={handleChange} onBlur={handleBlur}>
                <option value="">Selecciona una zona</option>
                {optionsZona.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>
            
            <div>
              <label htmlFor="tipoVivienda">Tipo de vivienda:</label>
              <Field as="select" name="tipoVivienda" onChange={handleChange} onBlur={handleBlur}>
                <option value="">Selecciona un tipo de vivienda</option>
                {optionsVivienda.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label htmlFor="municipio">Municipio:</label>
              <Field as="select" name="municipio" onChange={handleChange} onBlur={handleBlur}>
                <option value="">Selecciona un municipio</option>
                {optionsMunicipio.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>
            
            <div>
              <label htmlFor="barrio_vereda">Barrio:</label>
              <Field type="text" name="barrio_vereda" onChange={handleChange} onBlur={handleBlur} />
            </div>

            <div>
              <label htmlFor="facturaDigital">Factura Digital?</label>
              <Field as="select" name="facturaDigital" onChange={handleChange} onBlur={handleBlur}>
                <option value="">Selecciona una opción</option>
                {optionsFacturaDigital.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Confirmar Datos
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SelectPlan;