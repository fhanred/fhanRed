import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Invoice() {
  const dispatch = useDispatch();
  const navegate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          lastName: '',
          typeId: '' /*tipo documento identificacion*/,
          typePerson: '',
          email: '',
          Order_date: new Date(),
          birthDate: new Date(),
          CompanyName: '',
          phone1: '',
          phone2: '',
          phone3: '',
          Product_name: '' /*plan*/,
          n_invoice: 0 /*numero contrato*/,
          boxNAP: "",
          idStratus: '',
          idZone: '',
          idTypeHouse: '',
          dataMap: new Map(),
          payId: '' /*forma de pago*/,
          fact_email: '',
          startDate: new Date(),
          cutoffDate: new Date(),
          idLastPayment: '',
          salesman: '',
          trademarkONU: '',
          idStatusByEmail: '',
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
          if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.fact_email
            )
          ) {
            errors.fact_email = 'El correo no es valido';
          }
          if (!values.Order_date) {
            errors.Order_date =
              'Por favor ingrese una fecha formato dd/MM/yyyy';
          } else if (
            !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
              values.Order_date
            )
          ) {
            errors.Order_date = 'formato de fecha no valido';
          }
          if (!values.birthDate) {
            errors.birthDate = 'Por favor ingrese una fecha formato dd/MM/yyyy';
          } else if (
            !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
              values.birthDate
            )
          ) {
            errors.birthDate = 'formato de fecha no valido';
          }
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
          if (!values.startDate) {
            errors.startDate = 'Por favor ingrese una fecha formato dd/MM/yyyy';
          } else if (
            !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
              values.startDate
            )
          ) {
            errors.startDate = 'formato de fecha no valido';
          }
          if (!values.cutoffDate) {
            errors.cutoffDate =
              'Por favor ingrese una fecha formato dd/MM/yyyy';
          } else if (
            !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
              values.cutoffDate
            )
          ) {
            errors.cutoffDate = 'formato de fecha no valido';
          }
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
          if (step === 3) {
            dispatch(createInvoice(values));

            setIsSent(true);
            setSubmitting(false);
            resetForm();
            navegate('/admin/datosClientes');
          } else {
            nextStep();
          }
        }}
      >
        {({ isSubmitting, errors, setFieldValue }) => (
          <div>
            <Form>
              {step === 1 && (
                <div>
                  <h2>Datos Personales</h2>
                  <div>
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
                        <div className={styles.error}>{errors.Order_date}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="name">Nombre:</label>
                    <Field type="text" id="name" name="name" placeholder="" />
                    <ErrorMessage
                      name="name"
                      component={() => (
                        <div className={styles.error}>{errors.name}</div>
                      )}
                    />
                  </div>
                  <div>
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
                        <div className={styles.error}>{errors.lastName}</div>
                      )}
                    />
                  </div>
                  <div>
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
                        <div className={styles.error}>{errors.typeId}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="typePerson">Tipo de Persona:</label>
                    <Field id="typePerson" name="typePerson" as="select">
                      <option value={0}></option>
                      <option value={1}>Jurídica</option>
                      <option value={2}>Natural</option>
                    </Field>
                    <ErrorMessage
                      name="typePerson"
                      component={() => (
                        <div className={styles.error}>{errors.typePerson}</div>
                      )}
                    />
                  </div>
                  <div>
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
                        <div className={styles.error}>{errors.email}</div>
                      )}
                    />
                  </div>
                  <div>
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
                    <ErrorMessage
                      name="birthDate"
                      component={() => (
                        <div className={styles.error}>{errors.birthDate}</div>
                      )}
                    />
                  </div>
                  
                  <div>
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
                        <div className={styles.error}>{errors.CompanyName}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone1">Teléfono de Contacto:</label>
                    <Field
                      type="tel"
                      id="phone1"
                      name="phone1"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="phone1"
                      component={() => (
                        <div className={styles.error}>{errors.phone1}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone2">Teléfono de contacto:</label>
                    <Field
                      type="tel"
                      id="phone2"
                      name="phone2"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="phone2"
                      component={() => (
                        <div className={styles.error}>{errors.phone2}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone3">Teléfono de contacto:</label>
                    <Field
                      type="tel"
                      id="phone3"
                      name="phone3"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="phone3"
                      component={() => (
                        <div className={styles.error}>{errors.phone3}</div>
                      )}
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2>Datos Plan </h2>
                  <div>
                    <label htmlFor="Product_name">Plan:</label>
                    <Field
                      type="text"
                      id="Product_name"
                      name="Product_name"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="Product_name"
                      component={() => (
                        <div className={styles.error}>
                          {errors.Product_name}
                        </div>
                      )}
                    />
                  </div>
                  <div>
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
                        <div className={styles.error}>{errors.n_invoice}</div>
                      )}
                    />
                  </div>
                  <div>
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
                        <div className={styles.error}>{errors.idStratus}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="idZone">Zona:</label>
                    <Field id="idZone" name="idZone" as="select">
                      <option value={0}></option>
                      <option value={1}>Urbana</option>
                      <option value={2}>Rural</option>
                    </Field>
                    <ErrorMessage
                      name="idZone"
                      component={() => (
                        <div className={styles.error}>{errors.idZone}</div>
                      )}
                    />
                  </div>
                  <div>
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
                        <div className={styles.error}>{errors.idTypeHouse}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="payId">Forma de Pago:</label>
                    <Field id="payId" name="payId" as="select">
                      <option value={0}></option>
                      <option value={1}>Contado</option>
                      <option value={2}>Credito</option>
                    </Field>
                    <ErrorMessage
                      name="idTypeHouse"
                      component={() => (
                        <div className={styles.error}>{errors.payId}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label>Correo Electrónico envio factura::</label>
                    <Field
                      name="toggleField"
                      render={({ field }) => (
                        <ToggleButton
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">
                      Correo Electrónico envio factura:
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="email"
                      component={() => (
                        <div className={styles.error}>{errors.email}</div>
                      )}
                    />
                  </div>
                  <div>
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
                        <div className={styles.error}>{errors.startDate}</div>
                      )}
                    />
                  </div>
                  <div>
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
                        <div className={styles.error}>{errors.cutoffDate}</div>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="idLastPayment">Fecha de corte:</label>
                    <Field id="idLastPayment" name="idLastPayment">
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
                        <div className={styles.error}>
                          {errors.idLastPayment}
                        </div>
                      )}
                    />
                  </div>
                  <div>
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
                        <div className={styles.error}>{errors.salesman}</div>
                      )}
                    />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2>Equipos</h2>
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
