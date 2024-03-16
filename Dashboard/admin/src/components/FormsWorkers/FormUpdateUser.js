import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getUsers, updateUser } from "../../Redux/Actions/actions";
import {useHistory} from "react-router-dom";
import './Forms.css'

function FormUpdateUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const usersData = useSelector((state) => state.usersData); // Accede al estado usersData de Redux
  const [userData, setUserData] = useState(null);
  const [nDocumento, setNDocumento] = useState("")
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  //const [modifiedUser, setModifiedUser] = useState(null);
  
  console.log(usersData);
  // hasta aca viene toda la data
 
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
    .then((response)=>{
      if(response.success){
        setSubmissionResult("success");
        setTimeout(()=>{
          history.push("/homePage");
        },2000);
      }else{
        setSubmissionResult("error");
        console.error(response.errorMessage);
         // Maneja errores de actualización aquí si es necesario
      }
    })
  };

  return (
    <div>
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
    <div className="divForm">
    <Form className="container">
      <div className="divRegister">
      <h2 className="tittle">ABM Empleados</h2>
      <div>
        <div className="item1">
        <label htmlFor="n_documento">
          Número de Documento:
          </label>
        </div>
        <div>
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
      </div>
        
       
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
          <div >

            <label  htmlFor="newEmail" className="label-reg">Email:</label>


            <Field
              type="email"
              className="form-control"
              id="newEmail"
              name="newEmail"
              placeholder = {userData.email}
              

            />
          </div>

          <div >
            <label htmlFor="newPassword">Password:</label>
            <Field
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              

            />
          </div>

          <div >
            <label htmlFor="newActive"></label>
            <Field
              as="select"
              className="form-control"
              id="newActive"
              name="newActive"
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
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </Field>
          </div>

          <div >
            <label htmlFor="newIdRole"></label>
            <Field
              as="select"
              className="form-control"
              id="newIdRole"
              name="newIdRole"
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
             <option value="2">Técnico</option>
              <option value="3">Caja</option>
              <option value="4">Administrador</option>
              </Field>
          </div>
          {updateSuccess === "success"  && (
              
              <div className="message-container" >
               <div className="success">
                ¡Usuario actualizado exitosamente!
                </div>
              </div>
            )}
            {submissionResult === "error" && (
                  <div className="message-container">
                    <div className="error">
                      No se pudo actualizar. Inténtelo nuevamente.
                    </div>
                  </div>
                )}
          {/* Botón para guardar cambios */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!userData}
          >
            Guardar cambios
          </button>
          <button style={{ marginLeft: 10}}  type="button" onClick={() => history.push("/homePage")}>Volver</button>
        </div>
      )}

    
 
    </Form>
    </div>
  )}
</Formik>
    </div>
  );
}

export default FormUpdateUser;
