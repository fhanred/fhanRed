import React from 'react'

export default function Billing() {
  return (
    <div>Billing</div>
  )
}

// import React, { useState } from 'react';
// import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import './Billing.css';
// import { useHistory } from 'react-router-dom';
// import { incrementNumberFact } from '../../../Redux/Actions/actions';
// import formatDateForForm from './formatDate';

// function Billing() {
//   const history = useHistory()
//   const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
//   const userRole = useSelector(state => state.authentication.user.id_role);
//   const dispatch = useDispatch();
//   const currentDate = new Date();
//   const numberFact = useSelector((state) => state.numberFact);
//   const [tissuedate, setTissuedate] = useState(formatDateForForm(currentDate));
  
//   if (!isAuthenticated || userRole !== 4) {
//     // Redireccionar a una página de acceso no autorizado
//     history.push('/home');
//     return null; // O mostrar un mensaje de error, etc.
//   }

//   return (
//     <div className="container-factura">
//       <Formik
//         initialValues={{
//           tissuedate: tissuedate, // Establece la fecha actual en el formato del formulario, // Establece el valor inicial del campo tissuedate
//           wdocumenttype: '',
//           wDocumenttypecode: '',
//           wcurrency: '',
//           woperationtype: '',
//           sdocumentprefix: 'MERN',
//           sdocumentsuffix: numberFact,
//           wpaymentmeans: '',
//           spaymentmethod: '',
//           wbusinessregimen: '',
//           nlineextensionamount: 0,
//           ntaxexclusiveamount: 0,
//           ntaxinclusiveamount: 0,
//           sshowreconnection: 0,
//           npayableamount: 0,
//           wlegalorganizationtype: '',
//           stributaryidentificationkey: '',
//           stributaryidentificationname: '',
//           sfiscalresponsibilities: '',
//           sfiscalregime: '',
//           wdoctype: '',
//           sdocno: '',
//           spartyname: '',
//           sregistrationname: '',
//           selectronicmail: '',
//           stelephone: '',
//           wdepartmentcode: '50',
//           sprovincename: '',
//           saddressline1: '',
//           scountrycode: 'co',
//           sdepartmentname: 'Meta',
//           wprovincecode: '',
          
//           items: [
//             { sdescription: '', nquantity: 0, nunitprice: 0 },
//             { sdescription: '', nquantity: 0, nunitprice: 0 },
//             { sdescription: '', nquantity: 0, nunitprice: 0 },
//             { sdescription: '', nquantity: 0, nunitprice: 0 },
//             // Agrega más ítems si es necesario
//           ],
//         }}
//         validate={(values) => {}}
//         onSubmit={(values, { setSubmitting, resetForm }) => {
//           dispatch(incrementNumberFact());
//           resetForm();
//           console.log(values);
//         }}
//       >
//         {({ isSubmitting, values, errors, setFieldValue }) => (
//           <div>
//             <Form>
//               <div className="container-cabecera">
//                 <div className="left">
//                   <h2>Factura de venta - Nota Credito - Nota Debito</h2>
//                 </div>
//                 <div className="right">
//                   <h3>Número de Factura: {numberFact}</h3>
//                 </div>
//               </div>
//               <div>
//                 <div className="right">
//                   <h4>Prefijo facturación autorizado por la DIAN: MERN</h4>
//                 </div>
//               </div>

//               <div className="container-cabecera">
//                 <label htmlFor="tissuedate">Fecha de emisión</label>
//                 <Field
//                   type="text"
//                   name="tissuedate"
//                   id="tissuedate"
//                   onChange={(e) => setTissuedate(e.target.value)}
//                   disabled
//                 />
//               </div>
//               <p>
//                 <ErrorMessage
//                   name="tissuedate"
//                   component={() => (
//                     <div className="error-message">{errors.tissuedate}</div>
//                   )}
//                 />
//               </p>
//               <div className="form-group-container-fact">
//                 <div className="form-group-fact">
//                   <label htmlFor="wdocumenttype">Documento</label>
//                   <Field id="wdocumenttype" name="wdocumenttype" as="select">
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'Invoice'}>Factura</option>
//                     <option value={'CreditNote'}>Nota Crédito</option>
//                     <option value={'DebitNote'}>Nota Débito</option>
//                   </Field>
//                 </div>
//                 <p>
//                   <ErrorMessage
//                     name="wdocumenttype"
//                     component={() => (
//                       <div className="error-message">
//                         {errors.wdocumenttype}
//                       </div>
//                     )}
//                   />
//                 </p>

//                 <div className="form-group-fact">
//                   <label htmlFor="wDocumenttypecode">Código documento</label>
//                   <Field
//                     id="wDocumenttypecode"
//                     name="wDocumenttypecode"
//                     as="select"
//                   >
//                     <option value="none">Selecciona una opción</option>
//                     <option
//                       value="01"
//                       disabled={values.wdocumenttype !== 'Invoice'}
//                     >
//                       Factura electrónica de Venta -01
//                     </option>
//                     <option
//                       value="91"
//                       disabled={
//                         values.wdocumenttype === 'Invoice' ||
//                         values.wdocumenttype === 'DebitNote' ||
//                         values.wdocumenttype === ''
//                       }
//                     >
//                       Nota Crédito -91
//                     </option>
//                     <option
//                       value="92"
//                       disabled={
//                         values.wdocumenttype === 'Invoice' ||
//                         values.wdocumenttype === 'CreditNote' ||
//                         values.wdocumenttype === ''
//                       }
//                     >
//                       Nota Débito -92
//                     </option>
//                   </Field>
//                 </div>
//                 <p>
//                   <ErrorMessage
//                     name="wDocumenttypecode"
//                     component={() => (
//                       <div className="error-message">
//                         {errors.wDocumenttypecode}
//                       </div>
//                     )}
//                   />
//                 </p>

//                 <div className="form-group-fact">
//                   <label htmlFor="wcurrency">Moneda</label>
//                   <Field id="wcurrency" name="wcurrency" as="select">
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'COP'}>Pesos colombianos</option>
//                     <option value={'USD'}>Dolares</option>
//                     <option value={'EUR'}>Euros</option>
//                   </Field>
//                 </div>
//                 <p>
//                   <ErrorMessage
//                     name="wcurrency"
//                     component={() => (
//                       <div className="error-message">{errors.wcurrency}</div>
//                     )}
//                   />
//                 </p>
//                 <div className="form-group-fact">
//                   <label htmlFor="woperationtype">Operación</label>
//                   <Field id="woperationtype" name="woperationtype" as="select">
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option
//                       value={'10'}
//                       disabled={values.wdocumenttype !== 'Invoice'}
//                     >
//                       Factura estándar
//                     </option>
//                     <option
//                       value={'20'}
//                       disabled={
//                         values.wdocumenttype === 'Invoice' ||
//                         values.wdocumenttype === 'DebitNote' ||
//                         values.wdocumenttype === ''
//                       }
//                     >
//                       Nota Crédito que referencia una factura electrónica
//                     </option>
//                     <option
//                       value={'30'}
//                       disabled={
//                         values.wdocumenttype === 'Invoice' ||
//                         values.wdocumenttype === 'CreditNote' ||
//                         values.wdocumenttype === '' ||
//                         values.wdocumenttype === 'none'
//                       }
//                     >
//                       Nota Débito que referencia una factura electrónica
//                     </option>
//                     <option
//                       value={'22'}
//                       disabled={
//                         values.wdocumenttype === 'Invoice' ||
//                         values.wdocumenttype === 'DebitNote' ||
//                         values.wdocumenttype === '' ||
//                         values.wdocumenttype === 'none'
//                       }
//                     >
//                       Nota Crédito sin referencia a facturas
//                     </option>
//                     <option
//                       value={'32'}
//                       disabled={
//                         values.wdocumenttype === 'Invoice' ||
//                         values.wdocumenttype === 'CreditNote' ||
//                         values.wdocumenttype === '' ||
//                         values.wdocumenttype === 'none'
//                       }
//                     >
//                       Nota Débito sin referencia a facturas
//                     </option>
//                   </Field>
//                 </div>
//                 <p>
//                   <ErrorMessage
//                     name="woperationtype"
//                     component={() => (
//                       <div className="error-message">
//                         {errors.woperationtype}
//                       </div>
//                     )}
//                   />
//                 </p>
//               </div>

//               <div className="form-group-container-fact">
//                 <div className="form-group-fact">
//                   <label htmlFor="wpaymentmeans">Forma de pago</label>
//                   <Field id="wpaymentmeans" name="wpaymentmeans" as="select">
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'1'}>Contado</option>
//                     <option value={'2'}>Crédito</option>
//                   </Field>
//                 </div>
//                 <p>
//                   <ErrorMessage
//                     name="wpaymentmeans"
//                     component={() => (
//                       <div className="error-message">
//                         {errors.wpaymentmeans}
//                       </div>
//                     )}
//                   />
//                 </p>

//                 <div className="form-group-fact">
//                   <label htmlFor="spaymentmethod">Metodo de pago</label>
//                   {/* <Field id="spaymentmethod" name="spaymentmethod" as="select">
//                     {options.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </Field> */}
//                 </div>
//                 <p>
//                   <ErrorMessage
//                     name="spaymentmethod"
//                     component={() => (
//                       <div className="error-message">
//                         {errors.spaymentmethod}
//                       </div>
//                     )}
//                   />
//                 </p>

//                 <div className="form-group-fact">
//                   <label htmlFor="wbusinessregimen">Régimen fiscal</label>
//                   <Field
//                     id="wbusinessregimen"
//                     name="wbusinessregimen"
//                     as="select"
//                   >
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'1'}>Persona Jurídica</option>
//                     <option value={'2'}>Persona Natural</option>
//                   </Field>
//                 </div>
//                 <p>
//                   <ErrorMessage
//                     name="wbusinessregimen"
//                     component={() => (
//                       <div className="error-message">
//                         {errors.wbusinessregimen}
//                       </div>
//                     )}
//                   />
//                 </p>
//               </div>
//               <h4>Datos Suscriptor</h4>
//               <div className="form-group-container-fact">
//                 <div className="form-group-fact">
//                   <label htmlFor="wlegalorganizationtype">
//                     Tipo organización
//                   </label>
//                   <Field
//                     id="wlegalorganizationtype"
//                     name="wlegalorganizationtype"
//                     as="select"
//                   >
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'company'}>Empresa</option>
//                     <option value={'person'}>Persona</option>
//                   </Field>
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="stributaryidentificationkey">
//                     Código identificación tributaria
//                   </label>
//                   <Field
//                     id="stributaryidentificationkey"
//                     name="stributaryidentificationkey"
//                     as="select"
//                   >
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'01'}>01-IVA</option>
//                     <option value={'04'}>04-INC</option>
//                     <option value={'ZA'}>ZA-IVA e INC</option>
//                     <option value={'ZZ'}>ZZ-No Aplica</option>
//                   </Field>
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="stributaryidentificationname">
//                     Nombre identificación tributaria
//                   </label>
//                   <Field
//                     id="stributaryidentificationname"
//                     name="stributaryidentificationname"
//                     as="select"
//                   >
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'IVA'}>IVA</option>
//                     <option value={'INC'}>INC</option>
//                     <option value={'IVA e INC'}>IVA e INC</option>
//                     <option value={'No Aplica'}>No Aplica</option>
//                   </Field>
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="sfiscalresponsibilities">
//                     Responsabilidad fiscal
//                   </label>
//                   <Field
//                     id="sfiscalresponsibilities"
//                     name="sfiscalresponsibilities"
//                     as="select"
//                   >
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'O‐13'}>Gran contribuyente</option>
//                     <option value={'O-15'}>Autorretenedor</option>
//                     <option value={'O-23'}>Agente de retención</option>
//                     <option value={'O-47'}>
//                       Régimen simple de tributación
//                     </option>
//                     <option value={'R-99-PN'}>No Aplica - Otros</option>
//                   </Field>
//                 </div>
//                 <div className="form-group-fact">
//                   <label htmlFor="sfiscalregime">Regimen fiscal</label>
//                   <Field id="sfiscalregime" name="sfiscalregime" as="select">
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'48'}>Persona Natural</option>
//                     <option value={'49'}>Persona Jurídica</option>
//                   </Field>
//                 </div>
//               </div>
//               <div className="form-group-container-fact">
//                 <div className="form-group-fact">
//                   <label htmlFor="wdoctype">Tipo documento</label>
//                   <Field id="wdoctype" name="wdoctype" as="select">
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'NIT'}>Nit</option>
//                     <option value={'CC'}>Cedula de Ciudadanía </option>
//                     <option value={'CE'}>Cedula de extranjería </option>
//                     <option value={'PAS'}>Pasaporte</option>
//                     <option value={'FN'}>Nit del Extranjero</option>
//                     <option value={'RC'}>Registro Civil</option>
//                     <option value={'TI'}>Tarjeta de Identidad</option>
//                     <option value={'TE '}>Tarjeta de Extranjería</option>
//                     <option value={'PEP'}>
//                       Permiso especial de extranjero
//                     </option>
//                     <option value={'PPT ='}>
//                       Permiso de Protección temporal
//                     </option>
//                     <option value={'NUIP'}>NUIP</option>
//                   </Field>
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="sdocno">
//                     Número documento identificación
//                   </label>
//                   <Field type="text" name="sdocno" id="sdocno" />
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="spartyname">Nombre razón social</label>
//                   <Field type="text" name="spartyname" id="spartyname" />
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="sregistrationname">
//                     Nombres y Apellidos abonado
//                   </label>
//                   <Field
//                     type="text"
//                     name="sregistrationname"
//                     id="sregistrationname"
//                   />
//                 </div>
//               </div>

//               <div className="form-group-container-fact">
//                 <div className="form-group-fact">
//                   <label htmlFor="selectronicmail">Correo electrónico</label>
//                   <Field
//                     type="text"
//                     name="selectronicmail"
//                     id="selectronicmail"
//                   />
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="stelephone">Teléfono de contacto</label>
//                   <Field type="text" name="stelephone" id="stelephone" />
//                 </div>
//                 <div className="form-group-fact">
//                   <label htmlFor="saddressline1">Direccion</label>
//                   <Field type="text" name="saddressline1" id="saddressline1" />
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="sprovincename">Municipio</label>
//                   <Field id="sprovincename" name="sprovincename" as="select">
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'Restrepo'}>Restrepo</option>
//                     <option value={'Cumaral'}>Cumaral</option>
//                   </Field>
//                 </div>
//               </div>

//               <div className="form-group-container-fact">
//                 <div className="form-group-fact">
//                   <label htmlFor="sdepartmentname">Departamento</label>
//                   <Field
//                     type="text"
//                     name="sdepartmentname"
//                     id="sdepartmentname"
//                     disabled
//                   />
//                 </div>
//                 <div className="form-group-fact">
//                   <label htmlFor="wdepartmentcode">Código departamento</label>
//                   <Field
//                     type="text"
//                     name="wdepartmentcode"
//                     id="wdepartmentcode"
//                     disabled
//                   />
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="wprovincecode">Código Municipio</label>
//                   <Field id="wprovincecode" name="wprovincecode" as="select">
//                     <option value={'none'}>Selecciona una opción</option>
//                     <option value={'50606'}>Restrepo -50606</option>
//                     <option value={'50226'}>Cumaral -50226</option>
//                   </Field>
//                 </div>

//                 <div className="form-group-fact">
//                   <label htmlFor="scountrycode">Código del país</label>
//                   <Field
//                     type="text"
//                     name="scountrycode"
//                     id="scountrycode"
//                     disabled
//                   />
//                 </div>
//               </div>
//               <h4>Detalle facturación servicio</h4>
//               <div className="form-group-container-fact">
//                 <div className="form-group-fact">
                  
//                 </div>
//               </div>

//               <h4>Descripción items</h4>

//               <FieldArray name="items">
//                 {({ push, remove }) => (
//                   <div>
//                     {values.items.map((item, index) => (
//                       <div className="form-group-container-fact" key={index}>
//                         <div>
//                           <label>Descripción del ítem:</label>
//                           <Field
//                             as="select"
//                             name={`items[${index}].sdescription`}
//                           >
//                             {/* <option value="">Selecciona una opción</option>
//                             {plan.map((option) => (
//                               <option key={option.value} value={option.value}>
//                                 {option.label}
//                               </option> */}
//                             ))}
//                             <option value="other">
//                               Otro (Escribe tu descripción)
//                             </option>
//                           </Field>

//                           {values.items[index].sdescription === 'other' && (
//                             <input
//                               type="text"
//                               value={values.items[index].customDescription}
//                               onChange={(e) => {
//                                 const customDescription = e.target.value;
//                                 setFieldValue(
//                                   `items[${index}].customDescription`,
//                                   customDescription
//                                 );
//                               }}
//                             />
//                           )}
//                         </div>
//                         <div>
//                           <label>Cantidad:</label>
//                           <Field
//                             type="number"
//                             name={`items[${index}].nquantity`}
//                           />
//                         </div>
//                         <div>
//                           <label>Precio unitario:</label>
//                           <Field
//                             type="number"
//                             name={`items[${index}].nunitprice`}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldArray>
//               <div className="form-group-container-fact">
//                 <div className="form-group-fact">
//                   <label htmlFor="nlineextensionamount">
//                     Valor Bruto antes de IVA:
//                   </label>
//                   <Field
//                     type="number"
//                     name="nlineextensionamount"
//                     value={values.nlineextensionamount}
//                     disabled
//                   />
//                 </div>
//                 <p>
//                   <ErrorMessage
//                     name="nlineextensionamount"
//                     component={() => (
//                       <div className="error-message">
//                         {errors.nlineextensionamount}
//                       </div>
//                     )}
//                   />
//                 </p>

//                 <div className="form-group-fact">
//                   <label htmlFor="ntaxexclusiveamount">Total Valor IVA:</label>
//                   <Field
//                     type="number"
//                     id="ntaxexclusiveamount"
//                     name="ntaxexclusiveamount"
//                     value={values.ntaxexclusiveamount}
//                     disabled
//                   />
//                 </div>

//                 <p>
//                   <ErrorMessage
//                     name="wbusinessregimen"
//                     component={() => (
//                       <div className="error-message">
//                         {errors.wbusinessregimen}
//                       </div>
//                     )}
//                   />
//                 </p>

//                 <div className="form-group-fact">
//                   <label htmlFor="ntaxinclusiveamount">Total factura :</label>
//                   <Field
//                     type="number"
//                     id="ntaxinclusiveamount"
//                     name="ntaxinclusiveamount"
//                     value={values.ntaxinclusiveamount}
//                     disabled
//                   />
//                 </div>
//                 <p>
//                   <ErrorMessage
//                     name="ntaxinclusiveamount"
//                     component={() => (
//                       <div className="error-message">
//                         {errors.ntaxinclusiveamount}
//                       </div>
//                     )}
//                   />
//                 </p>
//               </div>
//               <div className="form-group-container-fact">
//                 <div className="form-group-fact">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const newNlineextensionamount = values.items.reduce(
//                         (total, item) =>
//                           total + item.nquantity * item.nunitprice,
//                         0
//                       );

//                       setFieldValue(
//                         'nlineextensionamount',
//                         newNlineextensionamount
//                       );
//                     }}
//                   >
//                     Calcular total valor bruto
//                   </button>
//                 </div>
//                 <div className="form-group-fact">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       // Función para calcular el IVA y actualizar ntaxexclusiveamount
//                       const newNtaxexclusiveamount = values.items.reduce(
//                         (total, item) =>
//                           total + item.nquantity * item.nunitprice * 0.19,
//                         0
//                       );
//                       // Actualiza ntaxexclusiveamount con setFieldValue
//                       setFieldValue(
//                         'ntaxexclusiveamount',
//                         newNtaxexclusiveamount
//                       );
//                     }}
//                   >
//                     Calcular IVA
//                   </button>
//                 </div>
//                 <div className="form-group-fact">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       // Función para calcular el valor total de la factura
//                       const newNtaxinclusiveamount =
//                         values.nlineextensionamount +
//                         values.ntaxexclusiveamount;
//                       setFieldValue(
//                         'ntaxinclusiveamount',
//                         newNtaxinclusiveamount
//                       );
//                     }}
//                   >
//                     Calcular Valor Total de Factura
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <button type="submit" disabled={isSubmitting}>
//                   Generar factura
//                 </button>
//               </div>
//             </Form>
//           </div>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default Billing;