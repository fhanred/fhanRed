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
          typeId: 'none' /*tipo documento identificacion*/, //ok
          doc_user: 0,
          image_ced1: '',
          image_ced2: '',
          typePerson: 'none', //ok
          signature: null,
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
          municipality: 'none', // ok
          district: '',
          address: '', //ok
          reportCentralCredit: 'none', //Ok
          fact_email: 'none', //
          startDate: '', //ok
          cutoffDate: '', //ok
          LastPayment: '', //ok
          salesman: '', //ok
          trademarkONU: '',
          boxNAP: '',
          MacONU: '',
          idStateInvoice: 'none',
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
          if (values.typeId === 'none') {
            errors.typeId = 'Dato Requerido';
          }
          if (!values.doc_user) {
            errors.doc_user = 'Dato Requerido';
          }
          if (values.typePerson === 'none') {
            errors.typePerson = 'Dato Requerido';
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
            const datePattern = /^(\d{2}\/\d{2}\/\d{4})$/;
            if (!datePattern.test(values.Order_date)) {
              errors.Order_date =
                'Fecha no válida. El formato debe ser dd/MM/yyyy.';
            } else {
              const [day, month] = values.Order_date.split('/').map(Number);
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
          if (values.birthDate) {
            const datePattern = /^(\d{2}\/\d{2}\/\d{4})$/;
            if (!datePattern.test(values.birthDate)) {
              errors.birthDate =
                'Fecha no válida. El formato debe ser dd/MM/yyyy.';
            } else {
              const [day, month] = values.birthDate.split('/').map(Number);
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
          if (values.typePerson === 'Jurídica' && !values.CompanyName) {
            errors.CompanyName = 'Dato Requerido';
          }
          if (!values.phone1) {
            errors.phone1 = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.phone1)) {
            errors.phone1 = 'Por favor ingrese un número valido';
          }
          if (!values.phone2) {
            errors.phone2 = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.phone2)) {
            errors.phone2 = 'Por favor ingrese un número valido';
          }
          if (!values.phone3) {
            errors.phone3 = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.phone3)) {
            errors.phone3 = 'Por favor ingrese un número valido';
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
          if (values.idTypeHouse === 'none') {
            errors.idTypeHouse = 'Dato requerido';
          }
          if (!values.district) {
            errors.district = 'Dato requerido';
          }
          if (values.municipality === 'none') {
            errors.municipality = 'Dato requerido';
          }
          if (!values.address) {
            errors.address = 'Dato requerido';
          }
          if (values.reportCentralCredit === 'none') {
            errors.reportCentralCredit = 'Dato requerido';
          }
          if (values.fact_email === 'none') {
            errors.fact_email = 'Dato requerido';
          }

          if (values.startDate) {
            const datePattern = /^(\d{2}\/\d{2}\/\d{4})$/;
            if (!datePattern.test(values.startDate)) {
              errors.startDate =
                'Fecha no válida. El formato debe ser dd/MM/yyyy.';
            } else {
              const [day, month] = values.startDate.split('/').map(Number);
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
              const [day, month] = values.cutoffDate.split('/').map(Number);
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
              const [day, month] = values.LastPayment.split('/').map(Number);
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
          if (!values.MacONU) {
            errors.MacONU = 'Dato requerido';
          }
          if (!values.boxNAP) {
            errors.boxNAP = 'Dato requerido';
          }
          if (!values.trademarkONU) {
            errors.trademarkONU = 'Dato requerido';
          }
          if (!values.salesman) {
            errors.salesman = 'Dato requerido';
          }

          if (values.idStateInvoice === 'none') {
            errors.idStateInvoice = 'Dato requerido';
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
                      placeholder="dd/MM/yyyy"
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
                    <label htmlFor="typeId">Tipo de documento:</label>
                    <Field id="typeId" name="typeId" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={1}>CC</option>
                      <option value={2}>CE</option>
                      <option value={3}>NIT</option>
                      <option value={4}>PP</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="typeId"
                      component={() => (
                        <div className="error-message">{errors.typeId}</div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="doc_user">Número de documento:</label>
                    <Field
                      type="text" // Esto hace que el campo sea de tipo número
                      id="doc_user"
                      name="doc_user"
                      className="form-control"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="doc_user"
                      component={() => (
                        <div className="error-message">{errors.doc_user}</div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="typePerson">Tipo de persona:</label>
                    <Field id="typePerson" name="typePerson" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Jurídica'}>Jurídica</option>
                      <option value={'Natural'}>Natural</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="typePerson"
                      component={() => (
                        <div className="error-message">{errors.typePerson}</div>
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
                    <label htmlFor="birthDate">Fecha de nacimiento:</label>
                    <Field
                      type="text"
                      id="birthDate"
                      name="birthDate"
                      placeholder="dd/MM/yyyy"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="birthDate"
                      component={() => (
                        <div className="error-message">{errors.birthDate}</div>
                      )}
                    />
                  </p>
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
                    </div>
                  )}
                  <p>
                    <ErrorMessage
                      name="CompanyName"
                      component={() => (
                        <div className="error-message">
                          {errors.CompanyName}
                        </div>
                      )}
                    />
                  </p>

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
                  </div>
                  <p>
                    <ErrorMessage
                      name="phone1"
                      component={() => (
                        <div className="error-message">{errors.phone1}</div>
                      )}
                    />
                  </p>
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
                  </div>
                  <p>
                    <ErrorMessage
                      name="phone2"
                      component={() => (
                        <div className="error-message">{errors.phone2}</div>
                      )}
                    />
                  </p>
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
                  </div>
                  <p>
                    <ErrorMessage
                      name="phone3"
                      component={() => (
                        <div className="error-message">{errors.phone3}</div>
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
                        30MG PLAN RUBI SIN IVA
                      </option>
                      <option value={'50MG PLAN ZAFIRO SIN IVA'}>
                        50MG PLAN ZAFIRO SIN IVA
                      </option>
                      <option value={'100MG PLAN ESMERALDA CON IVA'}>
                        100MG PLAN ESMERALDA CON IVA
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
                      type="text"
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
                  </div>
                  <p>
                    <ErrorMessage
                      name="idTypeHouse"
                      component={() => (
                        <div className="error-message">
                          {errors.idTypeHouse}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="municipality">Municipio:</label>
                    <Field id="municipality" name="municipality" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Restrepo'}>Restrepo</option>
                      <option value={'Cumaral'}>Cumaral</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="municipality"
                      component={() => (
                        <div className="error-message">
                          {errors.municipality}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="district">Barrio:</label>
                    <Field
                      type="text"
                      id="district"
                      name="district"
                      placeholder=""
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="district"
                      component={() => (
                        <div className="error-message">{errors.district}</div>
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
                        <option value="Trocha">Trocha</option>
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
                    <label htmlFor="address">Dirección:</label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      placeholder=""
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleGenerateAddress();
                        setFieldValue('address', combinedAddress); // Actualiza el valor del campo "address"
                      }}
                    >
                      Generar Dirección
                    </button>
                  </div>
                  <p>
                    <ErrorMessage
                      name="address"
                      component={() => (
                        <div className="error-message">{errors.address}</div>
                      )}
                    />
                  </p>
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
                  </div>
                  <p>
                    <ErrorMessage
                      name="reportCentralCredit"
                      component={() => (
                        <div className="error-message">
                          {errors.reportCentralCredit}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="fact_email">
                      Envio factura correo electrónico:
                    </label>
                    <Field id="fact_email" name="fact_email" as="select">
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Si'}>Si</option>
                      <option value={'No'}>No</option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="fact_email"
                      component={() => (
                        <div className="error-message">{errors.fact_email}</div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="startDate">Fecha de inicio:</label>
                    <Field
                      type="text"
                      id="startDate"
                      name="startDate"
                      placeholder="dd/MM/yyyy"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="startDate"
                      component={() => (
                        <div className="error-message">{errors.startDate}</div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="cutoffDate">Fecha de corte:</label>
                    <Field
                      type="text"
                      id="cutoffDate"
                      name="cutoffDate"
                      placeholder="dd/MM/yyyy"
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
                    <label htmlFor="LastPayment">Fecha último pago:</label>
                    <Field
                      type="text"
                      id="LastPayment"
                      name="LastPayment"
                      placeholder="dd/MM/yyyy"
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="LastPayment"
                      component={() => (
                        <div className="error-message">
                          {errors.LastPayment}
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
                    <label htmlFor="trademarkONU">Marca de ONU:</label>
                    <Field
                      type="text"
                      id="trademarkONU"
                      name="trademarkONU"
                      placeholder=""
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="trademarkONU"
                      component={() => (
                        <div className="error-message">
                          {errors.trademarkONU}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="boxNAP">Caja NAP:</label>
                    <Field
                      type="text"
                      id="boxNAP"
                      name="boxNAP"
                      placeholder=""
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="boxNAP"
                      component={() => (
                        <div className="error-message">{errors.boxNAP}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="MacONU">Mac de ONU:</label>
                    <Field
                      type="text"
                      id="MacONU"
                      name="MacONU"
                      placeholder=""
                    />
                  </div>
                  <p>
                    <ErrorMessage
                      name="MacONU"
                      component={() => (
                        <div className="error-message">{errors.MacONU}</div>
                      )}
                    />
                  </p>
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
                  </div>
                  <p>
                    <ErrorMessage
                      name="idStateInvoice"
                      component={() => (
                        <div className="error-message">
                          {errors.idStateInvoice}
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
