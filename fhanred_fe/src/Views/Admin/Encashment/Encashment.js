import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, ResetForm } from "formik";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import * as Yup from "yup";
import { format } from "date-fns";
import BASE_URL from "../../../Config"

import {
  fetchContractDetails,
  fetchUserContracts,
  getUsers,
  fetchLastReceiptNumber
} from "../../../Redux/Actions/actions";

function Encashment() {
  //const userRole = useSelector((state) => state.auth.user.role); // descomentar luego de aplicar auth
  //const userName = useSelector((state) => state.auth.user.name);
  const dispatch = useDispatch();
  const lastReceiptNumber = useSelector((state) => state.lastReceiptNumber);
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState(null);
  const [showIncome, setShowIncome] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [userContracts, setUserContracts] = useState([]);
  const [name_razonSocial, setNameRazonSocial] = useState("");
 
 


  const initialValues = {
    receipt: lastReceiptNumber !== null ? lastReceiptNumber.toString() : "1", // Valor predeterminado como "1" si lastReceiptNumber es null
    contract: "",
    paymentDate: format(new Date(), "yyyy-MM-dd"),
    paymentTime: format(new Date(), "HH:mm"),
    n_documento: "",
    username: "",
    municipio: "",
    direccion: "", 
    importe: "",
    description: "",
    paymentMethod: "",
    cashierName: "", //una vez implementado auth  userRole === 2 || userRole === 3 ? userName : ""
  };
  console.log(lastReceiptNumber)

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
    cashierName: Yup.string().required("Este campo es obligatorio"),
  });

  useEffect(() => {
    // Obtener el último número de recibo al montar el formulario
    dispatch(fetchLastReceiptNumber());
  }, [dispatch]);

  // useEffect(() => {
  //   // Verificar el rol del usuario al cargar el componente
  //   if (userRole !== 2 && userRole !== 3) {
  //     // Si el usuario no tiene el rol adecuado, redirigir a otra página o mostrar un mensaje de error
  //     history.push("/home"); // Por ejemplo, redirigir a una página de acceso no autorizado
  //   }
  // }, [userRole, history]);

  
  const handleDocumentChange = async (e, formikProps) => {
    try {
      const { value } = e.target;
      formikProps.handleChange(e);
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
    console.log("Valor seleccionado del contrato:", value);
    
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
      // Hacer la solicitud HTTP POST al backend
      const response = await axios.post(`${BASE_URL}/caja`, values);
      // Manejar la respuesta del backend según sea necesario
      console.log("Respuesta del backend:", response.data);
      // Actualizar el estado de Redux con el nuevo número de recibo
      dispatch(fetchLastReceiptNumber());
      setShowPDF(true);
      // Resetear el formulario después de enviar el pago
      resetForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
    // Marcar el formulario como no enviado
    setSubmitting(false);
};


  
  const handleShowIncome = () => {
    // Tu lógica para manejar la visualización de ingresos
  };
  return (
    <div className="container">
      {selectedOption ? null : <h2>Seleccione el tipo de movimiento:</h2>}
      {!selectedOption && (
        <>
          <button onClick={() => setSelectedOption("Ingreso")}>Ingresos</button>
          <button onClick={() => setSelectedOption("Egreso")}>Egresos</button>
        </>
      )}
      {selectedOption && (
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
              <Field type="text" id="receipt" name="receipt" />
              <ErrorMessage name="receipt" component="div" className="error-message" />
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
                        // Llama al manejador para el cambio en el contrato seleccionado
                        handleContractChange(e, formikProps);
                      }}
                    >
                      <option value="">Seleccione Contrato</option>
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
                      value={name_razonSocial || ""} // Cambiar a name_razonSocial
                      readOnly
                    />
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
                {showPDF && (
                  <PDFDownloadLink
                    document={
                      <Document>
                        <Page>
                          <Text>Detalles del Pago:</Text>
                          <Text>
                            Número de Recibo: {formikProps.values.receipt}
                          </Text>
                          <Text>Importe: {formikProps.values.importe}</Text>
                          <Text>contract: {formikProps.values.contract}</Text>
                          <Text>
                            paymentDate: {formikProps.values.paymentDate}
                          </Text>
                          <Text>
                            paymentTime: {formikProps.values.paymentTime}
                          </Text>
                          <Text>username: {formikProps.values.username}</Text>
                          <Text>importe: {formikProps.values.importe}</Text>
                          <Text>
                            description: {formikProps.values.description}
                          </Text>
                          <Text>
                            paymentMethod: {formikProps.values.paymentMethod}
                          </Text>
                        </Page>
                      </Document>
                    }
                    fileName="recibo_pago.pdf"
                  >
                   {({ loading }) => (
            <button
              onClick={() => {
                if (!loading) {
                  setShowPDF(false);
                }
              }}
            >
              {loading ? "Generando PDF..." : "Descargar PDF"}
            </button>
          )}
        </PDFDownloadLink>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
      {!selectedOption && !showIncome && (
        <button onClick={handleShowIncome}>Ver Movimientos de Ingresos</button>
      )}
      {showIncome && (
        <div className="ingresos-section">
          {/* <IncomeList ingresos={income} /> */}
        </div>
      )}
    </div>
  );
}

export default Encashment;
