const response = require("../../utils/response");
const { Ticket }  = require('../../data');

module.exports = async (req, res) => {
  try {
    const getTicketsQueryResult = await Ticket.findAll();

    response(res, 200, getTicketsQueryResult);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, 'Error interno del servidor', true);
  }
}

