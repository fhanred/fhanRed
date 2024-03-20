import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";

function PersonalInfoStep({  onSubmit, nextStep }) {
  const [currentDate, setCurrentDate] = useState("");
  const [tel1, setTel1] = useState(null);
  const [tel2, setTel2] = useState(null);
  const [tel3, setTel3] = useState(null);
  const [razonSocial, setRazonSocial] = useState("");
  const [nDocumento, setNDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [fechaCumple, setFechaCumple] = useState("");
  const [sexo, setSexo] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [tipoPersona, setTipoPersona] = useState("");

  const userInfo = useSelector((state) => state.authentication.user);
  console.log("datos del usario logueado", userInfo);
console.log(typeof nextStep);

  const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  useEffect(() => {
    const formattedDate = new Date().toISOString().substr(0, 10);
    setCurrentDate(formattedDate);

    if (userInfo) {
      setRazonSocial(userInfo.razon_social || "");
      setNDocumento(userInfo.n_documento || "");
      setEmail(userInfo.email || "");
      setFechaCumple(userInfo.fecha_cumple || "");
      setSexo(userInfo.sexo || "");
      setTipoDocumento(userInfo.tipo_documento || "");
      setTipoPersona(userInfo.tipo_persona || "");
      setTel1(userInfo.tel1 || "");
      setTel2(userInfo.tel2 || "");
      setTel3(userInfo.tel3 || "");
    }
  }, [userInfo]);

  return (
    <div className="container">
      <Formik
        initialValues={{
          init_date: currentDate,
          tipo_persona: tipoPersona,
          razonSocial: razonSocial,
          tipo_documento: tipoDocumento,
          sexo: sexo,
          n_documento: nDocumento,
          fecha_cumple: fechaCumple,
          email: email,
          tel1: "",
          tel2: "",
          tel3: "",
        }}
        validate={(values) => {
    const errors = {};

    if (!values.razonSocial) {
      errors.razonSocial = 'Campo requerido';
    }

    if (!values.n_documento) {
      errors.n_documento = 'Campo requerido';
    }

    if (!values.email) {
      errors.email = 'Campo requerido';
    }

    if (!values.fecha_cumple) {
      errors.fecha_cumple = 'Campo requerido';
    }

    if (!values.sexo) {
      errors.sexo = 'Campo requerido';
    }

    if (!values.tipo_documento) {
      errors.tipo_documento = 'Campo requerido';
    }

    if (!values.tipo_persona) {
      errors.tipo_persona = 'Campo requerido';
    }

    if (!isValidPhoneNumber(values.tel1)) {
      errors.tel1 = 'Número de teléfono inválido';
    }

    if (!isValidPhoneNumber(values.tel2)) {
      errors.tel2 = 'Número de teléfono inválido';
    }

    if (!isValidPhoneNumber(values.tel3)) {
      errors.tel3 = 'Número de teléfono inválido';
    }

    return errors;
  }}
  enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Valores del formulario:", values);
          // Llama a la función onSubmit para enviar los datos al backend
          onSubmit(values);
          // Avanza al siguiente paso
          nextStep();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <div className="formDiv">
            <Form>
              <Field
                type="text"
                name="currentDate"
                value={currentDate}
                readOnly
              />
              <div>
                Nombre y Apellido
                <Field type="text" name="razonSocial" />
              </div>
              <div>
                <Field type="text" name="tipo_persona" />
              </div>     
              <Field type="text" name="tipo_documento" />
              <div> 
              Sexo
              <Field type="text" name="sexo" /></div>
              <div>
              Nº Documento
              <Field type="text" name="n_documento" /></div> 
              <div> 
              Fecha Nacimiento
              <Field type="text" name="fecha_cumple" /></div>
              <div>
              Email
              <Field type="text" name="email" /></div> 

              <div>
                Teléfono de contacto 1:
                <Field type="text" name="tel1" />
              </div>
              <div>
                Teléfono de contacto 2:
                <Field type="text" name="tel2" />
              </div>
              <div>
                Teléfono de contacto 3:
                <Field type="text" name="tel3" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Confirmar Datos
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default PersonalInfoStep
