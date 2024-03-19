import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createUser } from "../../Redux/Actions/actions";
import { ButtonGroup, Button } from "@mui/material";

function FormCreateWorker() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showPassword, setShowPassword] = useState(false);



  return (
    <div className="">
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
          // Agrega tus validaciones aquí si es necesario
          return errors;
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const response = await dispatch(createUser(values));
            if (response.success) {
              setSubmissionResult("success");
              resetForm();
              setTimeout(() => {
                setSubmissionResult(null);
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
          <Form >
              <div className="form-container" >
            <h2 className="form-title">Crear Usuario</h2>

            <div className="form-group">
              <label htmlFor="tipo_persona">
                Tipo de persona
              </label>
              <Field
                id="tipo_persona"
                name="tipo_persona"
                as="select"
                className="select"
              >
                <option value="">Selecciona una opción</option>
                <option value="P.JURIDICA">Jurídica</option>
                <option value="P.NATURAL">Natural</option>
              </Field>
            </div>

            {values.tipo_persona === "P.JURIDICA" && (
              <div className="form-group">
                <label htmlFor="razonSocial" >
                  Razón social
                </label>
                <Field type="text" id="razonSocial" name="razonSocial" />
              </div>
            )}

            {values.tipo_persona === "P.NATURAL" && (
              <div className="form-group">
                <label htmlFor="apellidos" >
                  Apellidos
                </label>
                <Field type="text" id="apellidos" name="apellidos" />
              </div>
            )}

            {values.tipo_persona === "P.NATURAL" && (
              <div className="form-group">
                <label htmlFor="nombres" >
                  Nombres
                </label>
                <Field type="text" id="nombres" name="nombres" />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="tipo_documento" >
                Tipo de documento
              </label>
              <Field
                id="tipo_documento"
                name="tipo_documento"
                as="select"
                className="select"
              >
                <option value="">Selecciona una opción</option>
                <option value="CC">CC</option>
                <option value="CE">CE</option>
                <option value="NIT">NIT</option>
                <option value="PP">PP</option>
              </Field>
            </div>

            <div className="form-group">
              <label htmlFor="n_documento" >
                Documento N°
              </label>
              <Field type="text" id="n_documento" name="n_documento" />
            </div>

            <div className="form-group">
              <label htmlFor="fecha_cumple" >
                Fecha de nacimiento
              </label>
              <Field
                type="text"
                id="fecha_cumple"
                name="fecha_cumple"
                placeholder="YYYY-MM-DD"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sexo" >
                Sexo
              </label>
              <Field
                id="sexo"
                name="sexo"
                as="select"
                className="select"
              >
                <option value="">Selecciona una opción</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </Field>
            </div>

            <div className="form-group">
              <label htmlFor="email" >
                Correo electrónico
              </label>
              <Field type="text" id="email" name="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password" >
                Contraseña
              </label>
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
              />
              {showPassword ? (
                <MdOutlineRemoveRedEye
                  className="password-eye-icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <RiEyeCloseLine
                  className="password-eye-icon"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="id_role" >
                Rol
              </label>
              <Field
                id="id_role"
                name="id_role"
                as="select"
                className="select"
              >
                <option value="">Selecciona una opción</option>
                <option value="2">Técnico</option>
                <option value="3">Caja</option>
                <option value="4">Admin</option>
              </Field>
            </div>

            {submissionResult === "success" && (
              <div className="message success">El registro fue exitoso!.</div>
            )}
            {submissionResult === "error" && (
              <div className="message error">
                El registro NO fue exitoso. Inténtelo nuevamente.
              </div>
            )}
            <ButtonGroup>
              <div className="buttons-container">
                <Button type="submit" disabled={isSubmitting}>
                  <FaUser /> Crear usuario
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  type="button"
                  onClick={() => history.push("/homePage")}
                >
                  Volver
                </Button>

              </div>
            </ButtonGroup>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormCreateWorker;

