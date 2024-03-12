import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FaArrowLeft,
  FaArrowRight,
  FaEnvelope,
  FaPaperPlane,
  FaPhone,
  FaSave,
} from 'react-icons/fa';
import { RiCalendar2Line } from 'react-icons/ri';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { createInvoice } from '../../Redux/Actions/actions';
import CameraCapture from '../CameraCapture/CameraCapture';
import CameraCapture2 from '../CameraCapture/CameraCapture2';
import './Invoice1.css';

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
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);

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

  const handleGenerateAddress = () => {
    const address = `${streetType} ${streetNumber} ${orientation} # ${addressNumber}, ${details}`;
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
      <Formik
        initialValues={{
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
          razonSocial: '', //ok
          apellidos: '', // ok
          nombres: '', //ok
          tel1: '', //ok
          tel2: '', //ok
          tel3: '', //ok
          name_plan: 'none' /*plan*/, //ok
          idStratus: 'none', //ok
          idZone: 'none', //ok
          id_vivienda: 'none', // ok
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
          if (values.tipo_persona === 'P.NATURAL' && !values.apellidos) {
            errors.apellidos =
              'Este campo es obligatorio. Por favor ingrese un apellido';
          } else {
            const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            if (!nameRegex.test(values.apellidos)) {
              errors.apellidos =
                'El apellido solo puede contener letras y espacios';
            }
          }
          if (values.tipo_persona === 'P.NATURAL' && !values.nombres) {
            errors.nombres =
              'Este campo es obligatorio. Por favor ingrese un nombre';
          } else {
            const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            if (!nameRegex.test(values.nombres)) {
              errors.nombres =
                'El nombre solo puede contener letras y espacios';
            }
          }

          if (values.sexo === 'none') {
            errors.sexo =
              'Este campo es obligatorio. Por favor seleccione una opción';
          }
          if (values.tipo_documento === 'none') {
            errors.tipo_documento =
              'Este campo es obligatorio. Por favor seleccione una opción';
          }
          if (!values.n_documento) {
            errors.n_documento =
              'Este campo es obligatorio. Por favor ingrese su número de documento';
          }
          if (values.tipo_persona === 'none') {
            errors.tipo_persona =
              'Este campo es obligatorio. Por favor seleccione una opción';
          }
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
          if (values.tipo_persona === 'P.JURIDICA' && !values.razonSocial) {
            errors.razonSocial =
              'Este campo es obligatorio. Por favor, ingrese nombre razon social.';
          }
          if (!values.tel1) {
            errors.tel1 =
              'Este campo es obligatorio. Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.tel1)) {
            errors.tel1 = 'Por favor ingrese un número valido';
          }
          if (!values.tel2) {
            errors.tel2 =
              'Este campo es obligatorio. Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.tel2)) {
            errors.tel2 = 'Por favor ingrese un número valido';
          }
          if (!values.tel3) {
            errors.tel3 =
              'Este campo es obligatorio. Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.tel3)) {
            errors.tel3 = 'Por favor ingrese un número valido';
          }
          if (values.name_plan === 'none') {
            errors.name_plan =
              'Este campo es obligatorio. Por favor selecione una opción';
          }

          if (values.idStratus === 'none') {
            errors.idStratus =
              'Este campo es obligatorio. Por favor selecione una opción';
          }
          if (values.idZone === 'none') {
            errors.idZone =
              'Este campo es obligatorio. Por favor selecione una opción';
          }
          if (values.id_vivienda === 'none') {
            errors.id_vivienda =
              'Este campo es obligatorio. Por favor selecione una opción';
          }
          if (!values.barrio_vereda) {
            errors.barrio_vereda =
              'Este campo es obligatorio. Por favor ingrese el barrio';
          }
          if (values.municipio === 'none') {
            errors.municipio =
              'Este campo es obligatorio. Por favor selecione una opción';
          }
          if (!values.direccion) {
            errors.direccion = 'Dato requerido';
          }
          if (values.reporte_c_riesgo === 'none') {
            errors.reporte_c_riesgo =
              'Este campo es obligatorio. Por favor selecione una opción';
          }
          if (values.fact_email === 'none') {
            errors.fact_email =
              'Este campo es obligatorio. Por favor selecione una opción';
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
            errors.estado_contrato =
              'Este campo es obligatorio. Por favor selecione una opción';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await dispatch(createInvoice(values));
            console.log(values);
            if (response.success) {
              setSubmissionResult('success');
              resetForm();
              setTimeout(() => {
                setSubmissionResult(null); // Reinicia el estado después de un cierto tiempo
                history.push('/clientes');
              }, 3000); // Tiempo en milisegundos
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
        {({ isSubmitting, values, errors, setFieldValue }) => (
          <div className="formDiv">
            <Form>
              {step === 1 && (
                <div className="divInvoice">
                  <h2 className="tittle">Datos personales suscriptor</h2>
                  <div className="form-group">
                    <div>
                      <label htmlFor="Order_date" className="label-invoice">
                        Fecha
                      </label>
                    </div>
                    <div className="div1">
                      <Field
                        type="text"
                        id="Order_date"
                        name="Order_date"
                        placeholder="YYYY-MM-DD"
                        className="labelInputContra"
                      />
                    </div>
                    <div>
                      <RiCalendar2Line className="calendar" />
                    </div>
                  </div>
                  <p className="parrafo">
                    <ErrorMessage
                      name="Order_date"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.Order_date}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="tipo_persona" className="label-invoice">
                        Tipo de persona
                      </label>
                    </div>
                    <div className="div2">
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
                  <p className="parrafo">
                    <ErrorMessage
                      name="tipo_persona"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.tipo_persona}
                        </div>
                      )}
                    />
                  </p>

                  {values.tipo_persona === 'P.NATURAL' && (
                    <div className="form-group">
                      <div>
                        <label htmlFor="apellidos" className="label-invoice">
                          Apellidos:
                        </label>
                      </div>
                      <div className="div21">
                        <Field
                          type="text"
                          id="apellidos"
                          name="apellidos"
                          placeholder=""
                          className="labelInputContra"
                          disabled={values.tipo_persona === 'P.JURIDICA'}
                        />
                      </div>
                    </div>
                  )}
                  <p className="parrafo">
                    <ErrorMessage
                      name="apellidos"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.apellidos}
                        </div>
                      )}
                    />
                  </p>

                  {values.tipo_persona === 'P.NATURAL' && (
                    <div className="form-group">
                      <div>
                        <label htmlFor="nombres" className="label-invoice">
                          Nombres:
                        </label>
                      </div>
                      <div className="div20">
                        <Field
                          type="text"
                          id="nombres"
                          name="nombres"
                          placeholder=""
                          className="labelInputContra"
                          disabled={values.tipo_persona === 'P.JURIDICA'}
                        />
                      </div>
                    </div>
                  )}
                  <p className="parrafo">
                    <ErrorMessage
                      name="nombres"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.nombres}
                        </div>
                      )}
                    />
                  </p>

                  {values.tipo_persona === 'P.JURIDICA' && (
                    <div className="form-group">
                      <div>
                        <label htmlFor="razonSocial" className="label-invoice">
                          Razón social
                        </label>
                      </div>
                      <div className="div4">
                        <Field
                          type="text"
                          id="razonSocial"
                          name="razonSocial"
                          placeholder=""
                          className="labelInputContra"
                          disabled={values.tipo_persona === 'P.NATURAL'}
                        />
                      </div>
                    </div>
                  )}
                  <p className="parrafo">
                    <ErrorMessage
                      name="razonSocial"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.razonSocial}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="sexo" className="label-invoice">
                        Sexo
                      </label>
                    </div>
                    <div className="div5">
                      <Field
                        id="sexo"
                        name="sexo"
                        as="select"
                        className="select"
                      >
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
                  <p className="parrafo">
                    <ErrorMessage
                      name="sexo"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.sexo}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="tipo_documento" className="label-invoice">
                        Tipo de documento
                      </label>
                    </div>
                    <div className="div6">
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
                        <div className="error-message-invoice">
                          {errors.tipo_documento}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="n_documento" className="label-invoice">
                        Número de documento
                      </label>
                    </div>
                    <div className="div7">
                      <Field
                        type="text" // Esto hace que el campo sea de tipo número
                        id="n_documento"
                        name="n_documento"
                        className="labelInputContra"
                      />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="n_documento"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.n_documento}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="email" className="label-invoice">
                        Correo electrónico
                      </label>
                    </div>
                    <div className="div8">
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        placeholder=""
                        className="labelInputContra "
                      />
                    </div>
                    <div>
                      <FaEnvelope className="email" />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="email"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.email}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label htmlFor="fecha_cumple" className="label-invoice">
                        Fecha de nacimiento
                      </label>
                    </div>
                    <div className="div9">
                      <Field
                        type="text"
                        id="fecha_cumple"
                        name="fecha_cumple"
                        placeholder="YYYY-MM-DD"
                        className="labelInputContra"
                      />
                    </div>
                    <div>
                      <RiCalendar2Line className="calendar" />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="fecha_cumple"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.fecha_cumple}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="tel1" className="label-invoice">
                        Teléfono de Contacto 1
                      </label>
                    </div>
                    <div className="div7">
                      <Field
                        type="text"
                        id="tel1"
                        name="tel1"
                        placeholder=""
                        className="labelInputContra"
                      />
                    </div>
                    <div>
                      <FaPhone className="phone" />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="tel1"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.tel1}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label htmlFor="tel2" className="label-invoice">
                        Teléfono de Contacto 2
                      </label>
                    </div>
                    <div className="div7">
                      <Field
                        type="text"
                        id="tel2"
                        name="tel2"
                        placeholder=""
                        className="labelInputContra"
                      />
                    </div>
                    <div>
                      <FaPhone className="phone" />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="tel2"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.tel2}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label htmlFor="tel3" className="label-invoice">
                        Teléfono de Contacto 3
                      </label>
                    </div>
                    <div className="div7">
                      <Field
                        type="text"
                        id="tel3"
                        name="tel3"
                        placeholder=""
                        className="labelInputContra"
                      />
                    </div>
                    <div>
                      <FaPhone className="phone" />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="tel3"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.tel3}
                        </div>
                      )}
                    />
                  </p>
                  <button type="button" onClick={nextStep}>
                    Siguiente <FaArrowRight className="arrow" />
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="divInvoice">
                  <h2 className="tittle">Datos del plan </h2>
                  <div className="form-group">
                    <div>
                      <label htmlFor="name_plan" className="label-invoice">
                        Plan:
                      </label>
                    </div>
                    <div className="div1">
                      <Field
                        id="name_plan"
                        name="name_plan"
                        as="select"
                        type="number"
                        className="select"
                      >
                        <option value={'none'} className="option">
                          Selecciona una opción
                        </option>
                        <option value={'5 MG - BRONCE'} className="option">
                          PLAN BRONCE 5MG
                        </option>
                        <option value={'7 MG - PLATA'} className="option">
                          PLAN PLATA 7MG
                        </option>
                        <option value={'10 MG - ORO'} className="option">
                          PLAN ORO 10MG
                        </option>
                        <option value={'20 MG - PLATINO'} className="option">
                          PLAN PLATINO 20MG
                        </option>
                        <option value={'30 MG - RUBI'} className="option">
                          PLAN RUBI 30MG
                        </option>
                        <option value={'50 MG - ZAFIRO'} className="option">
                          PLAN ZAFIRO 50MG
                        </option>
                        <option value={'100 MG - ESMERALDA'} className="option">
                          PLAN ESMERALDA 100MG
                        </option>
                        <option value={'200 MG - DIAMANTE'} className="option">
                          PLAN DIAMANTE 200MG
                        </option>
                        <option value={'300 MG - CORONA'} className="option">
                          PLAN CORONA 300MG
                        </option>
                        <option value={'20 MG - DEDICADO'} className="option">
                          PLAN DEDICADO 20MG
                        </option>
                        <option value={'30 MG - DEDICADO'} className="option">
                          PLAN DEDICADO 30MG
                        </option>
                        <option value={'50 MG - DEDICADO'} className="option">
                          PLAN DEDICADO 50MG
                        </option>
                        <option value={'100 MG - DEDICADO'} className="option">
                          PLAN DEDICADO 100MG
                        </option>
                        <option value={'200 MG - DEDICADO"'} className="option">
                          PLAN DEDICADO 200MG
                        </option>
                        <option value={'300 MG - DEDICADO"'} className="option">
                          PLAN DEDICADO 300MG
                        </option>
                        <option value={'500 MG - DEDICADO'} className="option">
                          PLAN DEDICADO 500MG
                        </option>
                        <option value={'600 MG - DEDICADO'} className="option">
                          PLAN DEDICADO 600MG
                        </option>
                        <option value={'1000 MG - DEDICADO'} className="option">
                          PLAN DEDICADO 1000MG
                        </option>
                        <option value={'CORTESIA'} className="option">
                          CORTESIA
                        </option>
                      </Field>
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="name_plan"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.name_plan}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="idStratus" className="label-invoice">
                        Estrato:
                      </label>
                    </div>
                    <div className="div10">
                      <Field
                        id="idStratus"
                        name="idStratus"
                        as="select"
                        className="select"
                      >
                        <option value={'none'} className="option">
                          Selecciona una opción
                        </option>
                        <option value={'1'} className="option">
                          1
                        </option>
                        <option value={'2'} className="option">
                          2
                        </option>
                        <option value={'3'} className="option">
                          3
                        </option>
                        <option value={'4'} className="option">
                          4
                        </option>
                        <option value={'5'} className="option">
                          5
                        </option>
                        <option value={'6'} className="option">
                          6
                        </option>
                      </Field>
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="idStratus"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.idStratus}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label htmlFor="idZone" className="label-invoice">
                        Zona:
                      </label>
                    </div>
                    <div className="div12">
                      <Field
                        id="idZone"
                        name="idZone"
                        as="select"
                        className="select"
                      >
                        <option value={'none'} className="option">
                          Selecciona una opción
                        </option>
                        <option value={'Urbana'} className="option">
                          Urbana
                        </option>
                        <option value={'Rural'} className="option">
                          Rural
                        </option>
                      </Field>
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="idZone"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.idZone}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label htmlFor="id_vivienda" className="label-invoice">
                        Tipo de vivienda:
                      </label>
                    </div>
                    <div className="div11">
                      <Field
                        id="id_vivienda"
                        name="id_vivienda"
                        as="select"
                        type="number"
                        className="select"
                      >
                        <option value={'none'} className="option">
                          Selecciona una opción
                        </option>
                        <option value={'1'} className="option">
                          Alquilada
                        </option>
                        <option value={'2'} className="option">
                          Propia
                        </option>
                        <option value={'3'} className="option">
                          Familiar
                        </option>
                        <option value={'4'} className="option">
                          Tienda
                        </option>
                        <option value={'5'} className="option">
                          Instituciones
                        </option>
                        <option value={'6'} className="option">
                          Edificio
                        </option>
                        <option value={'7'} className="option">
                          Hostal/Hotel
                        </option>
                        <option value={'8'} className="option">
                          Finca
                        </option>
                        <option value={'9'} className="option">
                          Cabaña
                        </option>
                      </Field>
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="id_vivienda"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.id_vivienda}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label htmlFor="municipio" className="label-invoice">
                        Municipio:
                      </label>
                    </div>
                    <div className="div13">
                      <Field
                        id="municipio"
                        name="municipio"
                        as="select"
                        className="select"
                      >
                        <option value={'none'} className="option">
                          Selecciona una opción
                        </option>
                        <option value={'Restrepo'} className="option">
                          Restrepo
                        </option>
                        <option value={'Cumaral'} className="option">
                          Cumaral
                        </option>
                      </Field>
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="municipio"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.municipio}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label htmlFor="barrio_vereda" className="label-invoice">
                        Barrio:
                      </label>
                    </div>
                    <div className="div14">
                      <Field
                        type="text"
                        id="barrio_vereda"
                        name="barrio_vereda"
                        className="labelInputContra"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="barrio_vereda"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.barrio_vereda}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="streetType" className="label-invoice">
                        Dirección:
                      </label>
                    </div>
                    <div>
                      <select
                        id="streetType"
                        onChange={(e) => setStreetType(e.target.value)}
                        className="selectVia"
                      >
                        <option value="" className="option"></option>
                        <option value="Carrera" className="option">
                          Carrera
                        </option>
                        <option value="Calle" className="option">
                          Calle
                        </option>
                        <option value="Avenida" className="option">
                          Avenida
                        </option>
                        <option value="transversal" className="option">
                          Transversal
                        </option>
                        <option value="Diagonal" className="option">
                          Diagonal
                        </option>
                        <option value="Vereda" className="option">
                          Vereda
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="streetNumber"
                        className="label-invoice-via"
                      >
                        #:
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="streetNumber"
                        value={streetNumber}
                        className="labelInputContraVia"
                        onChange={(e) => setStreetNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <select
                        id="orientation"
                        onChange={(e) => setOrientation(e.target.value)}
                        className="selectVia"
                      >
                        <option value="" className="option"></option>
                        <option value="Norte" className="option">
                          Norte
                        </option>
                        <option value="Sur" className="option">
                          Sur
                        </option>
                        <option value="Este" className="option">
                          Este
                        </option>
                        <option value="Oeste" className="option">
                          Oeste
                        </option>
                        {/* Agrega más opciones si es necesario */}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="streetNumber"
                        className="label-invoice-via"
                      >
                        #:
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="streetNumber"
                        value={addressNumber}
                        className="labelInputContraVia2"
                        onChange={(e) => setAddressNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="label-invoice">
                      <button
                        className="combinedAddress"
                        type="button"
                        onClick={() => {
                          handleGenerateAddress();
                          setFieldValue('direccion', combinedAddress); // Actualiza el valor del campo "address"
                        }}
                      >
                        Generar Dirección
                      </button>
                    </div>
                    <div>
                      <Field
                        type="text"
                        id="direccion"
                        name="direccion"
                        placeholder=""
                        className="labelInputContra"
                        disabled
                      />
                    </div>
                  </div>

                  <p>
                    <ErrorMessage
                      name="direccion"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.direccion}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label
                        htmlFor="reporte_c_riesgo"
                        className="label-invoice"
                      >
                        Reporte central de riesgo:
                      </label>
                    </div>
                    <div className="div15">
                      <Field
                        id="reporte_c_riesgo"
                        name="reporte_c_riesgo"
                        as="select"
                        className="select"
                        onChange={(e) => {
                          const value = e.target.value === 'true';
                          setFieldValue('reporte_c_riesgo', value);
                        }}
                      >
                        <option value={'none'} className="option">
                          Selecciona una opción
                        </option>
                        <option value={'true'} className="option">
                          Si
                        </option>
                        <option value={'false'} className="option">
                          No
                        </option>
                      </Field>
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="reporte_c_riesgo"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.reporte_c_riesgo}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label
                        htmlFor="estado_cp_correo"
                        className="label-invoice"
                      >
                        Envio factura correo electrónico:
                      </label>
                    </div>
                    <div className="div16">
                      <Field
                        id="estado_cp_correo"
                        name="estado_cp_correo"
                        as="select"
                        className="select"
                        onChange={(e) => {
                          const value = e.target.value === 'true';
                          setFieldValue('estado_cp_correo', value);
                        }}
                      >
                        <option value={'none'} className="option">
                          Selecciona una opción
                        </option>
                        <option value={'true'} className="option">
                          Si
                        </option>
                        <option value={'false'} className="option">
                          No
                        </option>
                      </Field>
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="estado_cp_correo"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.estado_cp_correo}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="init_date" className="label-invoice">
                        Fecha de inicio:
                      </label>
                    </div>

                    <div className="div2">
                      <Field
                        type="text"
                        id="init_date"
                        name="init_date"
                        placeholder="YYYY-MM-DD"
                        className="labelInputContra"
                      />
                    </div>
                    <div>
                      <RiCalendar2Line className="calendar" />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="init_date"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.init_date}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="cutoffDate" className="label-invoice">
                        Fecha de corte:
                      </label>
                    </div>

                    <div className="div17">
                      <Field
                        type="text"
                        id="cutoffDate"
                        name="cutoffDate"
                        placeholder="YYYY-MM-DD"
                        className="labelInputContra"
                      />
                    </div>
                    <div>
                      <RiCalendar2Line className="calendar" />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="cutoffDate"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.cutoffDate}
                        </div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <div>
                      <label htmlFor="ultimo_pago" className="label-invoice">
                        Fecha último pago:
                      </label>
                    </div>

                    <div className="div18">
                      <Field
                        type="text"
                        id="ultimo_pago"
                        name="ultimo_pago"
                        placeholder="YYYY-MM-DD"
                        className="labelInputContra"
                      />
                    </div>
                    <div>
                      <RiCalendar2Line className="calendar" />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="ultimo_pago"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.ultimo_pago}
                        </div>
                      )}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={previousStep}
                    className="previous-button"
                  >
                    <FaArrowLeft className="arrow" /> Anterior
                  </button>
                  <button type="button" onClick={nextStep}>
                    Siguiente <FaArrowRight className="arrow" />
                  </button>
                </div>
              )}
              {step === 3 && (
                <div className="divInvoice">
                  <h2 className="tittle">Datos de la instalacion</h2>
                  <div className="form-group">
                    <div>
                      <label htmlFor="marca_onu" className="label-invoice">
                        Marca de ONU:
                      </label>
                    </div>
                    <div className="div4">
                      <Field
                        type="text"
                        id="marca_onu"
                        name="marca_onu"
                        placeholder=""
                        className="labelInputContra"
                      />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="marca_onu"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.marca_onu}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label htmlFor="caja_nap" className="label-invoice">
                        Caja NAP:
                      </label>
                    </div>
                    <div className="div14">
                      <Field
                        type="text"
                        id="caja_nap"
                        name="caja_nap"
                        placeholder=""
                        className="labelInputContra"
                      />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="caja_nap:"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.caja_nap}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label htmlFor="mac" className="label-invoice">
                        Mac ONU:
                      </label>
                    </div>
                    <div className="div14">
                      <Field
                        type="text"
                        id="mac"
                        name="mac"
                        placeholder=""
                        className="labelInputContra"
                      />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="mac"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.mac}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <div>
                      <label
                        htmlFor="estado_contrato"
                        className="label-invoice"
                      >
                        Estado contrato:
                      </label>
                    </div>
                    <div className="div19">
                      <Field
                        id="estado_contrato"
                        name="estado_contrato"
                        as="select"
                        className="select"
                      >
                        <option value={'none'} className="option">
                          Selecciona una opción
                        </option>
                        <option value={'ACTIVO'} className="option">
                          Activo
                        </option>
                        <option value={'CORTADO'} className="option">
                          Cortado
                        </option>
                        <option value={'RETIRADO'} className="option">
                          Retirado
                        </option>
                        <option value={'ANULADO'} className="option">
                          Anulado
                        </option>
                        <option value={'POR INSTALAR'} className="option">
                          Por instalar
                        </option>
                      </Field>
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="estado_contrato"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.estado_contrato}
                        </div>
                      )}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={previousStep}
                    className="previous-button"
                  >
                    <FaArrowLeft className="arrow" /> Anterior
                  </button>
                  <button type="button" onClick={nextStep}>
                    Siguiente <FaArrowRight className="arrow" />
                  </button>
                </div>
              )}
              {step === 4 && (
                <div className="divInvoice">
                  <h2 className="tittle">Documentacion</h2>
                  <div className="form-group">
                    <div>
                      <label htmlFor="salesman" className="label-invoice">
                        Vendedor:
                      </label>
                    </div>
                    <div className="div10">
                      <Field
                        type="text"
                        id="salesman"
                        name="salesman"
                        placeholder=""
                        className="labelInputContra"
                      />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="salesman"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.salesman}
                        </div>
                      )}
                    />
                  </p>
                  <p className="label-invoice">
                    {' '}
                    Captura imagen documento cara 1
                  </p>
                  <div className="form-group-img">
                    <div className="label-invoice">
                      <CameraCapture setFieldValue={setFieldValue} />
                    </div>
                  </div>
                  <p className="label-invoice">
                    Captura imagen documento cara 2
                  </p>
                  <div className="form-group-img">
                    <div className="label-invoice">
                      <CameraCapture2 setFieldValue={setFieldValue} />
                    </div>
                  </div>

                  <div className="form-group-firma">
                    <label className="label-invoice-firma">Firma</label>
                    <SignatureCanvas
                      ref={signatureCanvas}
                      penColor="black"
                      canvasProps={{
                        width: 400,
                        height: 200,
                        className: 'signature-canvas',
                      }}
                    />
                  </div>
                  <div class="button-container-firma">
                    <button
                      type="button"
                      disabled={firmaGuardada}
                      onClick={async () => {
                        const signatureImage =   // coincide (base)
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
                          const imageURL = file.secure_url; // sería SignatureImage si coincide con base64
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
                      <FaSave /> Guardar Firma
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

                  <p>
                    <ErrorMessage
                      name="signature"
                      component={() => (
                        <div className="error-message">{errors.signature}</div>
                      )}
                    />
                  </p>
                  <div className="form-group-cont">
                    <button type="button" onClick={openModal}>
                      Ver Términos y Condiciones
                    </button>
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
                  <button
                    type="button"
                    onClick={previousStep}
                    className="previous-button"
                  >
                    <FaArrowLeft className="arrow" /> Anterior
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    Enviar Contrato <FaPaperPlane />
                  </button>
                </div>
              )}
              {submissionResult === 'success' && (
                <div className="message-container">
                  <div className="success">
                    El contrato se envio con exito!, el equipo de Fhanred se
                    pondra en contacto. !Gracias por preferirnos¡.
                  </div>
                </div>
              )}
              {submissionResult === 'error' && (
                <div className="message-container">
                  <div className="error">
                    'El contrato no se pudo enviar. Inténtelo nuevamente.'
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

export default Invoice;
