const createTicketLogic = require('../controllers/chargeTicket.js');
const data = require('./tickets.js');

module.exports = async (req, res) => {
  function normalizeTicket(ticket) {
    /* console.log({
      fr: ticket['FECHA CERRO OS'],
      hr: ticket['HORA CERRO OS']
    }) */
    return {
      ticket_type: ticket.TIPO || '',
      reception_datetime:new Date(Date.parse(`${ticket.FECHARECEPCION} ${ticket.HORARECEPCION}`)) || '',
      served_by: ticket["NOMBRES VENDEDOR"] || '',
      observations: ticket.OBSERVACIONES || '',
      tech_observations: ticket.OBSERVACIONESTECNICO || '',
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
      debt: ticket.DEUDA || '',
    };
  }

  try {
    for (const ticket of data) {
      console.log(normalizeTicket(ticket));
      await createTicketLogic({
        body: normalizeTicket(ticket),
      });
    }
  } catch (error) {
    console.error('Error al cargar ticket:', error);
    return error;
  }
};
