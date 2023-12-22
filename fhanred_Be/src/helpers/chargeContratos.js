const createContractLogic = require('../controllers/chargeContract.js');
const contratos = require('./contratos.js');

module.exports = async (res) => {
  try {
    for (const contrato of contratos) {
      await createContractLogic({
        body: contrato,
      });
    }
  } catch (error) {
    console.error('Error al cargar contrato:', error);
    response(res, 500, 'Error al cargar contratos');
  }
};
