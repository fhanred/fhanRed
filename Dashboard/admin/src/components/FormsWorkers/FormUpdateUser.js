import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getUsers, updateUser } from "../../Redux/Actions/actions";

function FormUpdateUser() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.usersData); // Accede al estado usersData de Redux
  const [userData, setUserData] = useState(null);
  const [nDocumento, setNDocumento] = useState("")
  //const [modifiedUser, setModifiedUser] = useState(null);
  console.log(usersData);
  // hasta aca viene toda la data
 
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

      {/* Botón para buscar el usuario */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => handleSearch(values.n_documento)}
      >
        Buscar
      </button>

      {userData && (
        <div className="edit-fields">
          <div className="form-group">
            <label htmlFor="newEmail">Email:</label>
            <Field
              type="email"
              className="form-control"
              id="newEmail"
              name="newEmail"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">Password:</label>
            <Field
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newActive">Activo:</label>
            <Field
              as="select"
              className="form-control"
              id="newActive"
              name="newActive"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </Field>
          </div>

          <div className="form-group">
            <label htmlFor="newIdRole">ID Rol:</label>
            <Field
              type="text"
              className="form-control"
              id="newIdRole"
              name="newIdRole"
            />
          </div>

          {/* Botón para guardar cambios */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!userData}
          >
            Guardar cambios
          </button>
        </div>
      )}
    </Form>
  )}
</Formik>
    </div>
  );
}

export default FormUpdateUser;

