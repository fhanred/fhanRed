const axios = require('axios');
const response = require("../../utils/response");
const { DATAICO_AUTHTOKEN } = require("../../config/envs");

module.exports = async (req, res) => {
  try {
    const authToken = DATAICO_AUTHTOKEN
    const startNumber = 1; // Número inicial del rango autorizado
    const endNumber = 1; // Número final del rango autorizado

    const debitNotes = [];

    // Realiza peticiones para cada número dentro del rango autorizado
    for (let i = startNumber; i <= endNumber; i++) {
        const response = await axios.get(`https://api.dataico.com/dataico_api/v2/debit_notes?number=FHA${i}`, {
          headers: {
            'Auth-Token': authToken
          }
        });
  
        if (response.status === 200) {
          const debitNote = response.data.debitNote;
          debitNotes.push(debitNote);
        } else {
          console.error(`Error al obtener la NDebito FHA${i}`);
        }
      }
  
     
      response(res, 200, debitNotes);
    } catch (error) {
      console.error('Error:', error);
      // Utilizar el módulo de respuesta para enviar la respuesta de error
      response(res, 500, 'Error interno del servidor');
    }
  };
