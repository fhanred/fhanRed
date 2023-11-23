import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEnvelope,
  FaPaperPlane,
  FaPhone,
} from "react-icons/fa";
import { RiCalendar2Line } from "react-icons/ri";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { createInvoice } from "../../Redux/Actions/actions";
import CameraCapture from "../CameraCapture/CameraCapture";
import CameraCapture2 from "../CameraCapture/CameraCapture2";
import "./Invoice1.css";

// Configuración de react-modal
Modal.setAppElement("#root"); // Especifica dónde se renderizará el modal

function Invoice() {
  const signatureCanvas = React.createRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTermsAccepted, setTermsAccepted] = useState(false);
  const [streetType, setStreetType] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [orientation, setOrientation] = useState("");
  const [details, setDetails] = useState("");
  const [combinedAddress, setCombinedAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [firmaGuardada, setFirmaGuardada] = useState(false);

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
      {submissionResult === "success" && (
        <div className="success-message">El formulario se envió con éxito.</div>
      )}
      {submissionResult === "error" && (
        <div className="error-message">No se pudo enviar el formulario.</div>
      )}
      <Formik
        initialValues={{
          sexo: "none",
          tipo_documento: "none" /*tipo documento identificacion*/, //ok
          n_documento: "",
          image_ced1: "",
          image_ced2: "",
          tipo_persona: "none", //ok
          signature: null,
          email: "", //ok
          Order_date: "", //0k
          fecha_cumple: "", // ok
          name_razonSocial: "", //ok
          tel1: "", //ok
          tel2: "", //ok
          tel3: "", //ok
          id_plan: "none" /*plan*/, //ok

          idStratus: "none", //ok
          idZone: "none", //ok
          id_vivienda: "none", // ok
          municipio: "none", // ok
          barrio_vereda: "",
          direccion: "", //ok
          reporte_c_riesgo: false, //Ok
          estado_cp_correo: true, //
          init_date: "", //ok
          cutoffDate: "", //ok
          ultimo_pago: "", //ok
          salesman: "", //ok
          mac: "",
          caja_nap: "",
          marca_onu: "",
          estado_contrato: "none",
        }}
        validate={(values) => {
          let errors = {};
          if (values.tipo_persona === "P.NATURAL" && !values.name_razonSocial) {
            errors.name_razonSocial = "Por favor ingrese un nombre y apellido";
          } else {
            const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
            if (!nameRegex.test(values.name_razonSocial)) {
              errors.name_razonSocial =
                "El nombre solo puede contener letras y espacios";
            }
          }

          if (values.sexo === "none") {
            errors.sexo = "Dato Requerido";
          }
          if (values.tipo_documento === "none") {
            errors.tipo_documento = "Dato Requerido";
          }
          if (!values.n_documento) {
            errors.n_documento = "Dato Requerido";
          }
          if (values.tipo_persona === "none") {
            errors.tipo_persona = "Dato Requerido";
          }
          if (!values.email) {
            errors.email = "Por favor ingrese un correo electronico";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "El correo no es valido";
          }

          if (values.Order_date) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.Order_date)) {
              errors.Order_date =
                "Fecha no válida. El formato debe ser YYYY-MM-DD.";
            } else {
              const [year, month, day] =
                values.Order_date.split("-").map(Number);
              if (
                day <= 0 ||
                day > 31 || // Día válido entre 1 y 31
                month <= 0 ||
                month > 12 // Mes válido entre 1 y 12
              ) {
                errors.Order_date = "Fecha no válida. Verifique día y mes.";
              }
            }
          } else {
            errors.Order_date =
              "Este campo es obligatorio. Por favor, ingrese una fecha.";
          }
          if (values.fecha_cumple) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.fecha_cumple)) {
              errors.fecha_cumple =
                "Fecha no válida. El formato debe ser YYYY-MM-DD.";
            } else {
              const [year, month, day] = values.fecha_cumple
                .split("-")
                .map(Number);
              if (
                day <= 0 ||
                day > 31 || // Día válido entre 1 y 31
                month <= 0 ||
                month > 12 // Mes válido entre 1 y 12
              ) {
                errors.fecha_cumple = "Fecha no válida. Verifique día y mes.";
              }
            }
          } else {
            errors.fecha_cumple =
              "Este campo es obligatorio. Por favor, ingrese una fecha.";
          }
          if (
            values.tipo_persona === "P.JURIDICA" &&
            !values.name_razonSocial
          ) {
            errors.name_razonSocial = "Dato Requerido";
          }
          if (!values.tel1) {
            errors.tel1 = "Por favor ingrese un número de celular";
          } else if (!/^[0-9]{10}$/.test(values.tel1)) {
            errors.tel1 = "Por favor ingrese un número valido";
          }
          if (!values.tel2) {
            errors.tel2 = "Por favor ingrese un número de celular";
          } else if (!/^[0-9]{10}$/.test(values.tel2)) {
            errors.tel2 = "Por favor ingrese un número valido";
          }
          if (!values.tel3) {
            errors.tel3 = "Por favor ingrese un número de celular";
          } else if (!/^[0-9]{10}$/.test(values.tel3)) {
            errors.tel3 = "Por favor ingrese un número valido";
          }
          if (values.id_plan === "none") {
            errors.id_plan = "Dato requerido";
          }

          if (values.idStratus === "none") {
            errors.idStratus = "Dato requerido";
          }
          if (values.idZone === "none") {
            errors.idZone = "Dato requerido";
          }
          if (values.id_vivienda === "none") {
            errors.id_vivienda = "Dato requerido";
          }
          if (!values.barrio_vereda) {
            errors.barrio_vereda = "Dato requerido";
          }
          if (values.municipio === "none") {
            errors.municipio = "Dato requerido";
          }
          if (!values.direccion) {
            errors.direccion = "Dato requerido";
          }
          if (values.reporte_c_riesgo === "none") {
            errors.reporte_c_riesgo = "Dato requerido";
          }
          if (values.fact_email === "none") {
            errors.fact_email = "Dato requerido";
          }

          if (values.init_date) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.init_date)) {
              errors.init_date =
                "Fecha no válida. El formato debe ser YYYY-MM-DD.";
            } else {
              const [year, month, day] = values.init_date
                .split("-")
                .map(Number);
              if (
                day <= 0 ||
                day > 31 || // Día válido entre 1 y 31
                month <= 0 ||
                month > 12 // Mes válido entre 1 y 12
              ) {
                errors.init_date = "Fecha no válida. Verifique día y mes.";
              }
            }
          } else {
            errors.init_date =
              "Este campo es obligatorio. Por favor, ingrese una fecha.";
          }

          if (values.cutoffDate) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.cutoffDate)) {
              errors.cutoffDate =
                "Fecha no válida. El formato debe ser YYYY-MM-DD.";
            } else {
              const [year, month, day] = values.cutoffDate
                .split("-")
                .map(Number);
              if (
                day <= 0 ||
                day > 31 || // Día válido entre 1 y 31
                month <= 0 ||
                month > 12 // Mes válido entre 1 y 12
              ) {
                errors.cutoffDate = "Fecha no válida. Verifique día y mes.";
              }
            }
          } else {
            errors.cutoffDate =
              "Este campo es obligatorio. Por favor, ingrese una fecha.";
          }

          if (values.ultimo_pago) {
            const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
            if (!datePattern.test(values.ultimo_pago)) {
              errors.ultimo_pago =
                "Fecha no válida. El formato debe ser YYYY-MM-DD.";
            } else {
              const [year, month, day] = values.ultimo_pago
                .split("-")
                .map(Number);
              if (
                day <= 0 ||
                day > 31 || // Día válido entre 1 y 31
                month <= 0 ||
                month > 12 // Mes válido entre 1 y 12
              ) {
                errors.ultimo_pago = "Fecha no válida. Verifique día y mes.";
              }
            }
          } else {
            errors.ultimo_pago =
              "Este campo es obligatorio. Por favor, ingrese una fecha.";
          }
          if (!values.mac) {
            errors.mac = "Dato requerido";
          }
          if (!values.caja_nap) {
            errors.caja_nap = "Dato requerido";
          }
          if (!values.marca_onu) {
            errors.marca_onu = "Dato requerido";
          }
          if (!values.salesman) {
            errors.salesman = "Dato requerido";
          }

          if (values.estado_contrato === "none") {
            errors.estado_contrato = "Dato requerido";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (step === 4 && isTermsAccepted) {
            dispatch(createInvoice(values))
              .then((response) => {
                if (response.success) {
                  setSubmissionResult("success");
                  setSubmitting(false);
                  resetForm();
                  history.push("/admin/datosClientes");
                } else {
                  setSubmissionResult("error");
                  console.error(response.message);
                  setSubmitting(false);
                }
              })
              .catch((error) => {
                setSubmissionResult("error");
                console.error(error);
                setSubmitting(false);
              });
          } else {
            nextStep();
            alert(
              "Debes aceptar los términos y condiciones antes de enviar el formulario."
            );
          }
        }}
      >
        {({ isSubmitting, values, errors, setFieldValue }) => (
          <div>
            <Form>
              {step === 1 && (
                <div>
                  <h2 className="tittle">Datos personales suscriptor</h2>
                  <div className="form-group">
                    <label htmlFor="Order_date" className="label-invoice">
                      Fecha
                    </label>
                    <RiCalendar2Line className="calendar" />
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
                    <label htmlFor="tipo_persona" className="label-invoice">
                      Tipo de persona
                    </label>
                    <Field
                      id="tipo_persona"
                      name="tipo_persona"
                      as="select"
                      className="select"
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"P.JURIDICA"} className="option">
                        Jurídica
                      </option>
                      <option value={"P.NATURAL"} className="option">
                        Natural
                      </option>
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

                  {values.tipo_persona === "P.NATURAL" && (
                    <div className="form-group">
                      <label
                        htmlFor="name_razonSocial"
                        className="label-invoice"
                      >
                        Nombres y Apellidos:
                      </label>
                      <Field
                        type="text"
                        id="name_razonSocial"
                        name="name_razonSocial"
                        placeholder=""
                        disabled={values.tipo_persona === "P.JURIDICA"}
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

                  {values.tipo_persona === "P.JURIDICA" && (
                    <div className="form-group">
                      <label
                        htmlFor="name_razonSocial"
                        className="label-invoice"
                      >
                        Razón social
                      </label>
                      <Field
                        type="text"
                        id="name_razonSocial"
                        name="name_razonSocial"
                        placeholder=""
                        disabled={values.tipo_persona === "P.NATURAL"}
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
                    <label htmlFor="sexo" className="label-invoice">
                      Sexo
                    </label>
                    <Field id="sexo" name="sexo" as="select" className="select">
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"Masculino"} className="option">
                        Masculino
                      </option>
                      <option value={"Femenino"} className="option">
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

                  <div className="form-group">
                    <label htmlFor="tipo_documento" className="label-invoice">
                      Tipo de documento
                    </label>
                    <Field
                      id="tipo_documento"
                      name="tipo_documento"
                      as="select"
                      className="select"
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"CC"} className="option">
                        CC
                      </option>
                      <option value={"CE"} className="option">
                        CE
                      </option>
                      <option value={"NIT"} className="option">
                        NIT
                      </option>
                      <option value={"PP"} className="option">
                        PP
                      </option>
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
                    <label htmlFor="n_documento" className="label-invoice">
                      Número de documento
                    </label>
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
                    <label htmlFor="email" className="label-invoice">
                      Correo electrónico
                    </label>
                    <FaEnvelope className="email" />
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
                    <label htmlFor="fecha_cumple" className="label-invoice">
                      Fecha de nacimiento
                    </label>
                    <RiCalendar2Line className="calendar" />
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

                  <div className="form-group">
                    <label htmlFor="tel1" className="label-invoice">
                      Teléfono de Contacto 1
                    </label>
                    <FaPhone className="phone" />
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
                    <label htmlFor="tel2" className="label-invoice">
                      Teléfono de contacto 2
                    </label>
                    <FaPhone className="phone" />
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
                    <label htmlFor="tel3" className="label-invoice">
                      Teléfono de contacto 3
                    </label>
                    <FaPhone className="phone" />
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
                    Siguiente <FaArrowRight className="arrow" />
                  </button>
                </div>
              )}
              {step === 2 && (
                <div className="formSection">
                  <h2 className="tittle">Datos del plan </h2>
                  <div className="form-group">
                    <label htmlFor="id_plan" className="label-invoice">
                      Plan:
                    </label>
                    <Field
                      id="id_plan"
                      name="id_plan"
                      as="select"
                      type="number"
                      className="select"
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"1"} className="option">
                        PLAN BRONCE 5MG
                      </option>
                      <option value={"2"} className="option">
                        PLAN PLATA 7MG
                      </option>
                      <option value={"3"} className="option">
                        PLAN ORO 10MG
                      </option>
                      <option value={"4"} className="option">
                        PLAN PLATINO 20MG
                      </option>
                      <option value={"5"} className="option">
                        PLAN RUBI 30MG
                      </option>
                      <option value={"6"} className="option">
                        PLAN ZAFIRO 50MG
                      </option>
                      <option value={"7"} className="option">
                        PLAN ESMERALDA 100MG
                      </option>
                      <option value={"8"} className="option">
                        PLAN DIAMANTE 200MG
                      </option>
                      <option value={"9"} className="option">
                        PLAN CORONA 300MG
                      </option>
                      <option value={"10"} className="option">
                        PLAN DEDICADO 20MG
                      </option>
                      <option value={"11"} className="option">
                        PLAN DEDICADO 50MG
                      </option>
                      <option value={"12"} className="option">
                        PLAN DEDICADO 100MG
                      </option>
                      <option value={"13"} className="option">
                        PLAN DEDICADO 200MG
                      </option>
                      <option value={"14"} className="option">
                        PLAN DEDICADO 300MG
                      </option>
                      <option value={"15"} className="option">
                        PLAN DEDICADO 500MG
                      </option>
                      <option value={"16"} className="option">
                        PLAN DEDICADO 1000MG
                      </option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="id_plan"
                      component={() => (
                        <div className="error-message">{errors.id_plan}</div>
                      )}
                    />
                  </p>

                  <div className="form-group">
                    <label htmlFor="idStratus" className="label-invoice">
                      Estrato:
                    </label>
                    <Field
                      id="idStratus"
                      name="idStratus"
                      as="select"
                      className="select"
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"1"} className="option">
                        1
                      </option>
                      <option value={"2"} className="option">
                        2
                      </option>
                      <option value={"3"} className="option">
                        3
                      </option>
                      <option value={"4"} className="option">
                        4
                      </option>
                      <option value={"5"} className="option">
                        5
                      </option>
                      <option value={"6"} className="option">
                        6
                      </option>
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
                    <label htmlFor="idZone" className="label-invoice">
                      Zona:
                    </label>
                    <Field
                      id="idZone"
                      name="idZone"
                      as="select"
                      className="select"
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"Urbana"} className="option">
                        Urbana
                      </option>
                      <option value={"Rural"} className="option">
                        Rural
                      </option>
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
                    <label htmlFor="id_vivienda" className="label-invoice">
                      Tipo de vivienda:
                    </label>
                    <Field
                      id="id_vivienda"
                      name="id_vivienda"
                      as="select"
                      type="number"
                      className="select"
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"1"} className="option">
                        Alquilada
                      </option>
                      <option value={"2"} className="option">
                        Propia
                      </option>
                      <option value={"3"} className="option">
                        Familiar
                      </option>
                      <option value={"4"} className="option">
                        Tienda
                      </option>
                      <option value={"5"} className="option">
                        Instituciones
                      </option>
                      <option value={"6"} className="option">
                        Edificio
                      </option>
                      <option value={"7"} className="option">
                        Hostal/Hotel
                      </option>
                      <option value={"8"} className="option">
                        Finca
                      </option>
                      <option value={"9"} className="option">
                        Cabaña
                      </option>
                    </Field>
                  </div>
                  <p>
                    <ErrorMessage
                      name="id_vivienda"
                      component={() => (
                        <div className="error-message">
                          {errors.id_vivienda}
                        </div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="municipio" className="label-invoice">
                      Municipio:
                    </label>
                    <Field
                      id="municipio"
                      name="municipio"
                      as="select"
                      className="select"
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"Restrepo"} className="option">
                        Restrepo
                      </option>
                      <option value={"Cumaral"} className="option">
                        Cumaral
                      </option>
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
                    <label htmlFor="barrio_vereda" className="label-invoice">
                      Barrio:
                    </label>
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
                      <label htmlFor="streetType" className="label-invoice">
                        Tipo de vía:
                      </label>
                      <select
                        id="streetType"
                        onChange={(e) => setStreetType(e.target.value)}
                        className="select"
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
                    <div className="form-group-address">
                      <label htmlFor="streetNumber" className="label-invoice">
                        Número:
                      </label>
                      <input
                        type="text"
                        id="streetNumber"
                        value={streetNumber}
                        onChange={(e) => setStreetNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group-address-container">
                    <div className="form-group-address">
                      <label htmlFor="orientation" className="label-invoice">
                        Orientación:
                      </label>
                      <select
                        id="orientation"
                        onChange={(e) => setOrientation(e.target.value)}
                        className="select"
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
                    <div className="form-group-address">
                      <label htmlFor="addressNumber" className="label-invoice">
                        #:
                      </label>
                      <input
                        type="text"
                        id="addressNumber"
                        value={addressNumber}
                        onChange={(e) => setAddressNumber(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group-address-container">
                    <div className="form-group-address">
                      <label htmlFor="details" className="label-invoice">
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
                    <label htmlFor="direccion" className="label-invoice">
                      Dirección:
                    </label>
                    <Field
                      type="text"
                      id="direccion"
                      name="direccion"
                      placeholder=""
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleGenerateAddress();
                      setFieldValue("direccion", combinedAddress); // Actualiza el valor del campo "address"
                    }}
                  >
                    Generar Dirección
                  </button>

                  <p>
                    <ErrorMessage
                      name="direccion"
                      component={() => (
                        <div className="error-message">{errors.direccion}</div>
                      )}
                    />
                  </p>
                  <div className="form-group">
                    <label htmlFor="reporte_c_riesgo" className="label-invoice">
                      Reporte central de riesgo:
                    </label>
                    <Field
                      id="reporte_c_riesgo"
                      name="reporte_c_riesgo"
                      as="select"
                      className="select"
                      onChange={(e) => {
                        const value = e.target.value === "true";
                        setFieldValue("reporte_c_riesgo", value);
                      }}
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"true"} className="option">
                        Si
                      </option>
                      <option value={"false"} className="option">
                        No
                      </option>
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
                    <label htmlFor="estado_cp_correo" className="label-invoice">
                      Envio factura correo electrónico:
                    </label>
                    <Field
                      id="estado_cp_correo"
                      name="estado_cp_correo"
                      as="select"
                      className="select"
                      onChange={(e) => {
                        const value = e.target.value === "true";
                        setFieldValue("estado_cp_correo", value);
                      }}
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"true"} className="option">
                        Si
                      </option>
                      <option value={"false"} className="option">
                        No
                      </option>
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
                    <label htmlFor="init_date" className="label-invoice">
                      Fecha de inicio:
                    </label>
                    <RiCalendar2Line className="calendar" />
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
                    <label htmlFor="cutoffDate" className="label-invoice">
                      Fecha de corte:
                    </label>
                    <RiCalendar2Line className="calendar" />
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
                    <label htmlFor="ultimo_pago" className="label-invoice">
                      Fecha último pago:
                    </label>
                    <RiCalendar2Line className="calendar" />
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
                <div className="formSection">
                  <h2 className="tittle">Datos de la instalacion</h2>
                  <div className="form-group">
                    <label htmlFor="marca_onu" className="label-invoice">
                      Marca de ONU:
                    </label>
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
                    <label htmlFor="caja_nap" className="label-invoice">
                      Caja NAP:
                    </label>
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
                    <label htmlFor="mac" className="label-invoice">
                      Mac ONU:
                    </label>
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
                    <label htmlFor="estado_contrato" className="label-invoice">
                      Estado contrato:
                    </label>
                    <Field
                      id="estado_contrato"
                      name="estado_contrato"
                      as="select"
                      className="select"
                    >
                      <option value={"none"} className="option">
                        Selecciona una opción
                      </option>
                      <option value={"ACTIVO"} className="option">
                        Activo
                      </option>
                      <option value={"CORTADO"} className="option">
                        Cortado
                      </option>
                      <option value={"RETIRADO"} className="option">
                        Retirado
                      </option>
                      <option value={"ANULADO"} className="option">
                        Anulado
                      </option>
                      <option value={"POR INSTALAR"} className="option">
                        Por instalar
                      </option>
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
                <div className="formSection">
                  <h2 className="tittle">Documentacion</h2>
                  <div className="form-group">
                    <label htmlFor="salesman" className="label-invoice">
                      Vendedor:
                    </label>
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
                  <p className="label-invoice">
                    {" "}
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
                        className: "signature-canvas",
                      }}
                    />
                  </div>
                  <div class="button-container-firma">
                    <button
                      type="button"
                      disabled={firmaGuardada}
                      onClick={async () => {
                        const signatureImage =
                          signatureCanvas.current.toDataURL();
                        const data = new FormData();
                        data.append("file", signatureImage);
                        data.append("upload_preset", "FHANRED");
                        setLoading(true);

                        try {
                          // Obtenemos la URL de la imagen de la respuesta de Cloudinary
                          const response = await fetch(
                            "https://api.cloudinary.com/v1_1/dwejoiefk/image/upload",
                            {
                              method: "POST",
                              body: data,
                            }
                          );
                          const file = await response.json();

                          // Obtenemos la URL de la imagen
                          const imageURL = file.secure_url;
                          // Actualiza el valor del campo "signature" en Formik con la URL
                          setFieldValue("signature", imageURL);
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
                      <h1>{""}</h1>
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
        <div style={{ maxHeight: "300px", overflow: "auto" }}>
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
