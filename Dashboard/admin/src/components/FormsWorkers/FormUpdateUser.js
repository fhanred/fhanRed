import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getUsers, updateUser } from "../../Redux/Actions/actions";
import { useHistory, useLocation } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import swal from 'sweetalert2';

function FormUpdateUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const usersData = useSelector((state) => state.usersData);
  const [userData, setUserData] = useState(null);
  const [nDocumento, setNDocumento] = useState();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showSearchButton, setShowSearchButton] = useState(true);
  const n_documento = location.state?.n_documento || "";

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setNDocumento("");
  }, [userData]);

  const handleSearch = useMemo(() => {
    return (n_documento) => {
      const user = usersData.find(user => user.n_documento === n_documento);
      if (user) {
        setUserData(user);
        setShowSearchButton(false);
      } 
    };
  }, [usersData]);

  useEffect(() => {
    if (nDocumento !== "") {
      handleSearch(nDocumento);
    }
  }, [nDocumento, handleSearch]);

  const handleSubmit = (values) => {
    const updatedUser = {
      email: values.newEmail,
      password: values.newPassword,
      active: values.newActive === "true",
      id_role: parseInt(values.newIdRole)
    };

    dispatch(updateUser(userData.n_documento, updatedUser))
      .then((response) => {
        if (response.success) {
          setSubmissionResult("success");
          swal.fire({
            icon: 'success',
            title: 'Cambios guardados correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => {
            history.push("/empleados");
          }, 2000);
        } else {
          setSubmissionResult("error");
          console.error(response.errorMessage);
        }
      })
      .catch((error) => {
        console.error('Error al actualizar usuario:', error);
      })
  };

  return (
    <div>
      <Formik
        initialValues={{
          n_documento: n_documento,
          newEmail: userData ? userData.email : "",
          newPassword: "",
          newActive: userData ? String(userData.active) : "",
          newIdRole: userData ? String(userData.id_role) : ""
        }}
        validate={(values) => {
          const errors = {};
          if (!values.newEmail) {
            errors.newEmail = "El email es requerido";
          } else if (!/^\S+@\S+\.\S+$/.test(values.newEmail)) {
            errors.newEmail = "Formato de email inválido";
          }
          if (!values.newPassword) {
            errors.newPassword = "La contraseña es requerida";
          }
          if (!values.newActive) {
            errors.newActive = "El estado es requerido";
          }
          if (!values.newIdRole) {
            errors.newIdRole = "El rol es requerido";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(values);
        }}
      >
        {({ errors, values, isSubmitting }) => (
          <Form>
            <div className="form-container">
              <h2 className="form-title">ABM Empleados</h2>

              <div className="form-group">
                <label htmlFor="n_documento">Número de Documento:</label>
                <Field
                  value={n_documento}
                  type="text"
                  className="form-control"
                  id="n_documento"
                  name="n_documento"
                />
                <ErrorMessage name="n_documento" component="div" className="error-message" />
              </div>
              {showSearchButton && (
                <ButtonGroup>
                  <div className="buttons-container">
                    <Button type="button" onClick={() => handleSearch(values.n_documento)}>Buscar</Button>
                    <Button
                      style={{ marginLeft: 10 }}
                      type="button"
                      onClick={() => history.push("/homePage")}>
                      Volver
                    </Button>
                  </div>
                </ButtonGroup>
              )}
              {userData && (
                <div className="edit-fields">
                  <div className="form-group">
                    <label htmlFor="newEmail">Email:</label>
                    <Field type="email" id="newEmail" name="newEmail" placeholder={userData.email} />
                    <ErrorMessage name="newEmail" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">Password:</label>
                    <Field type="password" id="newPassword" name="newPassword" />
                    <ErrorMessage name="newPassword" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newActive">Activo:</label>
                    <Field as="select" className="select" id="newActive" name="newActive">
                      <option value="">Selecciona una opción</option>
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </Field>
                    <ErrorMessage name="newActive" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newIdRole">Rol:</label>
                    <Field as="select" className="select" id="newIdRole" name="newIdRole">
                      <option value="">Selecciona una opción</option>
                      <option value="2">Técnico</option>
                      <option value="3">Caja</option>
                      <option value="4">Administrador</option>
                    </Field>
                    <ErrorMessage name="newIdRole" component="div" className="error-message" />
                  </div>

                  {updateSuccess === "success" && (
                    <div className="message success">¡Usuario actualizado exitosamente!</div>
                  )}

                  {submissionResult === "error" && (
                    <div className="message error">No se pudo actualizar. Inténtelo nuevamente.</div>
                  )}
                  <ButtonGroup>
                    <div className="buttons-container">

                      <Button type="submit" disabled={!userData}>Guardar cambios</Button>
                      <Button
                        style={{ marginLeft: 10 }}
                        type="button"
                        onClick={() => history.push("/homePage")}>
                        Volver
                      </Button>
                    </div>
                  </ButtonGroup>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormUpdateUser;
