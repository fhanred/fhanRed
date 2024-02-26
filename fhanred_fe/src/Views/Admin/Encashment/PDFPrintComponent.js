// PDFPrintComponent.js
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { createPDFDocument } from './pdfUtils'; // Suponiendo que tienes una función para crear el documento PDF

const PDFPrintComponent = ({ paymentData }) => {
  return (
    <div>
      {/* Aquí verificamos si hay datos de pago para imprimir el PDF */}
      {paymentData && (
        <PDFDownloadLink document={createPDFDocument(paymentData)} fileName="recibo_pago.pdf">
          {({ loading }) => (loading ? 'Cargando...' : 'Descargar PDF')}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default PDFPrintComponent;
