const { User, Role, Contract } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  const users = await User.findAll({
    include: [{
      model: Contract,
      attributes: ['id_Contract', "estado_contrato", "name_plan", "ultimo_pago"], 
      foreignKey: 'n_documento' 
    }]
  });
  response(res, 200, {users}); 
};
