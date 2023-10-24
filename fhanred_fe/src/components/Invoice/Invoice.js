import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import { createInvoice } from '../../Redux/Actions/actions';
import './Invoice.css';
import CameraCapture from '../CameraCapture/CameraCapture';

function Invoice() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [submissionResult, setSubmissionResult] = useState(null);
  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };
  return (
    <div className="container">
      {submissionResult === 'success' && (
        <div className="success-message">El formulario se envió con éxito.</div>
      )}
      {submissionResult === 'error' && (
        <div className="error-message">No se pudo enviar el formulario.</div>
      )}
      <Formik
        initialValues={{
          name: '', //ok
          lastName: '', //ok
          gender: 'none',
          typeId: 'none' /*tipo documento identificacion*/, //ok
          doc_user: 0,
          doc_user_image: null,
          typePerson: 'none', //ok
          email: '', //ok
          Order_date: '', //0k
          birthDate: '', // ok
          CompanyName: '', //ok
          phone1: '', //ok
          phone2: '', //ok
          phone3: '', //ok
          Product_name: 'none' /*plan*/, //ok
          n_contrato: '' /*numero contrato*/, //ok
          idStratus: 'none', //ok
          idZone: 'none', //ok
          idTypeHouse: 'none', // ok
          country: '',
          municipality: 'none', // ok
          district: '',
          address: '', //ok
          reportCentralCredit: 'none', //Ok
          fact_email: 'none', //
          startDate: '', //ok
          cutoffDate: '', //ok
          LastPayment: '', //ok
          salesman: '', //ok
          trademarkONU: '', //ok
          boxNAP: '',
          MacONU: '',
          idStateInvoice: 'none',
        }}
        validate={(values) => {
          let errors = {};

          if (step === 1) {
            if (values.Order_date) {
              const datePattern = /^(\d{2}\/\d{2}\/\d{4})$/;
              if (!datePattern.test(values.Order_date)) {
                errors.Order_date =
                  'Fecha no válida. El formato debe ser dd/MM/yyyy.';
              } else {
                const [day, month, year] =
                  values.Order_date.split('/').map(Number);
                if (
                  day <= 0 ||
                  day > 31 || // Día válido entre 1 y 31
                  month <= 0 ||
                  month > 12 // Mes válido entre 1 y 12
                ) {
                  errors.Order_date = 'Fecha no válida. Verifique día y mes.';
                }
              }
            } else {
              errors.Order_date =
                'Este campo es obligatorio. Por favor, ingrese una fecha.';
            }

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

            errors.gender =
              values.gender === 'none' ? 'Dato Requerido' : undefined;
            errors.typeId =
              values.typeId === 'none' ? 'Dato Requerido' : undefined;
            errors.doc_user = !values.doc_user ? 'Dato Requerido' : undefined;
            errors.typePerson =
              values.typePerson === 'none' ? 'Dato Requerido' : undefined;

            if (!values.email) {
              errors.email = 'Por favor ingrese un correo electrónico';
            } else {
              const emailRegex =
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
              if (!emailRegex.test(values.email)) {
                errors.email = 'El correo no es válido';
              }
            }

            if (values.birthDate) {
              const datePattern = /^(\d{2}\/\d{2}\/\d{4})$/;
              if (!datePattern.test(values.birthDate)) {
                errors.birthDate =
                  'Fecha no válida. El formato debe ser dd/MM/yyyy.';
              } else {
                const [day, month, year] = values.birthDate
                  .split('/')
                  .map(Number);
                if (
                  day <= 0 ||
                  day > 31 || // Día válido entre 1 y 31
                  month <= 0 ||
                  month > 12 // Mes válido entre 1 y 12
                ) {
                  errors.birthDate = 'Fecha no válida. Verifique día y mes.';
                }
              }
            } else {
              errors.birthDate =
                'Este campo es obligatorio. Por favor, ingrese una fecha.';
            }

            errors.CompanyName =
              values.typePerson === 'Jurídica' && !values.CompanyName
                ? 'Dato Requerido'
                : undefined;

            if (!values.phone1) {
              errors.phone1 = 'Por favor ingrese un número de celular';
            } else {
              const phoneRegex = /^[0-9]{10}$/;
              const isValidPhone = phoneRegex.test(values.phone1);

              if (!isValidPhone) {
                errors.phone1 = 'Por favor ingrese un número válido';
              }
            }

            if (!values.phone2) {
              errors.phone2 = 'Por favor ingrese un número de celular';
            } else {
              const phoneRegex = /^[0-9]{10}$/;
              const isValidPhone = phoneRegex.test(values.phone2);

              if (!isValidPhone) {
                errors.phone2 = 'Por favor ingrese un número válido';
              }
            }

            if (!values.phone3) {
              errors.phone3 = 'Por favor ingrese un número de celular';
            } else {
              const phoneRegex = /^[0-9]{10}$/;
              const isValidPhone = phoneRegex.test(values.phone3);

              if (!isValidPhone) {
                errors.phone3 = 'Por favor ingrese un número válido';
              }
            }
          } else if (step === 2) {
            errors.Product_name =
              values.Product_name === 'none' ? 'Dato Requerido' : undefined;
            errors.n_contrato = !values.n_contrato
              ? 'Dato requerido'
              : undefined;
            errors.idStratus =
              values.idStratus === 'none' ? 'Dato requerido' : undefined;
            errors.idZone =
              values.idZone === 'none' ? 'Dato requerido' : undefined;
            errors.idTypeHouse =
              values.idTypeHouse === 'none' ? 'Dato requerido' : undefined;
            errors.country = !values.country ? 'Dato requerido' : undefined;
            errors.departament = !values.departament
              ? 'Dato requerido'
              : undefined;
            errors.district = !values.district ? 'Dato requerido' : undefined;
            errors.address = !values.address ? 'Dato requerido' : undefined;
            errors.municipality =
              values.municipality === 'none' ? 'Dato requerido' : undefined;
            errors.reportCentralCredit =
              values.reportCentralCredit === 'none'
                ? 'Dato Requerido'
                : undefined;
            errors.fact_email =
              values.fact_email === 'none' ? 'Dato requerido' : undefined;

            if (values.startDate) {
              const datePattern = /^(\d{2}\/\d{2}\/\d{4})$/;
              if (!datePattern.test(values.startDate)) {
                errors.startDate =
                  'Fecha no válida. El formato debe ser dd/MM/yyyy.';
              } else {
                const [day, month, year] = values.startDate
                  .split('/')
                  .map(Number);
                if (
                  day <= 0 ||
                  day > 31 || // Día válido entre 1 y 31
                  month <= 0 ||
                  month > 12 // Mes válido entre 1 y 12
                ) {
                  errors.startDate = 'Fecha no válida. Verifique día y mes.';
                }
              }
            } else {
              errors.startDate =
                'Este campo es obligatorio. Por favor, ingrese una fecha.';
            }

            if (values.cutoffDate) {
              const datePattern = /^(\d{2}\/\d{2}\/\d{4})$/;
              if (!datePattern.test(values.cutoffDate)) {
                errors.cutoffDate =
                  'Fecha no válida. El formato debe ser dd/MM/yyyy.';
              } else {
                const [day, month, year] = values.cutoffDate
                  .split('/')
                  .map(Number);
                if (
                  day <= 0 ||
                  day > 31 || // Día válido entre 1 y 31
                  month <= 0 ||
                  month > 12 // Mes válido entre 1 y 12
                ) {
                  errors.cutoffDate = 'Fecha no válida. Verifique día y mes.';
                }
              }
            } else {
              errors.cutoffDate =
                'Este campo es obligatorio. Por favor, ingrese una fecha.';
            }

            if (values.LastPayment) {
              const datePattern = /^(\d{2}\/\d{2}\/\d{4})$/;
              if (!datePattern.test(values.LastPayment)) {
                errors.LastPayment =
                  'Fecha no válida. El formato debe ser dd/MM/yyyy.';
              } else {
                const [day, month, year] =
                  values.LastPayment.split('/').map(Number);
                if (
                  day <= 0 ||
                  day > 31 || // Día válido entre 1 y 31
                  month <= 0 ||
                  month > 12 // Mes válido entre 1 y 12
                ) {
                  errors.LastPayment = 'Fecha no válida. Verifique día y mes.';
                }
              }
            } else {
              errors.LastPayment =
                'Este campo es obligatorio. Por favor, ingrese una fecha.';
            }
          } else if (step === 3) {
            errors.salesman = !values.salesman ? 'Dato requerido' : undefined;
            errors.trademarkONU = !values.trademarkONU
              ? 'Dato requerido'
              : undefined;
            errors.boxNAP = !values.boxNAP ? 'Dato requerido' : undefined;
            errors.MacONU = !values.MacONU ? 'Dato requerido' : undefined;
            errors.idStateInvoice =
              values.idStateInvoice === 'none' ? 'Dato Requerido' : undefined;
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (step === 3) {
            dispatch(createInvoice(values))
              .then((response) => {
                if (response.success) {
                  setSubmissionResult('success');
                  setSubmitting(false);
                  resetForm();
                  history.push('/admin/datosClientes');
                } else {
                  setSubmissionResult('error');
                  console.error(response.message);
                  setSubmitting(false);
                }
              })
              .catch((error) => {
                setSubmissionResult('error');
                console.error(error);
                setSubmitting(false);
              });
          } else {
            nextStep();
          }
        }}

        /*SE UTILIZA CUANDO NO ESTOY CONECTADO A SERVIDOR Y QUIERO VER COMO ENVIA INFORMACION*/
        // onSubmit={(values, { setSubmitting, resetForm }) => {

        //   setTimeout(() => {
        //     const success = Math.random() < 0.5;
        //     setSubmissionResult(success ? 'success' : 'error');

        //     if (step === 3) {
        //       dispatch(createInvoice(values));
        //       setSubmitting(false);
        //       resetForm();
        //       history.push('/admin/datosClientes');
        //       console.log(values);
        //     } else {
        //       nextStep();
        //     }
        //   }, 3000); // 3000 ms = 3 segundos
        // }}
      >
        {({ isSubmitting, touchedFields, values, errors }) => (
          <div>
            <Form>
              {step === 1 && (
                <div className="formSection">
                  <h2>Datos personales</h2>

                  <div className="form-group">
                    <label htmlFor="Order_date">Fecha:</label>
                    <Field
                      type="text"
                      id="Order_date"
                      name="Order_date"
                      placeholder="dd/MM/yyyy"
                    />
                    <ErrorMessage
                      name="Order_date"
                      component={() => (
                        <div className="error-message">{errors.Order_date}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <Field type="text" id="name" name="name" placeholder="" />
                    <ErrorMessage
                      name="name"
                      component={() => (
                        <div className="error-message">{errors.name}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Apellidos:</label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="lastName"
                      component={() => (
                        <div className="error-message">{errors.lastName}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Genero:</label>
                    <Field id="gender" name="gender" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Masculino'}>Masculino</option>
                      <option value={'Femenino'}>Femenino</option>
                      <option value={'No binario'}>No binario</option>
                      <option value={'Prefiero no decirlo'}>
                        Prefiero no decirlo
                      </option>
                      <option value={'Otro'}>Otro</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component={() => (
                        <div className="error-message">{errors.gender}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="typeId">Tipo de documento:</label>
                    <Field id="typeId" name="typeId" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={1}>CC</option>
                      <option value={2}>CE</option>
                      <option value={3}>NIT</option>
                      <option value={4}>PP</option>
                    </Field>
                    <ErrorMessage
                      name="typeId"
                      component={() => (
                        <div className="error-message">{errors.typeId}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="doc_user">Número de documento:</label>
                    <Field
                      type="number" // Esto hace que el campo sea de tipo número
                      id="doc_user"
                      name="doc_user"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="doc_user"
                      component={() => (
                        <div className="error-message">{errors.doc_user}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="doc_user_image">
                      Archivo de su documento de identificación por ambas caras:
                    </label>
                    <Field
                      type="file"
                      id="doc_user_image"
                      name="doc_user_image"
                      accept=".pdf, image/*" // Permite archivos PDF e imágenes
                      className="form-control"
                    />
                    <small className="form-text text-muted">
                      Puede cargar un archivo en PDF o tomar una imagen.
                    </small>
                    <CameraCapture />
                    <ErrorMessage
                      name="doc_user_image"
                      component={() => (
                        <div className="error-message">{errors.doc_user}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="typePerson">Tipo de persona:</label>
                    <Field id="typePerson" name="typePerson" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Jurídica'}>Jurídica</option>
                      <option value={'Natural'}>Natural</option>
                    </Field>
                    <ErrorMessage
                      name="typePerson"
                      component={() => (
                        <div className="error-message">{errors.typePerson}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="email"
                      component={() => (
                        <div className="error-message">{errors.email}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="birthDate">Fecha de nacimiento:</label>
                    <Field
                      type="text"
                      id="birthDate"
                      name="birthDate"
                      placeholder="dd/MM/yyyy"
                    />
                    <ErrorMessage
                      name="birthDate"
                      component={() => (
                        <div className="error-message">{errors.birthDate}</div>
                      )}
                    />
                  </div>

                  {values.typePerson === 'Jurídica' && (
                    <div className="form-group">
                      <label htmlFor="CompanyName">Razón social:</label>
                      <Field
                        type="text"
                        id="CompanyName"
                        name="CompanyName"
                        placeholder=""
                        disabled={values.typePerson === 'Natural'}
                      />
                      <ErrorMessage
                        name="CompanyName"
                        component={() => (
                          <div className="error-message">
                            {errors.CompanyName}
                          </div>
                        )}
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="phone1" className="phone-label">
                      Teléfono de Contacto 1:
                    </label>
                    <Field
                      type="tel"
                      id="phone1"
                      name="phone1"
                      placeholder=""
                      className="phone-input"
                    />
                    <ErrorMessage
                      name="phone1"
                      component={() => (
                        <div className="error-message">{errors.phone1}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone2" className="phone-label">
                      Teléfono de contacto 2:
                    </label>
                    <Field
                      type="tel"
                      id="phone2"
                      name="phone2"
                      placeholder=""
                      className="phone-input"
                    />
                    <ErrorMessage
                      name="phone2"
                      component={() => (
                        <div className="error-message">{errors.phone2}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone3" className="phone-label">
                      Teléfono de contacto 3:
                    </label>
                    <Field
                      type="tel"
                      id="phone3"
                      name="phone3"
                      placeholder=""
                      className="phone-input"
                    />
                    <ErrorMessage
                      name="phone3"
                      component={() => (
                        <div className="error-message">{errors.phone3}</div>
                      )}
                    />
                  </div>
                  <button type="button" onClick={nextStep}>
                    Siguiente
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="formSection">
                  <h2>Datos plan </h2>

                  <div className="form-group">
                    <label htmlFor="Product_name">Plan:</label>
                    <Field id="Product_name" name="Product_name" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'SIN TARIFA'}>SIN TARIFA</option>
                      <option value={'TARIFA SIN COSTO'}>
                        TARIFA SIN COSTO
                      </option>
                      <option value={'5 MB - BRONCE'}>5 MB - BRONCE</option>
                      <option value={'7 MB - PLATA'}>7 MB - PLATA</option>
                      <option value={'10 MB - ORO'}>10 MB - ORO</option>
                      <option value={'20 MB - PLATINO'}>20 MB - PLATINO</option>
                      <option value={'PLAN BRONCE 5 MEGAS CON IVA'}>
                        PLAN BRONCE 5 MEGAS CON IVA
                      </option>
                      <option value={'PLAN ORO 10 MEGAS CON IVA'}>
                        PLAN ORO 10 MEGAS CON IVA
                      </option>
                      <option value={'PLAN PLATINO 20 MEGAS CON IVA'}>
                        PLAN PLATINO 20 MEGAS CON IVA
                      </option>
                      <option value={'30MG PLAN RUBI  SIN IVA'}>
                        30MG PLAN RUBI SIN IV
                      </option>
                      <option value={'50MG PLAN ZAFIRO SIN IVA'}>
                        50MG PLAN ZAFIRO SIN IVA
                      </option>
                      <option value={'100MG PLAN ESMERALDA CON IVA'}>
                        100MG PLAN ESMERALDA CON IVA
                      </option>
                    </Field>
                    <ErrorMessage
                      name="Product_name"
                      component={() => (
                        <div className="error-message">
                          {errors.Product_name}
                        </div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="n_contrato">Código:</label>
                    <Field
                      type="text"
                      id="n_contrato"
                      name="n_contrato"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="n_contrato"
                      component={() => (
                        <div className="error-message">{errors.n_contrato}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="idStratus">Estrato:</label>
                    <Field id="idStratus" name="idStratus" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={3}>5</option>
                      <option value={4}>6</option>
                    </Field>
                    <ErrorMessage
                      name="idStratus"
                      component={() => (
                        <div className="error-message">{errors.idStratus}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="idZone">Zona:</label>
                    <Field id="idZone" name="idZone" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Urbana'}>Urbana</option>
                      <option value={'Rural'}>Rural</option>
                    </Field>
                    <ErrorMessage
                      name="idZone"
                      component={() => (
                        <div className="error-message">{errors.idZone}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="idTypeHouse">Tipo de vivienda:</label>
                    <Field id="idTypeHouse" name="idTypeHouse" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Alquilada'}>Alquilada</option>
                      <option value={'Propia'}>Propia</option>
                      <option value={'Familiar'}>Familiar</option>
                      <option value={'Tienda'}>Tienda</option>
                      <option value={'Instituciones'}>Instituciones</option>
                      <option value={'Edificio'}>Edificio</option>
                      <option value={'Hostal/Hotel'}>Hostal/Hotel</option>
                      <option value={'Finca'}>Finca</option>
                      <option value={'Cabaña'}>Cabaña</option>
                    </Field>
                    <ErrorMessage
                      name="idTypeHouse"
                      component={() => (
                        <div className="error-message">
                          {errors.idTypeHouse}
                        </div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Pais:</label>
                    <Field
                      type="text"
                      id="country"
                      name="country"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="country"
                      component={() => (
                        <div className="error-message">{errors.country}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="departament">Departamento:</label>
                    <Field
                      type="text"
                      id="departament"
                      name="departament"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="departament"
                      component={() => (
                        <div className="error-message">
                          {errors.departament}
                        </div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="municipality">Municipio:</label>
                    <Field id="municipality" name="municipality" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Restrepo'}>Restrepo</option>
                      <option value={'Cumaral'}>Cumaral</option>
                    </Field>
                    <ErrorMessage
                      name="municipality"
                      component={() => (
                        <div className="error-message">
                          {errors.municipality}
                        </div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="district">Barrio:</label>
                    <Field
                      type="text"
                      id="district"
                      name="district"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="district"
                      component={() => (
                        <div className="error-message">{errors.district}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Dirección principal:</label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="address"
                      component={() => (
                        <div className="error-message">{errors.address}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reportCentralCredit">
                      Reporte central de riesgo:
                    </label>
                    <Field
                      id="reportCentralCredit"
                      name="reportCentralCredit"
                      as="select"
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Si'}>Si</option>
                      <option value={'No'}>No</option>
                    </Field>
                    <ErrorMessage
                      name="reportCentralCredit"
                      component={() => (
                        <div className="error-message">
                          {errors.reportCentralCredit}
                        </div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fact_email">
                      Envio factura correo electrónico:
                    </label>
                    <Field id="fact_email" name="fact_email" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Si'}>Si</option>
                      <option value={'No'}>No</option>
                    </Field>
                    <ErrorMessage
                      name="fact_email"
                      component={() => (
                        <div className="error-message">{errors.fact_email}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="startDate">Fecha de inicio:</label>
                    <Field
                      type="text"
                      id="startDate"
                      name="startDate"
                      placeholder="dd/MM/yyyy"
                    />
                    <ErrorMessage
                      name="startDate"
                      component={() => (
                        <div className="error-message">{errors.startDate}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cutoffDate">Fecha de corte:</label>
                    <Field
                      type="text"
                      id="cutoffDate"
                      name="cutoffDate"
                      placeholder="dd/MM/yyyy"
                    />
                    <ErrorMessage
                      name="cutoffDate"
                      component={() => (
                        <div className="error-message">{errors.cutoffDate}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="LastPayment">Fecha último pago:</label>
                    <Field
                      type="text"
                      id="LastPayment"
                      name="LastPayment"
                      placeholder="dd/MM/yyyy"
                    />
                    <ErrorMessage
                      name="LastPayment"
                      component={() => (
                        <div className="error-message">
                          {errors.LastPayment}
                        </div>
                      )}
                    />
                  </div>
                  <button type="button" onClick={previousStep}>
                    Anterior
                  </button>
                  <button type="button" onClick={nextStep}>
                    Siguiente
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="formSection">
                  <h2>Datos de la instalacion</h2>

                  <div className="form-group">
                    <label htmlFor="trademarkONU">Marca de ONU:</label>
                    <Field
                      type="text"
                      id="trademarkONU"
                      name="trademarkONU"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="trademarkONU"
                      component={() => (
                        <div className="error-message">
                          {errors.trademarkONU}
                        </div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="boxNAP">Caja NAP:</label>
                    <Field
                      type="text"
                      id="boxNAP"
                      name="boxNAP"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="boxNAP"
                      component={() => (
                        <div className="error-message">{errors.boxNAP}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="MacONU">Mac de ONU:</label>
                    <Field
                      type="text"
                      id="MacONU"
                      name="MacONU"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="MacONU"
                      component={() => (
                        <div className="error-message">{errors.MacONU}</div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="idStateInvoice">Estado contrato:</label>
                    <Field
                      id="idStateInvoice"
                      name="idStateInvoice"
                      as="select"
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Activo'}>Activo</option>
                      <option value={'Cortado'}>Cortado</option>
                      <option value={'Retirado'}>Retirado</option>
                      <option value={'Anulado'}>Anulado</option>
                      <option value={'Por instalar'}>Por instalar</option>
                    </Field>
                    <ErrorMessage
                      name="idStateInvoice"
                      component={() => (
                        <div className="error-message">
                          {errors.idStateInvoice}
                        </div>
                      )}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="salesman">Vendedor:</label>
                    <Field
                      type="text"
                      id="salesman"
                      name="salesman"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="salesman"
                      component={() => (
                        <div className="error-message">{errors.salesman}</div>
                      )}
                    />
                  </div>
                  <button type="button" onClick={previousStep}>
                    Anterior
                  </button>
                  <button type="submit" disabled={isSubmitting}>
                    Enviar
                  </button>
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Invoice;
