const createContractLogic = require('../controllers/chargeContract.js');
const contratos = require('./contratos.js');

module.exports = async (res) => {
  try {
    console.log(`Cargando ${contratos.length} contratos...`); // Agregar mensaje de registro
    for (const contrato of contratos) {
      console.log(`Cargando contrato: ${contrato.id_Contract}`); // Agregar mensaje de registro para cada contrato
      await createContractLogic({
        body: contrato,
      });
      console.log(`Contrato cargado: ${contrato.id_Contract}`); // Agregar mensaje de registro después de cargar cada contrato
    }
    console.log('Carga de contratos completada.'); // Agregar mensaje de registro al finalizar la carga
  } catch (error) {
    console.error('Error al cargar contrato:', error);
    response(res, 500, 'Error al cargar contratos');
  }
};