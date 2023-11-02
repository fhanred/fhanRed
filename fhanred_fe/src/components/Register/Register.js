import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
//import { useDispatch } from 'react-redux';
import './Register.css';

function Register() {
  //const dispatch = useDispatch();
  const history = useHistory();
  const [sendForm, setSendForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerRegister">
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          address: '',
          email: '',
          password: '',
        }}
        validate={(values) => {
          let errors = {};
          // Validación de nombre
          if (!values.name) {
            errors.name = 'Por favor ingrese un nombre';
          } else {
            const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            if (!nameRegex.test(values.name)) {
              errors.name = 'El nombre solo puede contener letras y espacios';
            }
          }
          if (!values.lastName) {
            errors.lastName = 'Por favor ingrese su apellido';
          } else {
            const lastNameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            if (!lastNameRegex.test(values.lastName)) {
              errors.lastName =
                'El apellido solo puede contener letras y espacios';
            }
          }
          // Validación de email
          if (!values.email) {
            errors.email = 'Por favor ingrese un correo electronico';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = 'El correo no es valido';
          }
          // validacion de password
          if (!values.password) {
            errors.password =
            "La contraseña debe tener: Al menos 8 caracteres. Al menos una letra minúscula, Al menos una letra mayúscula, Al menos un número, Al menos un carácter especial.";
            // " The password must be at least one lowercase letter, one uppercase letter, one number, and one special character, and be at least 8 characters long.";
            // errors.password = "Enter your password";
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              values.password
            )
          ) {
            // errors.password =
            // " The password must be at least one lowercase letter, one uppercase letter, one number, and one special character, and be at least 8 characters long.";
          }
          if (!values.address) {
            errors.address = 'Dato requerido';
          }
          return errors;
        }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);

          setSendForm(true);
          history.push('/');
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ errors, isSubmitting }) => (
          <div>
            <Form className="main">
              <div className="register">
                <h2>Registro</h2>
                <div>
                  <label htmlFor="name">Nombre:</label>
                  <Field type="text" id="name" name="name" placeholder="" />
                </div>
                <p>
                  <ErrorMessage
                    name="name"
                    component={() => (
                      <div className="error-message">{errors.name}</div>
                    )}
                  />
                </p>
                <div>
                  <label htmlFor="lastName">Apellidos:</label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder=""
                  />
                </div>
                <p>
                  <ErrorMessage
                    name="lastName"
                    component={() => (
                      <div className="error-message">{errors.lastName}</div>
                    )}
                  />
                </p>
                <div>
                  <label htmlFor="address">Dirección:</label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder=""
                  />
                </div>
                <p>
                  <ErrorMessage
                    name="address"
                    component={() => (
                      <div className="error-message">{errors.address}</div>
                    )}
                  />
                </p>
                <div>
                  <label htmlFor="email">Correo electrónico:</label>
                  <Field
                    
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    
                  />
                </div>
                <p>
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <div className="error-message">{errors.email}</div>
                    )}
                  />
                </p>
                <div >
                  <label htmlFor="password">Contraseña:</label>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                  {showPassword ? (
                    <MdOutlineRemoveRedEye
                      
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <RiEyeCloseLine
                     
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <p>
                  <ErrorMessage
                    name="password"
                    component={() => (
                      <div className="error-message">{errors.password}</div>
                    )}
                  />
                </p>
                <div>
                  <label>
                  <NavLink to="/">
                    <span>¿Ya estas registrado?</span>
                  </NavLink>
                  </label>
                </div>

                <div>
                  <button type="submit" disabled={isSubmitting}>
                    Registrar
                  </button>
                </div>

                {sendForm && <p>"User successfully added"</p>}
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Register;
