import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createUser } from "../../Redux/Actions/actions";
import './Forms.css'

function FormCreateWorker() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  
  return (
    <div >
      <Formik
        initialValues={{
          tipo_persona: "",
          razonSocial: "",
          apellidos: "",
          nombres: "",
          tipo_documento: "",
          n_documento: "",
          fecha_cumple: "",
          sexo: "",
          email: "",
          password: "",
          id_role: "",
        }}
        validate={(values) => {
          let errors = {};
          // agrega validaciones
          return errors;
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const response = await dispatch(createUser(values));
            console.log(values);
            if (response.success) {
              setSubmissionResult("success");
              resetForm();
              setTimeout(() => {
                setSubmissionResult(null);
                // Redireccionar a la página de inicio después de crear el usuario
                history.push("/homepage");
              }, 2000);
            } else {
              setSubmissionResult("error");
              console.error(response.errorMessage);
            }
          } catch (error) {
            console.error("Hubo un error al enviar el formulario:", error);
          } finally {
            setSubmitting(false);
          }
        }}

      >
        {({ errors, values, isSubmitting }) => (
          <div className="divForm">
            <Form className="container" >
              <div className="divRegister">
                <h2 className="tittle">Crear Usuario</h2>
                {/* Tipo de persona */}
                <div className="reg-div">
                  <div className="item1">
                    <label htmlFor="tipo_persona" className="label-reg">
                      Tipo de persona
                    </label>
                  </div>
                  <div>
                    <Field
                      id="tipo_persona"
                      name="tipo_persona"
                      as="select"
                      className="select"
                      style={{
                        // Estilos para el select
                        padding: '8px',
                        marginBottom: 10,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor: '#ebecf0',
                        fontSize: '16px',
                        width: '50%',
                        boxSizing: 'border-box',
                        fontFamily: 'sans-serif' ,
                      }}
                    >
                      <option value={""} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"P.JURIDICA"} className="option">
                        Jurídica
                      </option>
                      <option value={"P.NATURAL"} className="option">
                        Natural
                      </option>
                    </Field>
                  </div>
                </div>
                {/* Razón Social */}
                {values.tipo_persona === "P.JURIDICA" && (
                  <div className="reg-div">
                    <div className="item3">
                      <label htmlFor="razonSocial" className="label-reg">
                        Razón social
                      </label>
                    </div>
                    <div>
                      <Field
                        type="text"
                        id="razonSocial"
                        name="razonSocial"
                        placeholder=""
                        className="labelInput"
                      />
                    </div>
                  </div>
                )}

                {values.tipo_persona === "P.NATURAL" && (
                  <div className="reg-div">
                    <div className="item9">
                      <label htmlFor="apellidos" className="label-reg">
                        Apellidos
                      </label>
                    </div>
                    <div>
                      <Field
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        placeholder=""
                        className="labelInput"
                      />
                    </div>
                  </div>
                )}

                {values.tipo_persona === "P.NATURAL" && (
                  <div className="reg-div">
                    <div className="item9">
                      <label htmlFor="nombres" className="label-reg">
                        Nombres
                      </label>
                    </div>
                    <div>
                      <Field
                        type="text"
                        id="nombres"
                        name="nombres"
                        placeholder=""
                        className="labelInput"
                      />
                    </div>
                  </div>
                )}
                {/* Tipo de documento */}
                <div className="reg-div">
                  <div className="item4">
                    <label htmlFor="tipo_documento" className="label-reg">
                      Tipo de documento
                    </label>
                  </div>
                  <div>
                    <Field
                      id="tipo_documento"
                      name="tipo_documento"
                      as="select"
                      className="select"
                      style={{
                        // Estilos para el select
                        padding: '8px',
                        marginBottom: 10,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor: '#ebecf0',
                        fontSize: '16px',
                        width: '50%',
                        boxSizing: 'border-box',
                        fontFamily: 'sans-serif' ,
                      }}
                    >
                      <option value={""} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"CC"} className="option">
                        CC
                      </option>
                      <option value={"CE"} className="option">
                        CE
                      </option>
                      <option value={"NIT"} className="option">
                        NIT
                      </option>
                      <option value={"PP"} className="option">
                        PP
                      </option>
                    </Field>
                  </div>
                </div>
                {/* Número de documento */}
                <div className="reg-div">
                  <div className="item4">
                    <label htmlFor="n_documento" className="label-reg">
                      Documento número
                    </label>
                  </div>
                  <div>
                    <Field
                      type="text"
                      id="n_documento"
                      name="n_documento"
                      className="labelInput"
                    />
                  </div>
                </div>
                {/* Fecha de nacimiento */}
                <div className="reg-div">
                  <div className="item2">
                    <label htmlFor="fecha_cumple" className="label-reg">
                      Fecha de nacimiento
                    </label>
                  </div>
                  <div>
                    <Field
                      type="text"
                      id="fecha_cumple"
                      name="fecha_cumple"
                      placeholder="YYYY-MM-DD"
                      className="labelInput"
                    />
                  </div>
                </div>
                {/* Sexo */}
                <div className="reg-div">
                  <div className="item5">
                    <label htmlFor="sexo" className="label-reg">
                      Sexo
                    </label>
                  </div>
                  <div>
                    <Field
                      id="sexo"
                      name="sexo"
                      as="select"
                      className="select"
                      style={{
                        // Estilos para el select
                        padding: '8px',
                        marginBottom: 10,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor: '#ebecf0',
                        fontSize: '16px',
                        width: '50%',
                        boxSizing: 'border-box',
                        fontFamily: 'sans-serif' ,
                      }}
                    >
                      <option value={""} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"M"} className="option">
                        Masculino
                      </option>
                      <option value={"F"} className="option">
                        Femenino
                      </option>
                    </Field>
                  </div>
                </div>
                {/* Correo electrónico */}
                <div className="reg-div">
                  <div className="item7">
                    <label placeholder="email" className="label-reg">
                      Correo electrónico
                    </label>
                  </div>
                  <div>
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="labelInput"
                    />
                  </div>
                </div>
                {/* Contraseña */}
                <div className="reg-div">
                  <div className="item8">
                    <label placeholder="password" className="label-reg">
                      Contraseña
                    </label>
                  </div>
                  <div>
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="passwordInput"
                    />
                  </div>
                  {showPassword ? (
                    <MdOutlineRemoveRedEye
                      className="passwordInput-eyeIcon"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <RiEyeCloseLine
                      className="passwordInput-eyeIcon"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
                {/* Rol */}
                <div className="reg-div">
                  <div className="item4">
                    <label htmlFor="id_role" className="label-reg">
                      Rol
                    </label>
                  </div>
                  <div>
                    <Field
                      id="id_role"
                      name="id_role"
                      as="select"
                      className="select"
                      style={{
                        // Estilos para el select
                        padding: '8px',
                        marginBottom: 10,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor: '#ebecf0',
                        fontSize: '16px',
                        width: '50%',
                        boxSizing: 'border-box',
                        fontFamily: 'sans-serif' ,
                      }}
                    >
                      <option value={""} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"2"} className="option">
                        Tecnico
                      </option>
                      <option value={"3"} className="option">
                        Caja
                      </option>
                      <option value={"4"} className="option">
                        Admin
                      </option>
                    </Field>
                  </div>
                </div>
                {/* Mensaje de éxito o error */}
                {submissionResult === "success" && (
                  <div className="message-container">
                    <div className="success">El registro fue exitoso!.</div>
                  </div>
                )}
                {submissionResult === "error" && (
                  <div className="message-container">
                    <div className="error">
                      El registro NO fue exitoso. Inténtelo nuevamente.
                    </div>
                  </div>
                )}
              </div>
              {/* Botón de enviar */}
              <div className="cuenta">
                <button type="submit" disabled={isSubmitting}>
                  <FaUser /> Crear usuario
                </button>
                <button style={{ marginLeft: 10}}  type="button" onClick={() => history.push("/homePage")}>Volver</button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default FormCreateWorker;

