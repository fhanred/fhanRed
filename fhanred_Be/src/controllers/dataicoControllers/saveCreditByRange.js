const { CreditN } = require('../../data');
const response = require("../../utils/response");

module.exports = async (req, res) => {
  try {
    const authToken = DATAICO_AUTHTOKEN;
    const startNumber = 1; // Número inicial del rango autorizado
    const endNumber = 5000; // Número final del rango autorizado

    const creditNotes = [];

    for (let i = startNumber; i <= endNumber; i++) {
      const response = await axios.get(`https://api.dataico.com/dataico_api/v2/credit_notes?number=FHA${i}`, {
        headers: {
          'Auth-Token': authToken
        }
      });

      if (response.status === 200) {
        const creditNote = response.data.credit_note;
        const newCreditNote = await CreditN.create({
          numberI: creditsData.numberI,
          issue_date: creditsData.issue_date,
          party_identification: creditsata.party_identification
         
        });
        creditNote.push(newCreditNote);
      } else {
        console.error(`Error al obtener la nota de Credito FHA${i}`);
      }
    }

    response(res, 200, creditNotes);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, 'Error interno del servidor');
  }
};

