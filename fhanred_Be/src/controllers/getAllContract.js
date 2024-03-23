const { Contract, User, Delivery, Plan, Vivienda } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        {
          model: User,
          attributes: ['n_documento', 'tipo_persona', 'name_razonSocial', 'email']
        },
        {
          model: Delivery,
          attributes: ['municipio', 'barrio_vereda', 'direccion'],
          include: [
            {
              model: Vivienda,
              attributes: ['name_type']
            }
          ]
        },
        // Incluir modelo deuda
        {
          model: Plan,
          attributes: ['name_plan', 'costo']
        },
      ]
    });

    if (!contracts || contracts.length === 0) {
      return res.status(404).json({ message: 'No se encontraron contratos' });
    }

    response(res, 200, contracts);
  } catch (error) {
    console.error('Error al buscar contratos:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};