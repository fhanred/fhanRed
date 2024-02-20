const { DebitN } = require('../../data');
const response = require("../../utils/response");

module.exports = async (req, res) => {
  try {
    const authToken = DATAICO_AUTHTOKEN;
    const startNumber = 1; // Número inicial del rango autorizado
    const endNumber = 1000; // Número final del rango autorizado

    const debitNotes = [];

    for (let i = startNumber; i <= endNumber; i++) {
      const response = await axios.get(`https://api.dataico.com/dataico_api/v2/debit_notes?number=FHA${i}`, {
        headers: {
          'Auth-Token': authToken
        }
      });

      if (response.status === 200) {
        const debitNote = response.data.debit_note;
        const newDebitNote = await DebitN.create({
          numberI: debitsData.numberI,
          issue_date: debitsData.issue_date,
          party_identification: debitsData.party_identification
         
        });
        debitNote.push(newDebitNote);
      } else {
        console.error(`Error al obtener la nota de Debito FHA${i}`);
      }
    }

    response(res, 200, debitNotes);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, 'Error interno del servidor');
  }
};

