const axios = require('axios');
const { CreditN } = require('../../data');
const response = require("../../utils/response");
const { DATAICO_AUTHTOKEN } = require("../../config/envs");
const moment = require('moment');

module.exports = async (req, res) => {
  try {
    const authToken = DATAICO_AUTHTOKEN;
    const startNumber = 1; // Número inicial del rango autorizado
    const endNumber = 200; // Número final del rango autorizado

    const creditNotes = [];

    // Realiza peticiones para cada número dentro del rango autorizado
    for (let i = startNumber; i <= endNumber; i++) {
      try {
        const response = await axios.get(`https://api.dataico.com/dataico_api/v2/credit_notes?number=FHA${i}`, {
          headers: {
            'Auth-Token': authToken
          }
        });

        if (response.status === 200) {
          const creditNoteData = response.data.credit_note;

          const formattedIssueDate = moment.utc(creditNoteData.issue_date, 'DD/MM/YYYY HH:mm:ss').toDate();

          const creditNote = await CreditN.create({
            numberCN: creditNoteData.number,
            issue_date: formattedIssueDate,
            // Agregar otros campos de la nota de crédito que desees guardar en la base de datos
          });

          // Aquí deberías guardar la nota de crédito en la base de datos
          // Pero en el código actual no veo la lógica para guardarla

          creditNotes.push(creditNoteData);
          console.log('Nota de crédito obtenida:', creditNoteData);
        } else {
          console.error(`Error al obtener la nota de crédito FHA${i}`);
        }
      } catch (error) {
        console.error(`Error al obtener la nota de crédito FHA${i}:`, error.message);
      }
    }

    // Utilizar el módulo de respuesta para enviar la respuesta
    response(res, 200, creditNotes);
  } catch (error) {
    console.error('Error:', error);
    // Utilizar el módulo de respuesta para enviar la respuesta de error
    response(res, 500, 'Error interno del servidor');
  }
};


  
