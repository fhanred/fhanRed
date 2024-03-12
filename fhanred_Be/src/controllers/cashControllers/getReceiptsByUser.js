const { Cash, User } = require("../../data");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  const { n_documento } = req.params;
  try {
    const user = await User.findByPk(n_documento, {
      include: Cash // Incluye el modelo Cash en la consulta
    });

    // Verifica si se encontró el usuario
    if (!user) {
      return response(res, 404, 'Usuario no encontrado');
    }

    // Obtén los recibos del usuario
    const receipts = user.Cash;
    console.log(receipts)
    response(res, 200, receipts);
  } catch (error) {
    console.error("Error:", error);
    response(res, 500, "Error interno del servidor");
  }
};
