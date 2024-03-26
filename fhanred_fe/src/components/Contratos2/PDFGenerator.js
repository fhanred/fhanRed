// PDFGenerator.js

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const PDFGenerator = ({ formData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Información del Contrato</Text>
          <Text style={styles.text}>Nombre y Apellido: {formData.name}</Text>
          <Text style={styles.text}>Dirección: {formData.address}</Text>
          {/* Agrega más campos según los datos recopilados */}
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;
