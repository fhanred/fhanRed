const { Contract, User, Delivery, Plan, Vivienda} = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
const {id_Contract} = req.params;
const contract = await Contract.findByPk(id_Contract, {
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
      {
        model: Plan,
        attributes: ['name_plan', 'costo']
      },
      
    ]
  });
  if (!contract) {
    return res.status(404).json({ message: 'Contrato no encontrado' });
  }

  response(res, 200,  contract );
}; 
