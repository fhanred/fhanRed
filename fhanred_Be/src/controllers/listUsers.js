const { User, Role, Contract, Plan, Delivery } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  const users = await User.findAll({
    // include: [
    //   {
    //     model: Contract,
    //     include: [Plan, Delivery], // Incluir la relación con Plan y Delivery en Contract
    //   },
    // ],
    include: [{
      model: Contract,
      attributes: ['id_Contract', "estado_contrato", "name_plan", "ultimo_pago"], 
      foreignKey: 'n_documento' 
    }]
  });
  response(res, 200, {users}); 
};
