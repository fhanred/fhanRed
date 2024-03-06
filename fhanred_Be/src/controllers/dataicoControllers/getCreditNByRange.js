const axios = require('axios');
const { CreditN } = require('../../data');
const response = require("../../utils/response");
const { DATAICO_AUTHTOKEN } = require("../../config/envs");
const moment = require('moment');

module.exports = async (req, res) => {
  try {
    const authToken = DATAICO_AUTHTOKEN;
    const startNumber = 1; 
    const endNumber = 200; 

    const creditNotes = [];

   
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
            
          });


          creditNotes.push(creditNoteData);
          console.log('Nota de crédito obtenida:', creditNoteData);
        } else {
          console.error(`Error al obtener la nota de crédito FHA${i}`);
        }
      } catch (error) {
        console.error(`Error al obtener la nota de crédito FHA${i}:`, error.message);
      }
    }

   
    response(res, 200, creditNotes);
  } catch (error) {
    console.error('Error:', error);
    
    response(res, 500, 'Error interno del servidor');
  }
};


  
