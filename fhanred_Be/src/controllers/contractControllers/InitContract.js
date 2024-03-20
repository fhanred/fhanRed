const { Contract, User, Plan } = require('../models');
const response = require('../utils/response');

module.exports = async (req, res) => {
  try {
    // Obtengo los campos del formulario
    const { name_plan, ...contractData } = req.body;

    let user = await User.findOne({ where: { n_documento: contractData.n_documento } });

    if (!user) {
      
      user = await User.create({
        n_documento: contractData.n_documento,
        sexo: contractData.sexo,
        n_documento:contractData.n_documento,
        tipo_documento:contractData.tipo_documento,
        tipo_persona:contractData.tipo_persona,
        email: contractData.email,
        fecha_cumple:contractData.fecha_cumple,
        name_razonSocial:contractData.name_razonSocial
      });
    }

//me traigo el plan seleccionado
    const plan = await Plan.findOne({ where: { name: name_plan } });

    if (!plan) {
      return response(res, 404, 'Plan no encontrado');
    }

    // creando el contrato
    const newContract = await Contract.create({
      ...contractData,
      name_plan: name_plan, //aca tengo que agregar los datos de la segunda etapa del formulario del usuario 
      
    });

    
    response(res, 201, 'Contrato creado exitosamente', newContract);
  } catch (error) {
    console.error('Error al crear contrato:', error);
    response(res, 500, 'Error al crear contrato');
  }
};

