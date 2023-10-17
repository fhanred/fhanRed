import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Invoice() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const previousStep = () => setStep(step - 1);
  return (
    <div>
      <Formik
      initialValues={{
            name: "",
            lastName: "",
            typeId: "",
            email: "",
            birthDate: new Date(),
            password: "",
            CompanyName: "",
            phone:"",
            idNum: "",
            n_contrato: 0,
            estrato: 0,
            zona: "",
            tipovivienda:"",
            dataMap: new Map(),
            payId:
          }}
          >
      </Formik>
    </div>
  )
}

export default Invoice

