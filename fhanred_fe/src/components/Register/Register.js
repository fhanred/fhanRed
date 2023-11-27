import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import './Register.css';
import { createUser } from '../../Redux/Actions/actions';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerRegister">
      <Formik
        initialValues={{
          tipo_persona: 'none',
          name_razonSocial: '',
          tipo_documento: '',
          n_documento: '',
          sexo: "none",
          email: '',
          password: '',
        }}
        validate={(values) => {
          let errors = {};
          // Validación de nombre
          if (values.tipo_persona === 'P.NATURAL' && !values.name_razonSocial) {
            errors.name_razonSocial =
              'Por favor ingrese sus nombres y apellidos';
          } else {
            const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            if (!nameRegex.test(values.name_razonSocial)) {
              errors.name_razonSocial =
                'Este campo solo puede contener letras y espacios';
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
            errors.password = 'La contraseña es requerida.';
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              values.password
            )
          ) {
            errors.password =
              'La contraseña debe tener al menos 8 caracteres, al menos una letra minúscula, al menos una letra mayúscula, al menos un número y al menos un carácter especial.';
          }
          
          if (
            values.tipo_persona === 'P.JURIDICA' &&
            !values.name_razonSocial
          ) {
            errors.name_razonSocial = 'Dato Requerido';
          }
          if (values.tipo_documento === 'none') {
            errors.tipo_documento = 'Dato Requerido';
          }
          if (!values.n_documento || values.n_documento.trim() === '') {
            errors.n_documento = 'Dato Requerido';
          } else if (!/^[a-zA-Z0-9]+$/.test(values.n_documento)) {
            errors.n_documento =
              'El numero de documento no debe contener caracteres especiales ni espacios';
          }
          if (values.tipo_persona === 'none') {
            errors.tipo_persona = 'Dato Requerido';
          }
          if (values.sexo === "none") {
            errors.sexo = "Dato Requerido";
          }
          return errors;
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const response = await dispatch(createUser(values));

            if (response.success) {
              setSubmissionResult('success');
              resetForm();
              setTimeout(() => {
                setSubmissionResult(null); // Reinicia el estado después de un cierto tiempo
                history.push('/');
              }, 2000); // Tiempo en milisegundos
            } else {
              setSubmissionResult('error');
              console.error(response.message);
            }
          } catch (error) {
            console.error('Hubo un error al enviar el formulario:', error);
            // Manejo adicional de errores si es necesario
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, values, isSubmitting }) => (
          <div>
            <Form>
              <div className="register">
                <h2 className='tittle'>Registro</h2>
                <div className="form-div">
                  <label htmlFor="tipo_persona" className="label-reg">
                    Tipo de persona
                  </label>
                  <Field id="tipo_persona" name="tipo_persona" as="select" className="select">
                    <option value={'none'} className="option">Selecciona una opción</option>
                    <option value={'P.JURIDICA'} className="option">Jurídica</option>
                    <option value={'P.NATURAL'} className="option">Natural</option>
                  </Field>
                </div>
                <p>
                  <ErrorMessage
                    name="tipo_persona"
                    component={() => (
                      <div className="error-message">{errors.tipo_persona}</div>
                    )}
                  />
                </p>
                {values.tipo_persona === 'P.NATURAL' && (
                  <div className="form-div">
                    <label htmlFor="name" className="label-reg">
                      Nombres y Apellidos
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name_razonSocial"
                      placeholder=""
                      disabled={values.tipo_persona === 'P.JURIDICA'}
                    />
                  </div>
                )}
                <p>
                  <ErrorMessage
                    name="name"
                    component={() => (
                      <div className="error-message">{errors.name}</div>
                    )}
                  />
                </p>

                {values.tipo_persona === 'P.JURIDICA' && (
                  <div className="form-div">
                    <label htmlFor="name_razonSocial" className="label-reg">
                      Razón social
                    </label>
                    <Field
                      type="text"
                      id="name_razonSocial"
                      name="name_razonSocial"
                      placeholder=""
                      disabled={values.tipo_persona === 'P.NATURAL'}
                    />
                  </div>
                )}
                <p>
                  <ErrorMessage
                    name="name_razonSocial"
                    component={() => (
                      <div className="error-message">
                        {errors.name_razonSocial}
                      </div>
                    )}
                  />
                </p>
                {values.tipo_persona === 'P.JURIDICA' ||
                values.tipo_persona === 'P.NATURAL' ? (
                  <div className="form-div">
                    <label htmlFor="tipo_documento" className="label-reg">
                      Tipo de documento
                    </label>
                    <Field
                      id="tipo_documento"
                      name="tipo_documento"
                      as="select"
                      className="select"
                    >
                      <option value={'none'} className="option">Selecciona una opción</option>
                      <option value={'CC'} className="option">CC</option>
                      <option value={'CE'} className="option">CE</option>
                      <option value={'NIT'} className="option">NIT</option>
                      <option value={'PP'} className="option">PP</option>
                    </Field>
                  </div>
                ) : null}

                <p>
                  <ErrorMessage
                    name="tipo_documento"
                    component={() => (
                      <div className="error-message">
                        {errors.tipo_documento}
                      </div>
                    )}
                  />
                </p>
                {values.tipo_persona === 'P.JURIDICA' ||
                values.tipo_persona === 'P.NATURAL' ? (
                  <div className="form-div-doc">
                    {values.tipo_documento === 'NIT' && (
                      <p className="verification-note">
                        NO debe registrar el DV, no debe enviar caracteres
                        especiales como espacios o letras
                      </p>
                    )}
                    {values.tipo_documento !== 'NIT' &&
                      values.tipo_documento !== '' && (
                        <p className="verification-note">
                          NO debe enviar caracteres especiales como espacios o
                          letras
                        </p>
                      )}
                    <div className="label-input-doc">
                      <label htmlFor="n_documento" className="label-doc">
                        Número de documento
                      </label>
                      <Field type="text" id="n_documento" name="n_documento" />
                    </div>
                  </div>
                ) : null}

                <p>
                  <ErrorMessage
                    name="n_documento"
                    component={() => (
                      <div className="error-message">{errors.n_documento}</div>
                    )}
                  />
                </p>

                <div className="form-div">
                    <label htmlFor="sexo" className="label-reg">
                      Sexo
                    </label>
                    <Field id="sexo" name="sexo" as="select" className="select">
                      <option value={"none"} className="option">
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
                  <p>
                    <ErrorMessage
                      name="sexo"
                      component={() => (
                        <div className="error-message">{errors.sexo}</div>
                      )}
                    />
                  </p>

                  <div className="form-div">
                    <label htmlFor="fecha_cumple" className="label-reg">
                      Fecha de nacimiento
                    </label>
                    <Field
                      type="text"
                      id="fecha_cumple"
                      name="fecha_cumple"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="fecha_cumple"
                      component={() => (
                        <div className="error-message">
                          {errors.fecha_cumple}
                        </div>
                      )}
                    />
                  </p>

                <div className="form-div">
                  <label htmlFor="email" className="label-reg">
                    Correo electrónico
                  </label>
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
                <div className="form-div">
                  <label htmlFor="password" className="label-reg">
                    Contraseña
                  </label>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="passwordInput"
                  />
                  {showPassword ? (
                    <MdOutlineRemoveRedEye
                      className="passwordInput-eyeIcon"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <RiEyeCloseLine
                      className="passwordInput-eyeIcon"
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
                  <FaUser  />  Crear cuenta
                  </button>
                </div>
              </div>
              {submissionResult === 'success' && (
        <div className="success-message">
          'Usuario registrado correctamente.'
        </div>
      )}
      {submissionResult === 'error' && (
        <div className="error-message">
          'El registro NO fue exitoso. Inténtelo nuevamente.'
        </div>
      )}
            </Form>
          </div>
        )}
        
      </Formik>
      
    </div>
  );
}

export default Register;
