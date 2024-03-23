import { ErrorMessage, Field,Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import {
  FaArrowLeft,
  FaPaperPlane,
  FaSave,
} from 'react-icons/fa';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import CameraCapture from '../CameraCapture/CameraCapture';
import CameraCapture2 from '../CameraCapture/CameraCapture2';


// Configuración de react-modal
Modal.setAppElement('#root'); // Especifica dónde se renderizará el modal

function Firma() {
  const signatureCanvas = React.createRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTermsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firmaGuardada, setFirmaGuardada] = useState(false);



  useEffect(() => {
    let errorTimeout;
    if (submissionResult === 'error') {
      errorTimeout = setTimeout(() => {
        setSubmissionResult(null); 
      }, 2000);
    }
    return () => {
      clearTimeout(errorTimeout);
    };
  }, [submissionResult]);



  
  const clearSignature = () => {
    signatureCanvas.current.clear();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    closeModal(); 
  };

  return (
    <div className="container">
      <Formik
        initialValues={{
          signature: null,
        }}
        validate={(values) => {
          let errors = {};
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
         
        }}
      >
        {({ isSubmitting, values, errors, setFieldValue }) => (
          <div className="formDiv">
        
            
                
              {(
                <div className="divInvoice">
                  <h2 className="tittle">Documentacion</h2>
                  <div className="form-group">
                    <div>
                      <label htmlFor="salesman" className="label-invoice">
                        Vendedor:
                      </label>
                    </div>
                    <div className="div10">
                      <Field
                        type="text"
                        id="salesman"
                        name="salesman"
                        placeholder=""
                        className="labelInputContra"
                      />
                    </div>
                  </div>
                  <p>
                    <ErrorMessage
                      name="salesman"
                      component={() => (
                        <div className="error-message-invoice">
                          {errors.salesman}
                        </div>
                      )}
                    />
                  </p>
                  <p className="label-invoice">
                    {' '}
                    Captura imagen documento cara 1
                  </p>
                  <div className="form-group-img">
                    <div className="label-invoice">
                      <CameraCapture setFieldValue={setFieldValue} />
                    </div>
                  </div>
                  <p className="label-invoice">
                    Captura imagen documento cara 2
                  </p>
                  <div className="form-group-img">
                    <div className="label-invoice">
                      <CameraCapture2 setFieldValue={setFieldValue} />
                    </div>
                  </div>

                  <div className="form-group-firma">
                    <label className="label-invoice-firma">Firma</label>
                    <SignatureCanvas
                      ref={signatureCanvas}
                      penColor="black"
                      canvasProps={{
                        width: 400,
                        height: 200,
                        className: 'signature-canvas',
                      }}
                    />
                  </div>
                  <div class="button-container-firma">
                    <button
                      type="button"
                      disabled={firmaGuardada}
                      onClick={async () => {
                        const signatureImage =   // coincide (base)
                          signatureCanvas.current.toDataURL();
                        const data = new FormData();
                        data.append('file', signatureImage);
                        data.append('upload_preset', 'FHANRED');
                        setLoading(true);

                        try {
                          // Obtenemos la URL de la imagen de la respuesta de Cloudinary
                          const response = await fetch(
                            'https://api.cloudinary.com/v1_1/dwejoiefk/image/upload',
                            {
                              method: 'POST',
                              body: data,
                            }
                          );
                          const file = await response.json();

                          // Obtenemos la URL de la imagen
                          const imageURL = file.secure_url; // sería SignatureImage si coincide con base64
                          // Actualiza el valor del campo "signature" en Formik con la URL
                          setFieldValue('signature', imageURL);
                          setFirmaGuardada(true);
                        } catch (error) {
                          // Manejar el error, por ejemplo, mostrar un mensaje de error
                        } finally {
                          setLoading(false);
                        }
                      }}
                    >
                      <FaSave /> Guardar Firma
                    </button>

                    <button
                      type="button"
                      onClick={clearSignature}
                      disabled={firmaGuardada}
                    >
                      Borrar Firma
                    </button>
                    {loading ? (
                      <h1>Cargando firma documento...</h1>
                    ) : (
                      <h1>{''}</h1>
                    )}
                    {firmaGuardada && <p>Firma guardada con exito.</p>}
                  </div>

                  <p>
                    <ErrorMessage
                      name="signature"
                      component={() => (
                        <div className="error-message">{errors.signature}</div>
                      )}
                    />
                  </p>
                  <div className="form-group-cont">
                    <button type="button" onClick={openModal}>
                      Ver Términos y Condiciones
                    </button>
                    {/* Modal de Términos y Condiciones */}
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={closeModal}
                      contentLabel="Términos y Condiciones"
                    >
                      <h2>Términos y Condiciones</h2>
                      <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                        {/* Aquí coloca tu contenido de términos y condiciones */}
                        {/* Puedes agregar un texto largo o componentes React según tus necesidades */}
                        <p>Tus términos y condiciones van aquí...</p>
                      </div>
                      <button type="button" onClick={handleAcceptTerms}>
                        Aceptar
                      </button>
                    </Modal>
                  </div>
                  <button
                    type="button"
                    className="previous-button"
                  >
                    <FaArrowLeft className="arrow" /> Anterior
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    Enviar Contrato <FaPaperPlane />
                  </button>
                </div>
              )}
              {submissionResult === 'success' && (
                <div className="message-container">
                  <div className="success">
                    El contrato se envio con exito!, el equipo de Fhanred se
                    pondra en contacto. !Gracias por preferirnos¡.
                  </div>
                </div>
              )}
              {submissionResult === 'error' && (
                <div className="message-container">
                  <div className="error">
                    'El contrato no se pudo enviar. Inténtelo nuevamente.'
                  </div>
                </div>
              )}
       
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Firma;
