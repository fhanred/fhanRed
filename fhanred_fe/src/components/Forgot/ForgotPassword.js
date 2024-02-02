import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const history = useHistory();
  const [isSent, setIsSent] = useState(false);
  return (
    <div>
      <Formik
        initialValues={{
          email: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email =
              'Por favor proporcione la información necesaria para restablecer su contraseña.';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // const { data } = await axios.post(`password/forgot`, values);
          console.log(values);
          setIsSent(true);
          setSubmitting(false);
          resetForm();
          history.push('/');
        }}
      >
        {({ isSubmitting, errors }) => (
          <div className={style.Forgotcontainer}>
            
              <Form className={style.Forgotform}>
                <label htmlFor="email">
                  Necesitamos su dirección de correo electrónico para recuperar
                  su contraseña .{' '}
                </label>
                <br />
                <Field type="text" name="email" />

                <ErrorMessage
                  name="email"
                  component={() => (
                    <div className="error-message">{errors.email}</div>
                  )}
                />

                <br />
                <button className={style.red} type="submit" disabled={isSubmitting}>
                  Enviar
                </button>
                {isSent && <p className={style.exito}>Enviamos un mensaje a su correo </p>}
              </Form>
            
          </div>
        )}
      </Formik>
    </div>
  );
};
export default ForgotPassword;
