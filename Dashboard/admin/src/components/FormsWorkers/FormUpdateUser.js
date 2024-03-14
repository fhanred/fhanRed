import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getUsers, updateUser } from "../../Redux/Actions/actions";

function FormUpdateUser() {
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.usersData); // Accede al estado usersData de Redux
  const [userData, setUserData] = useState(null);
  //const [modifiedUser, setModifiedUser] = useState(null);
  console.log(usersData);
  // hasta aca viene toda la data

  const handleSearch = (n_documento) => {
    // Buscar el usuario dentro de usersData utilizando el número de documento
    const user = usersData.find(user => user.n_documento === n_documento);
    console.log(user)//viene la info de cada user
    if (user) {
      setUserData(user);
    } else {
      alert("Usuario no encontrado");
      setUserData(null);
    }
  };

  const handleSubmit = (values) => {
    // Crea un nuevo objeto con las propiedades modificadas
    const updatedUser = {
      email: values.newEmail,
      password: values.newPassword,
      active: values.newActive === "true",
      id_role: parseInt(values.newIdRole)
    };

    // Actualiza el usuario utilizando el método de Redux
    dispatch(updateUser(userData.n_documento, updatedUser));
  };

  return (
    <div className="container">
      <Formik
        initialValues={{
          n_documento: "",
          newEmail: userData ? userData.email : "", // Inicializa el campo con el email del usuario si está definido
          newPassword: "",
          newActive: userData ? String(userData.active) : "", // Convierte el booleano a string si userData está definido
          newIdRole: userData ? String(userData.id_role) : "" // Convierte el número a string si userData está definido
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(values);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="container">
            <div className="form-group">
              <label htmlFor="n_documento">Número de Documento:</label>
              <Field
                type="text"
                className="form-control"
                id="n_documento"
                name="n_documento"
              />
              <ErrorMessage
                name="n_documento"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSearch(values.n_documento)}
            >
              Buscar
            </button>

            {userData && (
              <div className="edit-fields">
                {/* Renderizar los campos del usuario si userData está definido */}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!userData}
            >
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormUpdateUser;

