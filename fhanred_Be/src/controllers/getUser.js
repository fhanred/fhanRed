const { User, Contract } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  try {
    const { n_documento } = req.params;
    console.log(n_documento)
    const user = await User.findByPk(n_documento, { include:[{ model: Contract, include: [Delivery] }] });
    console.log(user)
    if (!user) {
      return response(res, 404, "Usuario no encontrado");
    }

    return response(res, 200, user);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return response(res, 500, "Error interno del servidor");
  }
};

