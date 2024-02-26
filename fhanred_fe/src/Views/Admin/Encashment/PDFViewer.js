import React from "react";
import { Document, Page, Text } from "@react-pdf/renderer";

const PDFViewer = ({ formData }) => {
  return (
    <Document>
      <Page>
        <Text>Detalles del Pago:</Text>
        <Text>Número de Recibo: {formData.receipt}</Text>
        <Text>Importe: {formData.importe}</Text>
        <Text>contract: {formData.contract}</Text>
        <Text>paymentDate: {formData.paymentDate}</Text>
        <Text>paymentTime: {formData.paymentTime}</Text>
        <Text>username: {formData.username}</Text>
        <Text>importe: {formData.importe}</Text>
        <Text>description: {formData.description}</Text>
        <Text>paymentMethod: {formData.paymentMethod}</Text>
      </Page>
    </Document>
  );
};

export default PDFViewer;
