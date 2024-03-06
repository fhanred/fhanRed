const { Contract } = require('../data'); // Importa el modelo de contrato definido con Sequelize

async function obtenerContratosComoJSON() {
  try {
    // Obtener todos los contratos de la base de datos
    const contratos = await Contract.findAll();

    // Convertir los contratos a formato JSON
    const contratosJSON = JSON.stringify(contratos);

    // Guardar el JSON en un archivo
    const fs = require('fs');
    fs.writeFileSync('contratos.json', contratosJSON, 'utf8');

    console.log('Contratos convertidos a JSON y guardados en contratos.json.');
  } catch (error) {
    console.error('Error al obtener los contratos:', error);
  }
}

module.exports = obtenerContratosComoJSON;