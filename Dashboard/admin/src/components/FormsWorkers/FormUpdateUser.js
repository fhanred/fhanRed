import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getUsers, updateUser } from "../../Redux/Actions/actions";
import { useHistory } from "react-router-dom";
import './Forms.css'
import { ButtonGroup, Button } from "@mui/material";

function FormUpdateUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const usersData = useSelector((state) => state.usersData); // Accede al estado usersData de Redux
  const [userData, setUserData] = useState(null);
  const [nDocumento, setNDocumento] = useState("")
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setNDocumento(""); // Limpiar el estado del formulario cuando el usuario cambie
  }, [userData]);

  const handleSearch = useMemo(() => {
    return (n_documento) => {

      const user = usersData.find(user => user.n_documento === n_documento);

      if (user) {
        console.log("Usuario encontrado:", user);
        setUserData(user);
      } else {
        alert("Usuario no encontrado");
        setUserData(null);
      }
    };
  }, [usersData]);

  useEffect(() => {
    if (nDocumento !== "") {
      handleSearch(nDocumento);
    }
  }, [nDocumento, handleSearch]);




  const handleSubmit = (values) => {
    // Crea un nuevo objeto con las propiedades modificadas
    const updatedUser = {
      email: values.newEmail,
      password: values.newPassword,
      active: values.newActive === "true",
      id_role: parseInt(values.newIdRole)
    };

    // Actualiza el usuario utilizando el método de Redux
    dispatch(updateUser(userData.n_documento, updatedUser))
      .then((response) => {
        if (response.success) {
          setSubmissionResult("success");
          setTimeout(() => {
            history.push("/homePage");
          }, 2000);
        } else {
          setSubmissionResult("error");
          console.error(response.errorMessage);
          // Maneja errores de actualización aquí si es necesario
        }
      })
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          n_documento: "",
          newEmail: userData ? userData.email : "",
          newPassword: "",
          newActive: userData ? String(userData.active) : "",
          newIdRole: userData ? String(userData.id_role) : ""
        }}
        validate={(values) => {
          let errors = {};
          // Agrega tus validaciones aquí si es necesario
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(values);
        }}
      >
        {({ errors, values, isSubmitting }) => (
          <Form className="form">
            <h2 className="form-title">ABM Empleados</h2>

            <div className="form-group">
              <label htmlFor="n_documento">Número de Documento:</label>
              <Field type="text" className="form-control" id="n_documento" name="n_documento" />
              <ErrorMessage name="n_documento" component="div" className="error-message" />
            </div>
            <ButtonGroup>
              <div className="buttons-container">
                <Button type="button"
                  onClick={() => handleSearch(values.n_documento)}>Buscar</Button>
              </div>
            </ButtonGroup>
            {userData && (
              <div className="edit-fields">
                <div className="form-group">
                  <label htmlFor="newEmail" className="label-reg">Email:</label>
                  <Field type="email" className="form-control" id="newEmail" name="newEmail" placeholder={userData.email} />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">Password:</label>
                  <Field type="password" className="form-control" id="newPassword" name="newPassword" />
                </div>

                <div className="form-group">
                  <label htmlFor="newActive">Activo:</label>
                  <Field as="select" className="select" id="newActive" name="newActive">
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </Field>
                </div>

                <div className="form-group">
                  <label htmlFor="newIdRole">Rol:</label>
                  <Field as="select" className="select" id="newIdRole" name="newIdRole">
                    <option value="2">Técnico</option>
                    <option value="3">Caja</option>
                    <option value="4">Administrador</option>
                  </Field>
                </div>

                {updateSuccess === "success" && (
                  <div className="message success">¡Usuario actualizado exitosamente!</div>
                )}

                {submissionResult === "error" && (
                  <div className="message error">No se pudo actualizar. Inténtelo nuevamente.</div>
                )}
                <ButtonGroup>
                  <div className="buttons-container">

                  <Button type="submit"  disabled={!userData}>
                    Guardar cambios</Button>
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
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormUpdateUser;
