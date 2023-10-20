import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createInvoice } from '../../Redux/Actions/actions';
import './Invoice.css';

function Invoice() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSent, setIsSent] = useState(false);
  const [step, setStep] = useState(1);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isNaturalPerson, setIsNaturalPerson] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);
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
          typePerson: 'none', //ok
          email: '', //ok
          Order_date: new Date(), //0k
          birthDate: new Date(), // ok
          CompanyName: '', //ok
          phone1: '', //ok
          phone2: '', //ok
          phone3: '', //ok
          Product_name: 'none' /*plan*/, //ok
          n_invoice: 0 /*numero contrato*/, //ok
          idStratus: 'none', //ok
          idZone: 'none', //ok
          idTypeHouse: 'none', // ok
          dataMap: new Map(), // ok
          municipality: '', // ok
          district: '',
          address: '', //ok
          payId: '' /*forma de pago*/, //ok
          reportCentralCredit: 'none', //Ok
          fact_email: 'none', //
          debt: '', //ok
          startDate: new Date(), //ok
          cutoffDate: new Date(), //ok
          idLastPayment: new Date(), //ok
          salesman: '', //ok
          trademarkONU: '',
          boxNAP: '',
          MacONU: '',
          idStateInvoice: 'none',
        }}
        validate={(values) => {
          const errors = {};
          if (touchedFields.name && !values.name) {
            errors.name = 'Por favor ingrese un nombre';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = 'El nombre solo puede contener letras y espacios';
          }
          if (touchedFields.lastname && !values.lastName) {
            errors.lastName = 'Por favor ingrese su apellido';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName)) {
            errors.lastName = 'El nombre solo puede contener letras y espacios';
          }
          if (touchedFields.typeId && values.typeId === 'none') {
            errors.typeId = 'Dato Requerido';
          }
          if (touchedFields.typePerson && values.typePerson === 'none') {
            errors.typePerson = 'Dato Requerido';
          }
          if (touchedFields.email && !values.email) {
            errors.email = 'Por favor ingrese un correo electronico';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = 'El correo no es valido';
          }

          if (touchedFields.Order_date && !values.Order_date) {
            errors.Order_date =
              'Por favor ingrese una fecha formato dd/MM/yyyy';
          } else if (
            !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
              values.Order_date
            )
          ) {
            errors.Order_date = 'formato de fecha no valido';
          }
          if (touchedFields.birthDate && !values.birthDate) {
            errors.birthDate = 'Por favor ingrese una fecha formato dd/MM/yyyy';
          } else if (
            !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
              values.birthDate
            )
          ) {
            errors.birthDate = 'formato de fecha no valido';
          }
          if (touchedFields.CompanyName && !values.CompanyName) {
            errors.CompanyName = 'Dato Requerido';
          }
          if (touchedFields.phone1 && !values.phone1) {
            errors.phone1 = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.phone1)) {
            errors.phone1 = 'Por favor ingrese un número valido';
          }
          if (touchedFields.phone2 && !values.phone2) {
            errors.phone2 = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.phone2)) {
            errors.phone2 = 'Por favor ingrese un número valido';
          }
          if (touchedFields.phone3 && !values.phone3) {
            errors.phone3 = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.phone3)) {
            errors.phone3 = 'Por favor ingrese un número valido';
          }
          if (touchedFields.Product_name && values.Product_name === 'none') {
            errors.Product_name = 'Dato requerido';
          }
          if (touchedFields.idStratus && values.idStratus === 'none') {
            errors.idStratus = 'Dato requerido';
          }
          if (touchedFields.idZone && values.idZone === 'none') {
            errors.idZone = 'Dato requerido';
          }
          if (touchedFields.idTypeHouse && values.idTypeHouse === 'none') {
            errors.idTypeHouse = 'Dato requerido';
          }
          if (touchedFields.district && !values.district) {
            errors.district = 'Dato requerido';
          }
          if (touchedFields.municipality && values.municipality === 'none') {
            errors.municipality = 'Dato requerido';
          }
          if (touchedFields.payId && values.payId === 0) {
            errors.payId = 'Dato requerido';
          }

          if (touchedFields.startDate && !values.startDate) {
            errors.startDate = 'Dato requerido';
          }
          if (touchedFields.cutoffDate && !values.cutoffDate) {
            errors.cutoffDate = 'Dato requerido';
          }
          if (touchedFields.idLastPayment && !values.idLastPayment) {
            errors.idLastPayment = 'Dato requerido';
          }
          if (touchedFields.salesman && !values.salesman) {
            errors.salesman = 'Dato requerido';
          }
          if (touchedFields.fact_email && values.fact_email === 'none') {
            errors.idStatusByEmail = 'Dato requerido';
          }
          if (touchedFields.idStateInvoice && values.idStateInvoice === 0) {
            errors.idStateInvoice = 'Dato requerido';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const success = Math.random() < 0.5;
          setSubmissionResult(success ? 'success' : 'error');

          setTimeout(() => {
            if (step === 3 && success) {
              dispatch(createInvoice(values));

              setIsSent(true);
              setSubmitting(false);
              resetForm();
              history.push('/admin/datosClientes');
              console.log(values);
            } else {
              nextStep();
            }
          }, 3000);
        }}
      >
        {({ isSubmitting, errors, formik, setFieldValue }) => (
          <div>
            <Form>
              {step === 1 && (
                <div className="formSection">
                  <h2>Datos personales</h2>
                  <div className="form-group">
                    <label htmlFor="Order_date">Fecha:</label>
                    <Field
                      id="Order_date"
                      name="Order_date"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
                      {({ field, form }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                          dateFormat="dd/MM/yyyy" // formato de fecha
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="Order_date"
                      component={() => (
                        <div className="error-message">{errors.Order_date}</div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder=""
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    />
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
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    />
                    <ErrorMessage
                      name="lastName"
                      component={() => (
                        <div className="error-message">{errors.lastName}</div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Sexo:</label>
                    <Field
                      id="gender"
                      name="gender"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
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
                      name="typePerson"
                      component={() => (
                        <div className="error-message">{errors.gender}</div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="typeId">Tipo de documento:</label>
                    <Field
                      id="typeId"
                      name="typeId"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
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
                    <label htmlFor="typePerson">Tipo de persona:</label>
                    <Field
                      id="typePerson"
                      name="typePerson"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        setIsNaturalPerson(selectedValue === 'Natural');
                        setFieldValue('typePerson', selectedValue);
                      }}
                    >
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
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
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
                      id="birthDate"
                      name="birthDate"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
                      {({ field, form }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                          dateFormat="dd/MM/yyyy" // formato de fecha
                        />
                      )}
                    </Field>
                  </div>

                  <div className="form-group">
                    <label htmlFor="CompanyName">Razón social:</label>
                    <Field
                      type="text"
                      id="CompanyName"
                      name="CompanyName"
                      placeholder=""
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                      disabled={isNaturalPerson}
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
                  <div className="form-group">
                    <label htmlFor="phone1" className="phone-label">
                      Teléfono de Contacto 1:
                    </label>
                    <Field
                      type="tel"
                      id="phone1"
                      name="phone1"
                      placeholder=""
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
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
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
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
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                      className="phone-input"
                    />
                    <ErrorMessage
                      name="phone3"
                      component={() => (
                        <div className="error-message">{errors.phone3}</div>
                      )}
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="formSection">
                  <h2>Datos plan </h2>
                  <div className="form-group">
                    <label htmlFor="Product_name">Plan:</label>
                    <Field
                      id="idStratus"
                      name="idStratus"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
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
                    <ErrorMessage
                      name="idStratus"
                      component={() => (
                        <div className="error-message">
                          {errors.Product_name}
                        </div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="n_contrato">Contrato #:</label>
                    <Field
                      type="number"
                      id="n_contrato"
                      name="n_contrato"
                      placeholder=""
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
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
                    <Field
                      id="idStratus"
                      name="idStratus"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
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
                    <Field
                      id="idZone"
                      name="idZone"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
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
                    <Field
                      id="idTypeHouse"
                      name="idTypeHouse"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Alquilada'}>Alquilada</option>
                      <option value={'Propia'}>Propia</option>
                      <option value={'Familiar'}>Familiar</option>
                      <option value={'Tienda'}>Tienda</option>
                      <option value={'Instituciones'}>Instituciones</option>
                      <option value={'Edificio'}>Edificio</option>
                      <option value={'Hostal/Hotel'}>Hostal/Hotel</option>
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
                    <label htmlFor="dataMap">Datos del mapa:</label>
                    <Field
                      name="dataMap"
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Clave: Valor"
                          onBlur={() =>
                            setTouchedFields({ ...touchedFields, name: true })
                          }
                          onChange={(e) => {
                            const [key, value] = e.target.value.split(':');
                            if (key && value) {
                              const newData = new Map(formik.values.dataMap);
                              newData.set(key, value);
                              formik.setFieldValue('dataMap', newData);
                            }
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="municipality">Municipio:</label>
                    <Field
                      id="municipality"
                      name="municipality"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Restrepo'}>Restrepo</option>
                      <option value={'Cumaral'}>Cumaral</option>
                    </Field>
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">Barrio:</label>
                    <Field
                      type="text"
                      id="district"
                      name="district"
                      placeholder=""
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Dirección:</label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      placeholder=""
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reportCentralCredit">
                      Reporte central de riesgo:
                    </label>
                    <Field
                      id="idStratus"
                      name="idStratus"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Si'}>Si</option>
                      <option value={'No'}>No</option>
                    </Field>
                    <ErrorMessage
                      name="idStratus"
                      component={() => (
                        <div className="error-message">{errors.idStratus}</div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="debt">Deuda:</label>
                    <Field
                      type="text"
                      id="debt"
                      name="debt"
                      placeholder=""
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fact_email">
                      Envio factura correo electronico:
                    </label>
                    <Field
                      id="fact_email"
                      name="fact_email"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
                      <option value={'none'}>Selecciona una opción</option>
                      <option value={'Si'}>Si</option>
                      <option value={'No'}>No</option>
                    </Field>
                  </div>

                  <div className="form-group">
                    <label htmlFor="startDate">Fecha inicio:</label>
                    <Field
                      id="startDate"
                      name="startDate"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
                      {({ field, form }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                          dateFormat="dd/MM/yyyy" // formato de fecha
                        />
                      )}
                    </Field>
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
                      id="cutoffDate"
                      name="cutoffDate"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
                      {({ field, form }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                          dateFormat="dd/MM/yyyy" // formato de fecha
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="cutoffDate"
                      component={() => (
                        <div className="error-message">{errors.cutoffDate}</div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="idLastPayment">Fecha último pago:</label>
                    <Field
                      id="idLastPayment"
                      name="idLastPayment"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    >
                      {({ field, form }) => (
                        <DatePicker
                          {...field}
                          selected={field.value}
                          onChange={(date) =>
                            form.setFieldValue(field.name, date)
                          }
                          dateFormat="dd/MM/yyyy" // formato de fecha
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="idLastPayment"
                      component={() => (
                        <div className="error-message">
                          {errors.idLastPayment}
                        </div>
                      )}
                    />
                  </div>
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
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="boxNAP">Caja NAP:</label>
                    <Field
                      type="text"
                      id="boxNAP"
                      name="boxNAP"
                      placeholder=""
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="MacONU">Mac de ONU:</label>
                    <Field
                      type="text"
                      id="MacONU"
                      name="MacONU"
                      placeholder=""
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="idStateInvoice">Estado contrato:</label>
                    <Field
                      id="idStateInvoice"
                      name="idStateInvoice"
                      as="select"
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
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
                      onBlur={() =>
                        setTouchedFields({ ...touchedFields, name: true })
                      }
                    />
                    <ErrorMessage
                      name="salesman"
                      component={() => (
                        <div className="error-message">{errors.salesman}</div>
                      )}
                    />
                  </div>
                </div>
              )}
              <div class="form-buttons">
                {step > 1 && (
                  <button onClick={previousStep} class="previous-button">
                    Anterior
                  </button>
                )}
                {step < 3 ? (
                  <button onClick={nextStep} class="next-button">
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    class="submit-button"
                  >
                    Enviar
                  </button>
                )}
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Invoice;
