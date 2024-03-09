import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import * as Yup from "yup";
import { format } from "date-fns";
import BASE_URL from "../../../Config";
import './Encashment.css';

import {
  fetchContractDetails,
  fetchUserContracts,
  fetchLastReceiptNumber,
  sendPayment, addReceipt
} from "../../../Redux/Actions/actions";

function Encashment() {
  const userRole = useSelector((state) => state.authentication.user.id_role);
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const userName = useSelector(
    (state) => state.authentication.user.razon_social
  );

  console.log('Valor de userName:', userName); // Agregar este console.log
  const dispatch = useDispatch();
  const lastReceiptNumber = useSelector((state) => state.lastReceiptNumber);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPDF, setShowPDF] = useState(false);
  const [userContracts, setUserContracts] = useState([]);
  const [name_razonSocial, setNameRazonSocial] = useState("");
  const [response, setResponse] = useState("");

  const initialValues = {
    receipt: lastReceiptNumber !== null ? lastReceiptNumber.toString() : "1",
    paymentDate: format(new Date(), "yyyy-MM-dd"),
    paymentTime: format(new Date(), "HH:mm"),
    n_documento: "",
    username: "",
    municipio: "",
    direccion: "",
    importe: "",
    description: "",
    paymentMethod: "",
    cashierName: userRole === 2 || userRole === 3 ? userName : ""
  };

  const validationSchema = Yup.object().shape({
    contract: Yup.string().required("Este campo es obligatorio"),
    paymentDate: Yup.date().required("Este campo es obligatorio"),
    paymentTime: Yup.string().required("Este campo es obligatorio"),
    username: Yup.string().required("Este campo es obligatorio"),
    municipio: Yup.string().required("Este campo es obligatorio"),
    direccion: Yup.string().required("Este campo es obligatorio"),
    n_documento: Yup.string().required("Este campo es obligatorio"),
    importe: Yup.number().required("Este campo es obligatorio"),
    description: Yup.string().required("Este campo es obligatorio"),
    paymentMethod: Yup.string().required("Selecciona una Opción"),
  
  });

  useEffect(() => {
    if (
      !isAuthenticated ||
      (userRole !== 2 && userRole !== 3 && userRole !== 4)
    ) {
      history.push("/home");
    }
  }, [isAuthenticated, userRole, history]);

  useEffect(() => {
    dispatch(fetchLastReceiptNumber());
  }, [dispatch]);

  const handleDocumentChange = async (e, formikProps) => {
    try {
      const { value } = e.target;
      formikProps.handleChange(e);

      setUserContracts([]);

      const { contracts, name_razonSocial } = await fetchUserContracts(value);
      setUserContracts(contracts);
      formikProps.setFieldValue("username", name_razonSocial);
      setNameRazonSocial(name_razonSocial);
      console.log("name_razonSocial actualizado:", name_razonSocial);
    } catch (error) {
      console.error("Error al obtener los contratos del usuario:", error);
    }
  };
  const handleContractChange = async (e, formikProps) => {
    const { value } = e.target;

    formikProps.setFieldValue("contract", value);
    try {
      const contractDetails = await fetchContractDetails(value);
      console.log("Detalles del contrato seleccionado:", contractDetails);

      formikProps.setFieldValue("description", contractDetails.Plan.name_plan);
      const importeString = contractDetails.Plan.costo
        .replace(/\./g, "")
        .replace(",", ".");
      const importe = parseFloat(importeString);
      formikProps.setFieldValue("importe", importe);

      formikProps.setFieldValue("municipio", contractDetails.municipio);
      formikProps.setFieldValue("direccion", contractDetails.direccion);
    } catch (error) {
      console.error("Error al obtener los detalles del contrato:", error);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      values.cashierName = userName;
      const response = await axios.post(`${BASE_URL}/caja`, values);
      const newIngreso = response.data.data.newIngreso;
      console.log("Valor de newIngreso:", newIngreso);
  
      if (newIngreso) {
        console.log("estoy acá");
        setResponse(newIngreso);
        dispatch(fetchLastReceiptNumber());
        setShowPDF(true);
        resetForm();
  
        // Llamar a addReceipt con los datos del recibo
        dispatch(addReceipt({
          receipt: newIngreso.receipt,
          paymentDate: newIngreso.paymentDate,
          paymentTime: newIngreso.paymentTime,
          n_documento: newIngreso.n_documento,
          username: newIngreso.username,
          importe: newIngreso.importe,
          description: newIngreso.description,
          paymentMethod: newIngreso.paymentMethod,
          cashierName: newIngreso.cashierName,
          contract: newIngreso.contract,
          
        }));
      } else {
        console.error(
          "No se encontró 'newIngreso' en la respuesta del backend."
        );
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
    setSubmitting(false);
  };
  console.log('Valor de initialValues.cashierName antes de pasar como prop:', initialValues.cashierName);
  return (
    <div className="container">
      {userRole !== 1 && (
        <>
          {selectedOption ? null : <h2>Seleccione el tipo de movimiento:</h2>}
          {!selectedOption && (
            <>
              <button onClick={() => setSelectedOption("Ingreso")}>
                Ingresos
              </button>

              <button onClick={() => history.push("/movements")}>
                Cierre de Caja
              </button>
            </>
          )}
        </>
      )}
      {selectedOption && userRole !== 1 && (
        <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              {selectedOption === "Ingreso" && (
                <>
                  <div className="input">
                    <label htmlFor="receipt">Número de Recibo:</label>

                    <Field
                      type="text"
                      id="receipt"
                      name="receipt"
                      value={lastReceiptNumber}
                    />
                    <ErrorMessage
                      name="receipt"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="paymentDate">Fecha de Pago:</label>
                    <Field
                      type="date"
                      id="paymentDate"
                      name="paymentDate"
                      placeholder="Fecha de Pago"
                    />
                    <ErrorMessage
                      name="paymentDate"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <label htmlFor="paymentTime">Hora de Pago:</label>
                    <Field
                      type="time"
                      id="paymentTime"
                      name="paymentTime"
                      placeholder="Hora de Pago"
                    />
                    <ErrorMessage
                      name="paymentTime"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <Field
                      type="text"
                      id="n_documento"
                      name="n_documento"
                      placeholder="Numero de documento"
                      onChange={(e) => handleDocumentChange(e, formikProps)}
                    />
                    <ErrorMessage
                      name="n_documento"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <Field
                      as="select"
                      id="contract"
                      name="contract"
                      onChange={(e) => {
                        handleContractChange(e, formikProps);
                      }}
                      style={{
                        // Estilos para el select
                        padding: '8px',
                        marginBottom: 10,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor: '#ebecf0',
                        fontSize: '16px',
                        width: '25%',
                        boxSizing: 'border-box',
                        fontFamily: 'sans-serif' ,
                      }}
                    >
                      <option value="">Aplica a:</option>
                      {userContracts?.map((contract) => (
                        <option
                          key={contract.n_contrato}
                          value={contract.n_contrato}
                        >
                          {`${contract.n_contrato} - ${contract.name_plan}`}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="input">
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Nombre de Usuario"
                      value={name_razonSocial || ""}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => history.push("/resumen")}
                    >
                      Ver Resumen
                    </button>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <Field
                      type="text"
                      id="municipio"
                      name="municipio"
                      placeholder="Municipio"
                      value={formikProps.values.municipio}
                      readOnly
                    />
                    <ErrorMessage
                      name="municipio"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <Field
                      type="text"
                      id="direccion"
                      name="direccion"
                      placeholder="Direccion"
                      value={formikProps.values.direccion}
                      readOnly
                    />
                    <ErrorMessage
                      name="direccion"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <Field
                      type="text"
                      id="importe"
                      name="importe"
                      placeholder="Importe"
                    />
                    <ErrorMessage
                      name="importe"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Ingrese tipo de venta ej. Instalacion Cable"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <Field
                      as="select"
                      id="paymentMethod"
                      name="paymentMethod"
                      placeholder="Ingrese Método de Pago"
                      style={{
                        // Estilos para el select
                        padding: '8px',
                        marginBottom: 10,
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor: '#ebecf0',
                        fontSize: '16px',
                        width: '35%',
                        boxSizing: 'border-box',
                        fontFamily: 'sans-serif' ,
                      }}
                    >
                      <option value="" label="Seleccionar Método de Pago" />
                      <option
                        value="Davivienda"
                        label="PSE - Davivienda"
                      />{" "}
                      <option
                        value="corresponsalBancario"
                        label="CorresponsalBancario"
                      />
                      <option value="efectivo" label="Efectivo" />
                    </Field>
                    <ErrorMessage
                      name="paymentMethod"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="input">
                    <Field
                      type="text"
                      id="cashierName"
                      name="cashierName"
                      placeholder="Tu Nombre"
                      value={userName}
                      readOnly
                    />
                    <ErrorMessage
                      name="cashierName"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </>
              )}
              <div className="submit-button">
                <button type="submit">Enviar Pago</button>
                <button onClick={() => history.push("/movements")}>
                Cierre de Caja
              </button>
                {showPDF && (
                  <PDFDownloadLink
                    document={
                      <Document>
                        <Page>
                          <Text>Detalles del Pago:</Text>
                          <Text>
                            Número de Recibo: {response && response.receipt}
                          </Text>
                          <Text>
                            Fecha de Pago: {response && response.paymentDate}
                          </Text>
                          <Text>Usuario: {response && response.username}</Text>
                          <Text>Importe: {response && response.importe}</Text>
                          <Text>
                            Descripción: {response && response.description}
                          </Text>
                          <Text>
                            Método de Pago: {response && response.paymentMethod}
                          </Text>
                          <Text>
                            Cajero: {response && response.cashierName}
                          </Text>
                          <Text>Contrato: {response && response.contract}</Text>
                        </Page>
                      </Document>
                    }
                    fileName="recibo_pago.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                    <button type="button">

                        {loading ? "Generando PDF..." : "Descargar PDF"}
                      </button>
                    }
                  </PDFDownloadLink>
                )}
              </div>
            </Form>
          )}
        </Formik>
        </>
      )}
    </div>
  );
}

export default Encashment;
