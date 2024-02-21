const axios = require('axios');
const { Bill } = require('../../data');
const response = require("../../utils/response");
const { DATAICO_AUTHTOKEN } = require("../../config/envs");
const moment = require('moment');
const { Op } = require("sequelize");


module.exports = async (req, res) => {
  try {
    const authToken = DATAICO_AUTHTOKEN;
    const startNumber = 0; // Número inicial del rango autorizado
    const endNumber = 900; // Número final del rango autorizado

    const bills = [];

    // Realiza peticiones para cada número dentro del rango autorizado
    for (let i = startNumber; i <= endNumber; i++) {
      try {
        const response = await axios.get(`https://api.dataico.com/dataico_api/v2/invoices?number=FHA${i}`, {
          headers: {
            'Auth-Token': authToken
          }
        });

        if (response.status === 200) {
          const billData = response.data.invoice;

          // Verificar si la factura ya existe en la base de datos
          const existingBill = await Bill.findOne({
            where: {
              numberI: billData.number
            }
          });

          if (!existingBill) {
            // Convertir el formato de fecha y guardar la factura en la base de datos
            const formattedIssueDate = moment(billData.issue_date, 'DD/MM/YYYY HH:mm:ss').toDate();
            const createdBill = await Bill.create({
              numberI: billData.number,
              issue_date: formattedIssueDate,
              party_identification: billData.customer.party_identification,
              price: billData.items[0].price,
              qrcode: billData.qrcode,
              
            });
            console.log('Factura guardada en la base de datos:', createdBill.toJSON());
          } else {
            console.log(`La factura ${billData.number} ya existe en la base de datos. No se guarda.`);
          }
        } else {
          console.error(`Error al obtener la factura FHA${i}`);
        }
      } catch (error) {
        console.error(`Error al obtener la factura FHA${i}:`, error.message);
      }
    }

    // Utilizar el módulo de respuesta para enviar la respuesta
    response(res, 200, bills);
  } catch (error) {
    console.error('Error:', error);
    // Utilizar el módulo de respuesta para enviar la respuesta de error
    response(res, 500, 'Error interno del servidor');
  }
};




