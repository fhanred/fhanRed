// Importa los modelos necesarios para interactuar con la base de datos
const { Contract } = require('../data');

// Función para mapear y cargar los contratos en la base de datos
const mapearContratos = async (contratos) => {
  try {
    console.log(`Mapeando y cargando ${contratos.length} contratos...`);
    // Mapear los contratos
    const contratosMapeados = contratos.map(contrato => ({
      id_Contract: contrato.id_Contract,
      init_date: contrato.init_date,
      caja_nap: contrato.caja_nap,
      descuento: contrato.descuento,
      retefuente: contrato.retefuente,
      deuda: contrato.deuda,
      ultimo_pago: contrato.ultimo_pago,
      tel1: contrato.tel1,
      tel2: contrato.tel2,
      tel3: contrato.tel3,
      marca_onu: contrato.marca_onu,
      mac: contrato.mac,
      reporte_c_riesgo: contrato.reporte_c_riesgo,
      estado_cp_correo: contrato.estado_cp_correo,
      estado_contrato: contrato.estado_contrato,
      idStratus: contrato.idStratus,
      n_documento: contrato.n_documento,
      name_plan: contrato.name_plan,
      id_delivery: contrato.id_delivery,
      id_inventory: contrato.id_inventory
    }));

    // Insertar los contratos mapeados en la base de datos
    await Contract.bulkCreate(contratosMapeados);

    console.log('Carga de contratos completada.');
  } catch (error) {
    console.error('Error al cargar los contratos:', error);
    throw error; // Lanza el error para manejarlo en el código que llama a esta función
  }
};

module.exports = mapearContratos;

