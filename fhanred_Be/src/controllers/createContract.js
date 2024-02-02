const {
  User,
  Plan,
  Contract,
  Vivienda,
  Delivery,
  //Inventory,
} = require('../data');
const response = require('../utils/response');

module.exports = async (req, res) => {
  const n_documento = req.body.n_documento;
  console.log(n_documento);
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
    'reporte_c_riesgo',
    'estado_cp_correo',
    'estado_contrato',
    'idStratus',
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
    if (userFields.includes(key) && req.body[key] !== undefined) {
      filteredUserData[key] = req.body[key];
    } else if (contractFields.includes(key) && req.body[key] !== undefined) {
      filteredContractData[key] = req.body[key];
    } else if (planFields.includes(key) && req.body[key] !== undefined) {
      filteredPlanData[key] = req.body[key];
    } else if (viviendaFields.includes(key) && req.body[key] !== undefined) {
      filteredViviendaData[key] = req.body[key];
    } else if (deliveryFields.includes(key) && req.body[key] !== undefined) {
      filteredDeliveryData[key] = req.body[key];
    }
  });

  //Actualizar User
  // Verificar si apellidos y nombres están presentes en req.body
  if (req.body.apellidos && req.body.nombres) {
    // Concatenar apellidos y nombres con una coma y guardar en name_razonSocial en mayúsculas
    filteredUserData.name_razonSocial =
      `${req.body.apellidos}, ${req.body.nombres}`.toUpperCase();
  } else if (req.body.razonSocial) {
    // Si razonSocial está presente, simplemente guardarla en name_razonSocial en mayúsculas
    filteredUserData.name_razonSocial = req.body.razonSocial.toUpperCase();
  }

  const stringFechaCumple = filteredUserData.fecha_cumple; // Obtenemos la cadena de fecha de filteredUserData
  console.log(stringFechaCumple);
  // Convertir la cadena de fecha a un objeto Date (estableciendo la zona horaria a UTC)
  const fechaCumple = new Date(`${stringFechaCumple}T00:00:00.000Z`);
  const email = filteredUserData.email.toUpperCase();

  // Actualizar todos los campos de 'filteredUserData' y también 'fecha_cumple' del usuario
  await User.update(
    {
      ...filteredUserData,
      fecha_cumple: fechaCumple.toISOString().split('T')[0],
      email: email,
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
  console.log(namePlan);
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
  console.log(idVivienda);

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

  // Respondemos con éxito
  response(res, 201, 'success');
};
