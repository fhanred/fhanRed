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
          typeId: '' /*tipo documento identificacion*/, //ok
          typePerson: '', //ok
          email: '', //ok
          Order_date: new Date(), //0k
          birthDate: new Date(), // ok
          CompanyName: '', //ok
          phone1: '', //ok
          phone2: '', //ok
          phone3: '', //ok
          Product_name: '' /*plan*/, //ok
          n_invoice: 0 /*numero contrato*/, //ok
          idStratus: '', //ok
          idZone: '', //ok
          idTypeHouse: '', // ok
          dataMap: new Map(), // ok
          municipality: '', // ok
          address: '', //ok
          payId: '' /*forma de pago*/, //ok
          reportCentralCredit: '', //Ok
          fact_email: false, //
          debt: '', //ok
          startDate: new Date(), //ok
          cutoffDate: new Date(), //ok
          idLastPayment: '', //ok
          salesman: '', //ok
          trademarkONU: '',
          boxNAP: '',
          MacONU: '',
          idStateInvoice: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Por favor ingrese un nombre';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
            errors.name = 'El nombre solo puede contener letras y espacios';
          }
          if (!values.lastName) {
            errors.lastName = 'Por favor ingrese su apellido';
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastName)) {
            errors.lastName = 'El nombre solo puede contener letras y espacios';
          }
          if (values.typeId === 0) {
            errors.typeId = 'Dato Requerido';
          }
          if (values.typePerson === 0) {
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

          // if (!values.Order_date) {
          //   errors.Order_date =
          //     'Por favor ingrese una fecha formato dd/MM/yyyy';
          // } else if (
          //   !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
          //     values.Order_date
          //   )
          // ) {
          //   errors.Order_date = 'formato de fecha no valido';
          // }
          // if (!values.birthDate) {
          //   errors.birthDate = 'Por favor ingrese una fecha formato dd/MM/yyyy';
          // } else if (
          //   !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
          //     values.birthDate
          //   )
          // ) {
          //   errors.birthDate = 'formato de fecha no valido';
          // }
          if (!values.CompanyName) {
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
          if (!values.Product_name) {
            errors.Product_name = 'Dato requerido';
          }
          if (values.idStratus === 0) {
            errors.idStratus = 'Dato requerido';
          }
          if (values.idZone === 0) {
            errors.idZone = 'Dato requerido';
          }
          if (values.idTypeHouse === 0) {
            errors.idTypeHouse = 'Dato requerido';
          }
          if (values.payId === 0) {
            errors.payId = 'Dato requerido';
          }
          // if (!values.startDate) {
          //   errors.startDate = 'Por favor ingrese una fecha formato dd/MM/yyyy';
          // } else if (
          //   !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
          //     values.startDate
          //   )
          // ) {
          //   errors.startDate = 'formato de fecha no valido';
          // }
          // if (!values.cutoffDate) {
          //   errors.cutoffDate =
          //     'Por favor ingrese una fecha formato dd/MM/yyyy';
          // } else if (
          //   !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
          //     values.cutoffDate
          //   )
          // ) {
          //   errors.cutoffDate = 'formato de fecha no valido';
          // }
          if (values.idLastPayment === 0) {
            errors.idLastPayment = 'Dato requerido';
          }
          if (!values.salesman) {
            errors.salesman = 'Dato requerido';
          }
          if (values.idStatusByEmail === 0) {
            errors.idStatusByEmail = 'Dato requerido';
          }
          if (values.idStateInvoice === 0) {
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
                  <h2>Datos Personales</h2>
                  <div className="form-group">
                    <label htmlFor="Order_date">Fecha:</label>
                    <Field id="Order_date" name="Order_date">
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
                    <label htmlFor="typeId">Tipo de Documento:</label>
                    <Field id="typeId" name="typeId" as="select">
                      <option value={0}></option>
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
                    <label htmlFor="typePerson">Tipo de Persona:</label>
                    <Field id="typePerson" name="typePerson" as="select">
                      <option value={0}></option>
                      <option value={1}>Jurídica</option>
                      <option value={2}>Natural</option>
                    </Field>
                    <ErrorMessage
                      name="typePerson"
                      component={() => (
                        <div className="error-message">{errors.typePerson}</div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
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
                    <label htmlFor="birthDate">Fecha de Nacimiento:</label>
                    <Field id="birthDate" name="birthDate">
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
                    <label htmlFor="CompanyName">Razón Social:</label>
                    <Field
                      type="text"
                      id="CompanyName"
                      name="CompanyName"
                      placeholder=""
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
                </div>
              )}
              {step === 2 && (
                <div className="formSection">
                  <h2>Datos Plan </h2>
                  <div className="form-group">
                    <label htmlFor="Product_name">Plan:</label>
                    <Field
                      type="text"
                      id="Product_name"
                      name="Product_name"
                      placeholder=""
                    />
                    {/* <ErrorMessage
                      name="Product_name"
                      component={() => (
                        <div className="error-message">
                          {errors.Product_name}
                        </div>
                      )}
                    /> */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="n_invoice">Contrato #:</label>
                    <Field
                      type="number"
                      id="n_invoice"
                      name="n_invoice"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="n_invoice"
                      component={() => (
                        <div className="error-message">{errors.n_invoice}</div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="idStratus">Estrato:</label>
                    <Field id="idStratus" name="idStratus" as="select">
                      <option value={0}></option>
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
                      <option value={0}></option>
                      <option value={1}>Urbana</option>
                      <option value={2}>Rural</option>
                    </Field>
                    <ErrorMessage
                      name="idZone"
                      component={() => (
                        <div className="error-message">{errors.idZone}</div>
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="idTypeHouse">Tipo de Vivienda:</label>
                    <Field id="idTypeHouse" name="idTypeHouse" as="select">
                      <option value={0}></option>
                      <option value={1}>Alquilada</option>
                      <option value={2}>Propia</option>
                      <option value={1}>Familiar</option>
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
                    <label htmlFor="dataMap">Datos del Mapa:</label>
                    <Field
                      name="dataMap"
                      render={({ field }) => (
                        <input
                          type="text"
                          {...field}
                          placeholder="Clave: Valor"
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
                    <Field id="municipality" name="municipality" as="select">
                      <option value={0}></option>
                      <option value={1}>Restrepo</option>
                      <option value={2}>Cumaral</option>
                    </Field>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Dirección:</label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      placeholder=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reportCentralCredit">
                      Reporte central de riesgo:
                    </label>
                    <Field
                      type="text"
                      id="reportCentralCredit"
                      name="reportCentralCredit"
                      placeholder=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="debt">Deuda:</label>
                    <Field type="text" id="debt" name="debt" placeholder="" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fact_email">
                      Envio factura correo electronico:
                    </label>
                    <Field id="fact_email" name="fact_email" as="select">
                      <option value={0}></option>
                      <option value={1}>Si</option>
                      <option value={2}>No</option>
                    </Field>
                  </div>

                  <div className="form-group">
                    <label htmlFor="startDate">Fecha inicio:</label>
                    <Field id="startDate" name="startDate">
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
                    <Field id="cutoffDate" name="cutoffDate">
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
                    <label htmlFor="idLastPayment">Ultimo pago:</label>
                    <Field id="idLastPayment" name="idLastPayment" as="select">
                      <option value={0}></option>
                      <option value={1}>Temprano</option>
                      <option value={2}>A tiempo</option>
                      <option value={2}>Extemporaneo</option>
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="MacONU">Mac de ONU:</label>
                    <Field
                      type="text"
                      id="MacONU"
                      name="MacONU"
                      placeholder=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="idStateInvoice">Estado Contrato:</label>
                    <Field
                      id="idStateInvoice"
                      name="idStateInvoice"
                      as="select"
                    >
                      <option value={0}></option>
                      <option value={1}>Activo</option>
                      <option value={2}>Inactivo</option>
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
                    {/* <ErrorMessage
                      name="salesman"
                      component={() => (
                        <div className="error-message">{errors.salesman}</div>
                      )}
                    /> */}
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
                  <button type="submit" disabled={isSubmitting} class="submit-button">
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
