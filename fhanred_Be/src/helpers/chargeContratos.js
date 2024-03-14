const contratos = require('./contratos'); // Importas el array de contratos
const mapearContratos = require('./mapearContratos'); // Importas la función mapearContratos

module.exports = async (res) => {
  try {
    console.log(`Cargando ${contratos.length} contratos...`);
    await mapearContratos(contratos); // Llamas a la función mapearContratos pasando el array de contratos como argumento
    console.log('Carga de contratos completada.');
  } catch (error) {
    console.error('Error al cargar contrato:', error);
    response(res, 500, 'Error al cargar contratos'); // Aquí necesitarás definir la función response o reemplazarla con la forma en que manejas las respuestas de error
  }
};
