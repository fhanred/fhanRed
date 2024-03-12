const { Bill } = require('../../data');
const response = require("../../utils/response");

module.exports = async (req, res) => {
  try {
    const authToken = DATAICO_AUTHTOKEN;
    const startNumber = 1; // Número inicial del rango autorizado
    const endNumber = 5000; // Número final del rango autorizado

    const bills = [];

    for (let i = startNumber; i <= endNumber; i++) {
      const response = await axios.get(`https://api.dataico.com/dataico_api/v2/invoices?number=FHA${i}`, {
        headers: {
          'Auth-Token': authToken
        }
      });

      if (response.status === 200) {
        const invoiceData = response.data.invoices;
        const newBill = await Bill.create({
          numberI: invoiceData.numberI,
          issue_date: invoiceData.issue_date,
          party_identification: invoiceData.party_identification
          // Agrega cualquier otro campo necesario según el modelo Bill
        });
        bills.push(newBill);
      } else {
        console.error(`Error al obtener la factura FHA${i}`);
      }
    }

    response(res, 200, bills);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, 'Error interno del servidor');
  }
};

