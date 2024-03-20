import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";


function TechnicalDetailsStep({ nextStep }) {
//     const [currentDate, setCurrentDate] = useState("");
  

//     // const isFormValid = () => {
//     //     return (
//     //         // currentDate !== "" &&
//     //     )
//     //   };


//   return ( <div className="container">
//   <Formik
//     initialValues={{
//       tipo_persona: tipoPersona,
//       razonSocial: razonSocial,
//       tipo_documento: tipoDocumento,
//       sexo: sexo,
//       n_documento: nDocumento,
//       fecha_cumple: fechaCumple,
//       email: email,
//       telefono1: telefono1,
//       telefono2: telefono2,
//       telefono3: telefono3,
//     }}
//     validate={(values) => {
//       const errors = {};
//       if (!isFormValid(values)) {
//         errors._form = "Por favor complete todos los campos requeridos.";
//       }
//       return errors;
//     }}
//     enableReinitialize={true}
//     onSubmit={(values, { setSubmitting }) => {
//       console.log("Valores del formulario:", values);
//       setSubmitting(false);
//     }}
//   >
//     {({ isSubmitting }) => (
//       <div className="formDiv">
//         <Form>
//           <Field
//             type="text"
//             name="currentDate"
//             value={currentDate}
//             readOnly
//           />
//           <div>
//             Nombre y Apellido
//             <Field type="text" name="razonSocial" />
//           </div>
//           <div>
//             <Field type="text" name="tipo_persona" />
//           </div>     
//           <Field type="text" name="tipo_documento" />
//           <div> 
//           Sexo
//           <Field type="text" name="sexo" /></div>
//           <div>
//           Nº Documento
//           <Field type="text" name="n_documento" /></div> 
//           <div> 
//           Fecha Nacimiento
//           <Field type="text" name="fecha_cumple" /></div>
//           <div>
//           Email
//           <Field type="text" name="email" /></div> 

//           <div>
//             Teléfono de contacto 1:
//             <Field type="text" name="telefono1" />
//           </div>
//           <div>
//             Teléfono de contacto 2:
//             <Field type="text" name="telefono2" />
//           </div>
//           <div>
//             Teléfono de contacto 3:
//             <Field type="text" name="telefono3" />
//           </div>
//           <button type="submit" disabled={isSubmitting}>
//             Confirmar Datos
//           </button>
//         </Form>
//       </div>
//     )}
//   </Formik>
// </div>
// );
// }
}

export default TechnicalDetailsStep;