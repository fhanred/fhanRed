const {
  User,
  Plan,
  Contract,
  Vivienda,
  Delivery,
  //Inventory,
} = require('../data');

module.exports = async (req, res) => {
  const n_documento = req.body.n_documento;

  // Buscar el usuario por n_documento para verificar su existencia
  const user = await User.findByPk(n_documento);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // El usuario existe,  se procede a filtrar los datos del formulario para cada modelo

  const userFields = [
    'sexo',
    'n_documento',
    'tipo_documento',
    'tipo_persona',
    'name_razonSocial',
    'email',
    'fecha_cumple',
  ]; // Campos del modelo User
  const contractFields = [
    'init_date',
    'caja_nap',
    'ultimo_pago',
    'tel1',
    'tel2',
    'tel3',
    'marca_onu',
    'mac',
    "descuento",
    "retefuente",
    'reporte_c_riesgo',
    'estado_cp_correo',
    'estado_contrato',
    "idStratus",
  ]; // Campos del modelo Contract
  const planFields = ['name_plan']; // campo modelo Plan
  const viviendaFields = ['id_vivienda']; // campo modelo Vivienda
  const deliveryFields = ['municipio', 'barrio_vereda', 'direccion']; // campos modelo Delivery

  // Objetos para almacenar datos filtrados para cada modelo
  const filteredUserData = {};
  const filteredContractData = {};
  const filteredPlanData = {};
  const filteredViviendaData = {};
  const filteredDeliveryData = {};

  // Iterar sobre req.body y filtrar propiedades para cada modelo
  Object.keys(req.body).forEach((key) => {
    if (userFields.includes(key)) {
      filteredUserData[key] = req.body[key];
    } else if (contractFields.includes(key)) {
      filteredContractData[key] = req.body[key];
    } else if (planFields.includes(key)) {
      filteredPlanData[key] = req.body[key];
    } else if (viviendaFields.includes(key)) {
      filteredViviendaData[key] = req.body[key];
    } else if (deliveryFields.includes(key)) {
      filteredDeliveryData[key] = req.body[key];
    }
  });

  //Actualizar User
  const stringFechaCumple = filteredUserData.fecha_cumple; // Obtenemos la cadena de fecha de filteredUserData

  // Convertir la cadena de fecha a un objeto Date (estableciendo la zona horaria a UTC)
  const fechaCumple = new Date(`${stringFechaCumple}T00:00:00.000Z`);

  // Actualizar todos los campos de 'filteredUserData' y también 'fecha_cumple' del usuario
  await User.update(
    {
      ...filteredUserData,
      fecha_cumple: fechaCumple.toISOString().split('T')[0],
    },
    {
      where: { n_documento: n_documento }, // Condición para actualizar el usuario con el ID correspondiente
    }
  );

  // Crear contrato
  const stringInitDate = filteredContractData.init_date;
  const stringUltimoPago = filteredContractData.ultimo_pago;

  const fechaInitDate = new Date(`${stringInitDate}T00:00:00.000Z`); // Convertir las cadenas de fecha a objetos Date (estableciendo la zona horaria a UTC)
  const fechaUltimoPago = new Date(`${stringUltimoPago}T00:00:00.000Z`); // Convertir las cadenas de fecha a objetos Date (estableciendo la zona horaria a UTC)

  const createdContract = await Contract.create({
    ...filteredContractData,
    n_documento: filteredUserData.n_documento,
    init_date: fechaInitDate.toISOString().split('T')[0],
    ultimo_pago: fechaUltimoPago.toISOString().split('T')[0],
  });

  // relación entre contrato y plan
  let namePlan = filteredPlanData.name_plan;

  const plan = await Plan.findByPk(namePlan); // Busca el plan por nombre
  if (plan) {
    await createdContract.setPlan(plan); // Establece la relación entre contrato y plan
  } else {
    console.log('Plan no encontrado');
  }

  // Crear delivery

  const createdDelivery = await Delivery.create({
    ...filteredDeliveryData,
  });

  // Relación entre direccion y vivienda
  let idVivienda = parseInt(filteredViviendaData.id_vivienda, 10); // Convierte el valor a un número

  if (!isNaN(idVivienda) && idVivienda !== null) {
    const vivienda = await Vivienda.findByPk(idVivienda);
    if (vivienda) {
      await createdDelivery.setVivienda(vivienda); // Establece la relación entre delivery y vivienda
    } else {
      console.log('Vivienda no encontrada');
    }
  } else {
    console.log('El ID de la vivienda no es un número válido o es nulo');
  }

  // relación entre contrato y direccion
  await createdContract.setDelivery(createdDelivery);

  // Modificar el contrato con el campo id_Contract y establecer el descuento
  const contractIdToUpdate = 133; // ID del contrato que se desea actualizar
  const contractIdToUpdateRte = 588;

  const contratoConDescuento = await Contract.findOne({
    where: {
      n_contrato: contractIdToUpdate,
    },
  });

  if (contratoConDescuento) {
    // Modificar el campo 'descuento' para este contrato específico
    contratoConDescuento.descuento = 4.5455; // Modifica aquí el valor del descuento necesario
    contratoConDescuento.retefuente = 4;
    await contratoConDescuento.save(); // Guarda los cambios en la base de datos
  } 

  const contratoConRte = await Contract.findOne({
    where: {
      n_contrato: contractIdToUpdateRte,
    },
  });

  if(contratoConRte){
    contratoConRte.retefuente = 4;
    await contratoConRte.save();
  }
};