import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CameraCapture from '../CameraCapture/CameraCapture';
import 'react-datepicker/dist/react-datepicker.css';
import SignatureCanvas from 'react-signature-canvas';
import Modal from 'react-modal';
import { createInvoice } from '../../Redux/Actions/actions';
import './Invoice1.css';
import CameraCapture2 from '../CameraCapture/CameraCapture2';

// Configuración de react-modal
Modal.setAppElement('#root'); // Especifica dónde se renderizará el modal

function Invoice() {
  const signatureCanvas = React.createRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTermsAccepted, setTermsAccepted] = useState(false);
  const [streetType, setStreetType] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [orientation, setOrientation] = useState('');
  const [details, setDetails] = useState('');
  const [combinedAddress, setCombinedAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [firmaGuardada, setFirmaGuardada] = useState(false);
  const [mostrarMensajeError, setMostrarMensajeError] = useState(false);

  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

  const handleGenerateAddress = () => {
    const address = `${streetType} ${streetNumber} ${orientation} ${addressNumber}, ${details}`;
    setCombinedAddress(address); // Actualiza el estado de la dirección combinada
  };

  // Función para borrar la firma
  const clearSignature = () => {
    signatureCanvas.current.clear();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    closeModal(); // Cierra el modal una vez que los términos han sido aceptados
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
          sexo: 'none',
          tipo_documento: 'none' /*tipo documento identificacion*/, //ok
          n_documento: '',
          image_ced1: '',
          image_ced2: '',
          tipo_persona: 'none', //ok
          signature: null,
          email: '', //ok
          Order_date: '', //0k
          fecha_cumple: '', // ok
          name_razonSocial: '', //ok
          tel1: '', //ok
          tel2: '', //ok
          tel3: '', //ok
          Product_name: 'none' /*plan*/, //ok
          n_contrato: '' /*numero contrato*/, //ok
          idStratus: 'none', //ok
          idZone: 'none', //ok
          tipo_vivienda: 'none', // ok
          municipio: 'none', // ok
          barrio_vereda: '',
          direccion: '', //ok
          reporte_c_riesgo: false, //Ok
          estado_cp_correo: true, //
          init_date: '', //ok
          cutoffDate: '', //ok
          ultimo_pago: '', //ok
          salesman: '', //ok
          mac: '',
          caja_nap: '',
          marca_onu: '',
          estado_contrato: 'none',
        }}
        validate={(values) => {
          let errors = {};
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
          if (values.sexo === 'none') {
            errors.sexo = 'Dato Requerido';
          }
          if (values.tipo_documento === 'none') {
            errors.tipo_documento = 'Dato Requerido';
          }
          if (!values.n_documento) {
            errors.n_documento = 'Dato Requerido';
          }
          if (values.tipo_persona === 'none') {
            errors.tipo_persona = 'Dato Requerido';
          }
          if (!values.email) {
            errors.email = 'Por favor ingrese un correo electronico';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = 'El correo no es valido';
          }

          if (values.Order_date) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.Order_date)) {
              errors.Order_date =
                'Fecha no válida. El formato debe ser YYYY-MM-DD.';
            } else {
              const [year, month, day] =
                values.Order_date.split('-').map(Number);
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
          if (
            values.tipo_persona === 'P.JURIDICA' &&
            !values.name_razonSocial
          ) {
            errors.name_razonSocial = 'Dato Requerido';
          }
          if (!values.tel1) {
            errors.tel1 = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.tel1)) {
            errors.tel1 = 'Por favor ingrese un número valido';
          }
          if (!values.tel2) {
            errors.tel2 = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.tel2)) {
            errors.tel2 = 'Por favor ingrese un número valido';
          }
          if (!values.tel3) {
            errors.tel3 = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.tel3)) {
            errors.tel3 = 'Por favor ingrese un número valido';
          }
          if (values.Product_name === 'none') {
            errors.Product_name = 'Dato requerido';
          }
          if (!values.n_contrato) {
            errors.n_contrato = 'Dato requerido';
          }
          if (values.idStratus === 'none') {
            errors.idStratus = 'Dato requerido';
          }
          if (values.idZone === 'none') {
            errors.idZone = 'Dato requerido';
          }
          if (values.tipo_vivienda === 'none') {
            errors.tipo_vivienda = 'Dato requerido';
          }
          if (!values.barrio_vereda) {
            errors.barrio_vereda = 'Dato requerido';
          }
          if (values.municipio === 'none') {
            errors.municipio = 'Dato requerido';
          }
          if (!values.direccion) {
            errors.direccion = 'Dato requerido';
          }
          if (values.reporte_c_riesgo === 'none') {
            errors.reporte_c_riesgo = 'Dato requerido';
          }
          if (values.fact_email === 'none') {
            errors.fact_email = 'Dato requerido';
          }

          if (values.init_date) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.init_date)) {
              errors.init_date =
                'Fecha no válida. El formato debe ser YYYY-MM-DD.';
            } else {
              const [year, month, day] = values.init_date
                .split('-')
                .map(Number);
              if (
                day <= 0 ||
                day > 31 || // Día válido entre 1 y 31
                month <= 0 ||
                month > 12 // Mes válido entre 1 y 12
              ) {
                errors.init_date = 'Fecha no válida. Verifique día y mes.';
              }
            }
          } else {
            errors.init_date =
              'Este campo es obligatorio. Por favor, ingrese una fecha.';
          }

          if (values.cutoffDate) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.cutoffDate)) {
              errors.cutoffDate =
                'Fecha no válida. El formato debe ser YYYY-MM-DD.';
            } else {
              const [year, month, day] = values.cutoffDate
                .split('-')
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

          if (values.ultimo_pago) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.ultimo_pago)) {
              errors.ultimo_pago =
                'Fecha no válida. El formato debe ser YYYY-MM-DD.';
            } else {
              const [year, month, day] = values.ultimo_pago
                .split('-')
                .map(Number);
              if (
                day <= 0 ||
                day > 31 || // Día válido entre 1 y 31
                month <= 0 ||
                month > 12 // Mes válido entre 1 y 12
              ) {
                errors.ultimo_pago = 'Fecha no válida. Verifique día y mes.';
              }
            }
          } else {
            errors.ultimo_pago =
              'Este campo es obligatorio. Por favor, ingrese una fecha.';
          }
          if (!values.mac) {
            errors.mac = 'Dato requerido';
          }
          if (!values.caja_nap) {
            errors.caja_nap = 'Dato requerido';
          }
          if (!values.marca_onu) {
            errors.marca_onu = 'Dato requerido';
          }
          if (!values.salesman) {
            errors.salesman = 'Dato requerido';
          }

          if (values.estado_contrato === 'none') {
            errors.estado_contrato = 'Dato requerido';
          }
          return errors;
        }}
        // onSubmit={(values, { setSubmitting, resetForm }) => {
        //   if (step === 3) {
        //     dispatch(createInvoice(values))
        //       .then((response) => {
        //         if (response.success) {
        //           setSubmissionResult('success');
        //           setSubmitting(false);
        //           resetForm();
        //           history.push('/admin/datosClientes');
        //         } else {
        //           setSubmissionResult('error');
        //           console.error(response.message);
        //           setSubmitting(false);
        //         }
        //       })
        //       .catch((error) => {
        //         setSubmissionResult('error');
        //         console.error(error);
        //         setSubmitting(false);
        //       });
        //   } else {
        //     nextStep();
        //   }
        // }}

        /*SE UTILIZA CUANDO NO ESTOY CONECTADO A SERVIDOR Y QUIERO VER COMO ENVIA INFORMACION*/
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            const success = Math.random() < 0.5;
            setSubmissionResult(success ? 'success' : 'error');

            if (step === 4 && isTermsAccepted) {
              // Envía la acción createInvoice con los valores del formulario como carga útil.
              dispatch(createInvoice(values));

              // Reinicia el formulario.
              setSubmitting(false);
              resetForm();

              // Navega a la página admin/datosClientes.
              history.push('/admin/datosClientes');

              // Imprime el objeto FormData en la consola.
              console.log(values);
            } else {
              nextStep();
              alert(
                'Debes aceptar los términos y condiciones antes de enviar el formulario.'
              );
            }
          }, 3000); // 3000 ms = 3 segundos
        }}
      >
        {({ isSubmitting, values, errors, setFieldValue }) => (
          <div>
            <Form>
              {step === 1 && (
                <div className="formSection">
                  <h2>Datos personales suscriptor</h2>
                  <div className="form-group">
                    <label htmlFor="Order_date">Fecha:</label>
                    <Field
                      type="text"
                      id="Order_date"
                      name="Order_date"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="Order_date"
                      component={() => (
                        <div className="error-message">{errors.Order_date}</div>
                      )}
                    />
                  </p>

                  <div className="form-group">
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
                  <div className="form-group">
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

                  <div className="form-group">
                    <label htmlFor="sexo">Sexo:</label>
                    <Field id="sexo" name="sexo" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Masculino'}>Masculino</option>
                      <option value={'Femenino'}>Femenino</option>
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

                  <div className="form-group">
                    <label htmlFor="tipo_documento">Tipo de documento:</label>
                    <Field
                      id="tipo_documento"
                      name="tipo_documento"
                      as="select"
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'CC'}>CC</option>
                      <option value={'CE'}>CE</option>
                      <option value={'NIT'}>NIT</option>
                      <option value={'PP'}>PP</option>
                    </Field>
                  </div>
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

                  <div className="form-group">
                    <label htmlFor="n_documento">Número de documento:</label>
                    <Field
                      type="text" // Esto hace que el campo sea de tipo número
                      id="n_documento"
                      name="n_documento"
                      className="form-control"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="n_documento"
                      component={() => (
                        <div className="error-message">
                          {errors.n_documento}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="tipo_persona">Tipo de persona:</label>
                    <Field id="tipo_persona" name="tipo_persona" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'P.JURIDICA'}>Jurídica</option>
                      <option value={'P.NATURAL'}>Natural</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="tipo_persona"
                      component={() => (
                        <div className="error-message">
                          {errors.tipo_persona}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <Field type="text" id="email" name="email" placeholder="" />
                  </div>
                  <p>
                    <ErrorMessage
                      name="email"
                      component={() => (
                        <div className="error-message">{errors.email}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="fecha_cumple">Fecha de nacimiento:</label>
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
                  {values.tipo_persona === 'P.JURIDICA' && (
                    <div className="form-group">
                      <label htmlFor="name_razonSocial">Razón social:</label>
                      <Field
                        type="text"
                        id="name_razonSocial"
                        name="name_razonSocial"
                        placeholder=""
                        disabled={values.typePerson === 'P.NATURAL'}
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

                  <div className="form-group">
                    <label htmlFor="tel1" className="phone-label">
                      Teléfono de Contacto 1:
                    </label>
                    <Field
                      type="text"
                      id="tel1"
                      name="tel1"
                      placeholder=""
                      className="phone-input"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="tel1"
                      component={() => (
                        <div className="error-message">{errors.tel1}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="tel2" className="phone-label">
                      Teléfono de contacto 2:
                    </label>
                    <Field
                      type="text"
                      id="tel2"
                      name="tel2"
                      placeholder=""
                      className="phone-input"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="tel2"
                      component={() => (
                        <div className="error-message">{errors.tel2}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="tel3" className="phone-label">
                      Teléfono de contacto 3:
                    </label>
                    <Field
                      type="text"
                      id="tel3"
                      name="tel3"
                      placeholder=""
                      className="phone-input"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="tel3"
                      component={() => (
                        <div className="error-message">{errors.tel3}</div>
                      )}
                    />
                  </p>
                  <button type="button" onClick={nextStep}>
                    Siguiente
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="formSection">
                  <h2>Datos del plan </h2>
                  <div className="form-group">
                    <label htmlFor="Product_name">Plan:</label>
                    <Field id="Product_name" name="Product_name" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'PLAN BRONCE 5MG'}>PLAN BRONCE 5MG</option>
                      <option value={'PLAN PLATA 7MG'}>PLAN PLATA 7MG</option>
                      <option value={'PLAN ORO 10MG'}>PLAN ORO 10MG</option>
                      <option value={'PLAN PLATINO 20MG'}>
                        PLAN PLATINO 20MG
                      </option>
                      <option value={'PLAN RUBI 30MG'}>PLAN RUBI 30MG</option>
                      <option value={'PLAN ZAFIRO 50MG '}>
                        PLAN ZAFIRO 50MG
                      </option>
                      <option value={'PLAN ESMERALDA 100MG'}>
                        PLAN ESMERALDA 100MG
                      </option>
                      <option value={'PLAN DIAMANTE 200MG'}>
                        PLAN DIAMANTE 200MG
                      </option>
                      <option value={'PLAN CORONA 300MG'}>
                        PLAN CORONA 300MG
                      </option>
                      <option value={'PLAN DEDICADO 20MG'}>
                        PLAN DEDICADO 20MG
                      </option>
                      <option value={'PLAN DEDICADO 50MG'}>
                        PLAN DEDICADO 50MG
                      </option>
                      <option value={'PLAN DEDICADO 100MG'}>
                        PLAN DEDICADO 100MG
                      </option>
                      <option value={'PLAN DEDICADO 200MG'}>
                        PLAN DEDICADO 200MG
                      </option>
                      <option value={'PLAN DEDICADO 300MG'}>
                        PLAN DEDICADO 300MG
                      </option>
                      <option value={'PLAN DEDICADO 500MG'}>
                        PLAN DEDICADO 500MG
                      </option>
                      <option value={'PLAN DEDICADO 1000MG'}>
                        PLAN DEDICADO 1000MG
                      </option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="Product_name"
                      component={() => (
                        <div className="error-message">
                          {errors.Product_name}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="n_contrato">Codigo:</label>
                    <Field
                      type="number"
                      id="n_contrato"
                      name="n_contrato"
                      placeholder=""
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="n_contrato"
                      component={() => (
                        <div className="error-message">{errors.n_contrato}</div>
                      )}
                    />
                  </p>
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
                  </div>
                  <p>
                    <ErrorMessage
                      name="idStratus"
                      component={() => (
                        <div className="error-message">{errors.idStratus}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="idZone">Zona:</label>
                    <Field id="idZone" name="idZone" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Urbana'}>Urbana</option>
                      <option value={'Rural'}>Rural</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="idZone"
                      component={() => (
                        <div className="error-message">{errors.idZone}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="tipo_vivienda">Tipo de vivienda:</label>
                    <Field id="tipo_vivienda" name="tipo_vivienda" as="select">
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
                  </div>
                  <p>
                    <ErrorMessage
                      name="tipo_vivienda"
                      component={() => (
                        <div className="error-message">
                          {errors.tipo_vivienda}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="municipio">Municipio:</label>
                    <Field id="municipio" name="municipio" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Restrepo'}>Restrepo</option>
                      <option value={'Cumaral'}>Cumaral</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="municipio"
                      component={() => (
                        <div className="error-message">{errors.municipio}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="barrio_vereda">Barrio:</label>
                    <Field
                      type="text"
                      id="barrio_vereda"
                      name="barrio_vereda"
                      placeholder=""
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="barrio_vereda"
                      component={() => (
                        <div className="error-message">
                          {errors.barrio_vereda}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group-address-container">
                    <div className="form-group-address">
                      <label htmlFor="streetType">Tipo de vía:</label>
                      <select
                        id="streetType"
                        onChange={(e) => setStreetType(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="Carrera">Carrera</option>
                        <option value="Calle">Calle</option>
                        <option value="Avenida">Avenida</option>
                        <option value="transversal">Transversal</option>
                        <option value="Diagonal">Diagonal</option>
                        <option value="Vereda">Vereda</option>
                      </select>
                    </div>
                    <div className="form-group-address">
                      <label htmlFor="streetNumber">Número:</label>
                      <input
                        type="text"
                        id="streetNumber"
                        value={streetNumber}
                        onChange={(e) => setStreetNumber(e.target.value)}
                      />
                    </div>
                    <div className="form-group-address">
                      <label htmlFor="orientation">Orientación:</label>
                      <select
                        id="orientation"
                        onChange={(e) => setOrientation(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="Norte">Norte</option>
                        <option value="Sur">Sur</option>
                        <option value="Este">Este</option>
                        <option value="Oeste">Oeste</option>
                        {/* Agrega más opciones si es necesario */}
                      </select>
                    </div>
                  </div>
                  <div className="form-group-address-container">
                    <div className="form-group-address">
                      <label htmlFor="addressNumber">#:</label>
                      <input
                        type="text"
                        id="addressNumber"
                        value={addressNumber}
                        onChange={(e) => setAddressNumber(e.target.value)}
                      />
                    </div>
                    <div className="form-group-address">
                      <label htmlFor="details">
                        Detalles (casa, finca, etc.):
                      </label>
                      <input
                        type="text"
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <Field
                      type="text"
                      id="direccion"
                      name="direccion"
                      placeholder=""
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleGenerateAddress();
                        setFieldValue('direccion', combinedAddress); // Actualiza el valor del campo "address"
                      }}
                    >
                      Generar Dirección
                    </button>
                  </div>
                  <p>
                    <ErrorMessage
                      name="direccion"
                      component={() => (
                        <div className="error-message">{errors.direccion}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="reporte_c_riesgo">
                      Reporte central de riesgo:
                    </label>
                    <Field
                      id="reporte_c_riesgo"
                      name="reporte_c_riesgo"
                      as="select"
                      onChange={(e) => {
                        const value = e.target.value === 'true';
                        setFieldValue('reporte_c_riesgo', value);
                      }}
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'true'}>Si</option>
                      <option value={'false'}>No</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="reporte_c_riesgo"
                      component={() => (
                        <div className="error-message">
                          {errors.reporte_c_riesgo}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="estado_cp_correo">
                      Envio factura correo electrónico:
                    </label>
                    <Field
                      id="estado_cp_correo"
                      name="estado_cp_correo"
                      as="select"
                      onChange={(e) => {
                        const value = e.target.value === 'true';
                        setFieldValue('estado_cp_correo', value);
                      }}
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'true'}>Si</option>
                      <option value={'false'}>No</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="estado_cp_correo"
                      component={() => (
                        <div className="error-message">
                          {errors.estado_cp_correo}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="init_date">Fecha de inicio:</label>
                    <Field
                      type="text"
                      id="init_date"
                      name="init_date"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="init_date"
                      component={() => (
                        <div className="error-message">{errors.init_date}</div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="cutoffDate">Fecha de corte:</label>
                    <Field
                      type="text"
                      id="cutoffDate"
                      name="cutoffDate"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="cutoffDate"
                      component={() => (
                        <div className="error-message">{errors.cutoffDate}</div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="ultimo_pago">Fecha último pago:</label>
                    <Field
                      type="text"
                      id="ultimo_pago"
                      name="ultimo_pago"
                      placeholder="YYYY-MM-DD"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="ultimo_pago"
                      component={() => (
                        <div className="error-message">
                          {errors.ultimo_pago}
                        </div>
                      )}
                    />
                  </p>
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
                    <label htmlFor="marca_onu">Marca de ONU:</label>
                    <Field
                      type="text"
                      id="marca_onu"
                      name="marca_onu"
                      placeholder=""
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="marca_onu"
                      component={() => (
                        <div className="error-message">{errors.marca_onu}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="caja_nap">Caja NAP:</label>
                    <Field
                      type="text"
                      id="caja_nap"
                      name="caja_nap"
                      placeholder=""
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="caja_nap:"
                      component={() => (
                        <div className="error-message">{errors.caja_nap}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="mac">Mac ONU:</label>
                    <Field type="text" id="mac" name="mac" placeholder="" />
                  </div>
                  <p>
                    <ErrorMessage
                      name="mac"
                      component={() => (
                        <div className="error-message">{errors.mac}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="estado_contrato">Estado contrato:</label>
                    <Field
                      id="estado_contrato"
                      name="estado_contrato"
                      as="select"
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'ACTIVO'}>Activo</option>
                      <option value={'CORTADO'}>Cortado</option>
                      <option value={'RETIRADO'}>Retirado</option>
                      <option value={'ANULADO'}>Anulado</option>
                      <option value={'POR INSTALAR'}>Por instalar</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="estado_contrato"
                      component={() => (
                        <div className="error-message">
                          {errors.estado_contrato}
                        </div>
                      )}
                    />
                  </p>
                  <button type="button" onClick={previousStep}>
                    Anterior
                  </button>
                  <button type="button" onClick={nextStep}>
                    Siguiente
                  </button>
                </div>
              )}
              {step === 4 && (
                <div className="formSection">
                  <h2>Documentacion</h2>
                  <div className="form-group">
                    <label htmlFor="salesman">Vendedor:</label>
                    <Field
                      type="text"
                      id="salesman"
                      name="salesman"
                      placeholder=""
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="salesman"
                      component={() => (
                        <div className="error-message">{errors.salesman}</div>
                      )}
                    />
                  </p>
                  <p> Captura imagen documento cara 1</p>
                  <div className="form-group">
                    <CameraCapture setFieldValue={setFieldValue} />
                  </div>
                  <p>Captura imagen documento cara 2</p>
                  <div className="form-group">
                    <CameraCapture2 setFieldValue={setFieldValue} />
                  </div>

                  <div className="form-group-firma">
                    <label>Firma:</label>
                    <SignatureCanvas
                      ref={signatureCanvas}
                      penColor="black"
                      canvasProps={{
                        width: 400,
                        height: 200,
                        className: 'signature-canvas',
                      }}
                    />
                    <div class="button-container-firma">
                      <button
                        type="button"
                        disabled={firmaGuardada}
                        onClick={async () => {
                          const signatureImage =
                            signatureCanvas.current.toDataURL();
                          const data = new FormData();
                          data.append('file', signatureImage);
                          data.append('upload_preset', 'FHANRED');
                          setLoading(true);

                          try {
                            // Obtenemos la URL de la imagen de la respuesta de Cloudinary
                            const response = await fetch(
                              'https://api.cloudinary.com/v1_1/dwejoiefk/image/upload',
                              {
                                method: 'POST',
                                body: data,
                              }
                            );
                            const file = await response.json();

                            // Obtenemos la URL de la imagen
                            const imageURL = file.secure_url;
                            // Actualiza el valor del campo "signature" en Formik con la URL
                            setFieldValue('signature', imageURL);
                            setFirmaGuardada(true);
                          } catch (error) {
                            // Manejar el error, por ejemplo, mostrar un mensaje de error
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Guardar Firma
                      </button>

                      <button
                        type="button"
                        onClick={clearSignature}
                        disabled={firmaGuardada}
                      >
                        Borrar Firma
                      </button>
                      {loading ? (
                        <h1>Cargando firma documento...</h1>
                      ) : (
                        <h1>{''}</h1>
                      )}
                      {firmaGuardada && <p>Firma guardada con exito.</p>}
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="signature"
                      component={() => (
                        <div className="error-message">{errors.signature}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <button type="button" onClick={openModal}>
                      Ver Términos y Condiciones
                    </button>
                  </div>
                  <button type="button" onClick={previousStep}>
                    Anterior
                  </button>
                  <button type="submit" disabled={isSubmitting}>
                    Enviar Contrato
                  </button>
                </div>
              )}
            </Form>
          </div>
        )}
      </Formik>
      {/* Modal de Términos y Condiciones */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Términos y Condiciones"
      >
        <h2>Términos y Condiciones</h2>
        <div style={{ maxHeight: '300px', overflow: 'auto' }}>
          {/* Aquí coloca tu contenido de términos y condiciones */}
          {/* Puedes agregar un texto largo o componentes React según tus necesidades */}
          <p>Tus términos y condiciones van aquí...</p>
        </div>
        <button type="button" onClick={handleAcceptTerms}>
          Aceptar
        </button>
      </Modal>
    </div>
  );
}

export default Invoice;
