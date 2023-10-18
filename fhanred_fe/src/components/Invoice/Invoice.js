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
          email: '',
          Order_date: new Date(),
          birthDate: new Date(),
          CompanyName: '',
          phone: '',
          idNum: '' /*plan*/,
          n_invoice: 0 /*numero contrato*/,
          idStratus: '',
          idZone: '',
          idTypeHouse: '',
          dataMap: new Map(),
          payId: '' /*forma de pago*/,
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
          if (!values.email) {
            errors.email = 'Por favor ingrese un correo electronico';
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = 'El correo no es valido';
          }
          if (!values.Order_date) {
            errors.Order_date =
              'Por favor ingrese una fecha formato dd/MM/yyyy';
          } else if (
            !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
              values.Order_date
            )
          ) {
            errors.Order_datee = 'formato de fecha no valido';
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
          if (!values.phone) {
            errors.phone = 'Por favor ingrese un número de celular';
          } else if (!/^[0-9]{10}$/.test(values.phone)) {
            errors.phone = 'Por favor ingrese un número valido';
          }
          if (values.idNum === 0) {
            errors.idNum = 'Dato requerido';
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
