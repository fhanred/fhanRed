const { Bill, User } = require('../../data');
const response = require("../../utils/response");

module.exports = async (req, res) => {
  try {
    const { n_documento } = req.params;

    
    const user = await User.findOne({ where: { n_documento } });
    if (!user) {
      return response(res, 404, 'Usuario no encontrado');
    }

    
    const bills = await Bill.findAll({ where: { party_identification: n_documento } });

    response(res, 200, bills);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, 'Error interno del servidor');
  }
};