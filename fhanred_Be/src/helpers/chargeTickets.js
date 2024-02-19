const createContractLogic = require('../controllers/chargeContract.js');
const tickets = require('./tickets.js');

module.exports = async (res) => {
  try {
    for (const ticket of tickets) {
      await createContractLogic({
        body: ticket,
      });
    }
  } catch (error) {
    console.error('Error al cargar ticket:', error);
    response(res, 500, 'Error al cargar tickets');
  }
};
