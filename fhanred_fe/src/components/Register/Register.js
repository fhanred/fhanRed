import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    let errorTimeout;

    // Si el submissionResult es 'error', establece un temporizador para limpiar el estado después de 2 segundos
    if (submissionResult === 'error') {
      errorTimeout = setTimeout(() => {
        setSubmissionResult(null); // Limpiar el estado después de 2 segundos
      }, 2000);
    }

    // Limpia el temporizador si el componente se desmonta o si submissionResult cambia antes de que se complete el temporizador
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [submissionResult]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerRegister">
      <Formik
        initialValues={{
          tipo_persona: 'none',
          razonSocial: '',
          apellidos: '',
          nombres: '',
          tipo_documento: '',
          n_documento: '',
          fecha_cumple: '',
          sexo: 'none',
          email: '',
          password: '',
        }}
        validate={(values) => {
          let errors = {};
          // Validación de apellidos
          if (values.tipo_persona === 'P.NATURAL' && !values.apellidos) {
            errors.apellidos =
              'Este campo es obligatorio. Por favor ingrese sus apellidos';
          } else {
            const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            if (!nameRegex.test(values.apellidos)) {
              errors.apellidos =
                'Este campo solo puede contener letras y espacios';
            }
          }

          // Validación de nombres
          if (values.tipo_persona === 'P.NATURAL' && !values.nombres) {
            errors.nombres =
              'Este campo es obligatorio. Por favor ingrese sus nombres';
          } else {
            const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            if (!nameRegex.test(values.nombres)) {
              errors.nombres =
                'Este campo solo puede contener letras y espacios';
            }
          }

          // Validación de email
          if (!values.email) {
            errors.email =
              'Este campo es obligatorio. Por favor ingrese un correo electronico';
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
              'Este campo es obligatorio. por favor ingrese una contraseña valida.';
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              values.password
            )
          ) {
            errors.password =
              'La contraseña debe tener al menos 8 caracteres, al menos una letra minúscula, al menos una letra mayúscula, al menos un número y al menos un carácter especial.';
          }

          // validacion fecha cumpleaños
          if (values.fecha_cumple) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.fecha_cumple)) {
              errors.fecha_cumple =
                'Fecha no válida. El formato debe ser YYYY-MM-DD.';
            } else {
              const [year, month, day] = values.fecha_cumple
                .split('-')
                .map(Number);
              if (
                day <= 0 ||
                day > 31 || // Día válido entre 1 y 31
                month <= 0 ||
                month > 12 // Mes válido entre 1 y 12
              ) {
                errors.fecha_cumple = 'Fecha no válida. Verifique día y mes.';
              }
            }
          } else {
            errors.fecha_cumple =
              'Este campo es obligatorio. Por favor, ingrese una fecha.';
          }

          //validacion razonSocial
          if (values.tipo_persona === 'P.JURIDICA' && !values.razonSocial) {
            errors.razonSocial =
              'Este campo es obligatorio. por favor ingrese el nombre de la razón social';
          }

          // validacion tipo de documento
          if (values.tipo_documento === 'none') {
            errors.tipo_documento =
              'Este campo es obligatorio. Por favor seleccione una opción';
          }

          // validacion numero de documento
          if (!values.n_documento || values.n_documento.trim() === '') {
            errors.n_documento =
              'Este campo es obligatorio. Por favor ingrese el número de identificación';
          } else if (!/^[a-zA-Z0-9]+$/.test(values.n_documento)) {
            errors.n_documento =
              'El numero de documento no debe contener caracteres especiales ni espacios';
          }

          // validacion tipo de persona
          if (values.tipo_persona === 'none') {
            errors.tipo_persona =
              'Este campo es obligatorio. Por favor seleccione una opción';
          }

          // validacion genero
          if (values.sexo === 'none') {
            errors.sexo =
              'Este campo es obligatorio. Por favor seleccione una opción';
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
          <div className="divForm">
            <Form>
              <div className="divRegister">
                <h2 className="tittle">Registro</h2>
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
                    >
                      <option value={'none'} className="option">
                        Selecciona una opción
                      </option>
                      <option value={'P.JURIDICA'} className="option">
                        Jurídica
                      </option>
                      <option value={'P.NATURAL'} className="option">
                        Natural
                      </option>
                    </Field>
                  </div>
                </div>
                <p>
                  <ErrorMessage
                    name="tipo_persona"
                    component={() => (
                      <div className="error-message-reg">
                        {errors.tipo_persona}
                      </div>
                    )}
                  />
                </p>
                {values.tipo_persona === 'P.NATURAL' && (
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
                <p>
                  <ErrorMessage
                    name="apellidos"
                    component={() => (
                      <div className="error-message-reg">
                        {errors.apellidos}
                      </div>
                    )}
                  />
                </p>

                {values.tipo_persona === 'P.NATURAL' && (
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
                <p>
                  <ErrorMessage
                    name="nombres"
                    component={() => (
                      <div className="error-message-reg">{errors.nombres}</div>
                    )}
                  />
                </p>

                {values.tipo_persona === 'P.JURIDICA' && (
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
                <p>
                  <ErrorMessage
                    name="razonSocial"
                    component={() => (
                      <div className="error-message-reg">
                        {errors.razonSocial}
                      </div>
                    )}
                  />
                </p>

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
                    >
                      <option value={'none'} className="option">
                        Selecciona una opción
                      </option>
                      <option value={'CC'} className="option">
                        CC
                      </option>
                      <option value={'CE'} className="option">
                        CE
                      </option>
                      <option value={'NIT'} className="option">
                        NIT
                      </option>
                      <option value={'PP'} className="option">
                        PP
                      </option>
                    </Field>
                  </div>
                </div>

                <p>
                  <ErrorMessage
                    name="tipo_documento"
                    component={() => (
                      <div className="error-message-reg">
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
                  </div>
                ) : null}

                <p>
                  <ErrorMessage
                    name="n_documento"
                    component={() => (
                      <div className="error-message-reg">
                        {errors.n_documento}
                      </div>
                    )}
                  />
                </p>

                <div className="reg-div">
                  <div className="item5">
                    <label htmlFor="sexo" className="label-reg">
                      Sexo
                    </label>
                  </div>
                  <div>
                    <Field id="sexo" name="sexo" as="select" className="select">
                      <option value={'none'} className="option">
                        Selecciona una opción
                      </option>
                      <option value={'M'} className="option">
                        Masculino
                      </option>
                      <option value={'F'} className="option">
                        Femenino
                      </option>
                    </Field>
                  </div>
                </div>
                <p>
                  <ErrorMessage
                    name="sexo"
                    component={() => (
                      <div className="error-message-reg">{errors.sexo}</div>
                    )}
                  />
                </p>

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
                <p>
                  <ErrorMessage
                    name="fecha_cumple"
                    component={() => (
                      <div className="error-message-reg">
                        {errors.fecha_cumple}
                      </div>
                    )}
                  />
                </p>

                <div className="reg-div">
                  <div className="item7">
                    <label htmlFor="email" className="label-reg">
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
                <p>
                  <ErrorMessage
                    name="email"
                    component={() => (
                      <div className="error-message-reg">{errors.email}</div>
                    )}
                  />
                </p>
                <div className="reg-div">
                  <div className="item8">
                    <label htmlFor="password" className="label-reg">
                      Contraseña
                    </label>
                  </div>
                  <div>
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="passwordInput"
                    />
                  </div>
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
                      <div className="error-message-reg">{errors.password}</div>
                    )}
                  />
                </p>

                <div className="cuenta">
                  <button type="submit" disabled={isSubmitting}>
                    <FaUser /> Crear cuenta
                  </button>
                </div>
                <div>
                  <label>
                    ¿Ya tienes tu cuenta?
                    <NavLink to="/">
                      <span>Iniciar sesión</span>
                    </NavLink>
                  </label>
                </div>
              </div>
              {submissionResult === 'success' && (
                <div className="message-container">
                  <div className="success">El registro fue exitoso!.</div>
                </div>
              )}
              {submissionResult === 'error' && (
                <div className="message-container">
                  <div className="error">
                    'El registro NO fue exitoso. Inténtelo nuevamente.'
                  </div>
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
