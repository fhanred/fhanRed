const { User, Contract } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  try {
    const { n_documento } = req.params;
    const user = await User.findByPk(n_documento, { include: Contract });

    if (!user) {
      return response(res, 404, "Usuario no encontrado");
    }

    return response(res, 200, user);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return response(res, 500, "Error interno del servidor");
  }
};

