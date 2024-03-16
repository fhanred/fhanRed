import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";

function PersonalInfoStep({ nextStep }) {
  const [currentDate, setCurrentDate] = useState("");
  const [telefono1, setTelefono1] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [telefono3, setTelefono3] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [nDocumento, setNDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [fechaCumple, setFechaCumple] = useState("");
  const [sexo, setSexo] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [tipoPersona, setTipoPersona] = useState("");

  const userInfo = useSelector((state) => state.authentication.user);
  console.log("datos del usario logueado", userInfo);

  const isFormValid = () => {
    return (
      currentDate !== "" &&
      razonSocial !== "" &&
      nDocumento !== "" &&
      email !== "" &&
      currentDate !== "" &&
      fechaCumple !== "" &&
      sexo !== "" &&
      tipoDocumento !== "" &&
      tipoPersona !== "" &&
      isValidPhoneNumber(telefono1) &&
      isValidPhoneNumber(telefono2) &&
      isValidPhoneNumber(telefono3)
    );
  };

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
      setTelefono1(userInfo.telefono1 || "");
      setTelefono2(userInfo.telefono2 || "");
      setTelefono3(userInfo.telefono3 || "");
    }
  }, [userInfo]);

  return (
    <div className="container">
      <Formik
        initialValues={{
          tipo_persona: tipoPersona,
          razonSocial: razonSocial,
          tipo_documento: tipoDocumento,
          sexo: sexo,
          n_documento: nDocumento,
          fecha_cumple: fechaCumple,
          email: email,
          telefono1: telefono1,
          telefono2: telefono2,
          telefono3: telefono3,
        }}
        validate={(values) => {
    const errors = {};
    if (!isFormValid(values)) {
      errors._form = "Por favor complete todos los campos requeridos.";
    }
    return errors;
  }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Valores del formulario:", values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <div className="formDiv">
          <Form>
          <Field type="text" name="currentDate" value={currentDate} readOnly />
            <Field type="text" name="razonSocial" />
            <Field type="text" name="tipo_persona" />
            <Field type="text" name="tipo_documento" />
            <Field type="text" name="sexo" />
            <Field type="text" name="n_documento" />
            <Field type="text" name="fecha_cumple" />
            <Field type="text" name="email" />

            <div>
              Teléfono de contacto 1:
              <Field type="text" name="telefono1" />
            </div>
            <div>
              Teléfono de contacto 2:
              <Field type="text" name="telefono2" />
            </div>
            <div>
              Teléfono de contacto 3:
              <Field type="text" name="telefono3" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Enviar
            </button>
          </Form>
          </div>
        )}
      </Formik>
    </div>
    
  );
}

export default PersonalInfoStep;
