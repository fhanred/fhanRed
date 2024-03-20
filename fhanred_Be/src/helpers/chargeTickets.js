const { default: axios } = require('axios');
const data = require('./tickets.js');
//const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_DEPLOY } = require("../config/envs");

module.exports = async (req, res) => {
  function normalizeTicket(ticket) {
    return {
      ticket_type: ticket.TIPO || '',
      reception_datetime:new Date(Date.parse(`${ticket.FECHARECEPCION} ${ticket.HORARECEPCION}`)) || '',
      served_by: ticket["NOMBRES VENDEDOR"] || '',
      observations: ticket.OBSERVACIONES || '',
      phone: ticket.TELEFONO.toString() || '',
      poste: ticket.POSTE || '',
      field_39: ticket.FIELD39 || '',
      status: ticket["ESTADO OS"] || '',
      created_by: ticket["PERSONA REGISTRO OS"] || '',
      closed_by: ticket["PERSONA CERRO OS"] || '',
      opening_datetime: new Date(Date.parse(`${ticket.FECHARECEPCION} ${ticket["HOR INICIO"]}`)) || '',
      closing_datetime: new Date(),           //(Date.parse(`${ticket["FECHA CERRO OS"]} ${ticket["HORA CERRO OS"]}`)) || '',
      used_materials: ticket["MATERIALES UTILIZADOS"] || '',
      collected_materials: ticket["MATERIALES RECOGIDOS"] || '',
      n_contrato: 1
    };
  }

  try {
    for (const ticket of data) {
      await axios.post(`http://localhost:${process.env.PORT}/tickets/create-ticket-test`, normalizeTicket(ticket))
    }
  } catch (error) {
    console.error('Error al cargar ticket:', error);
    return error;
  }
};
