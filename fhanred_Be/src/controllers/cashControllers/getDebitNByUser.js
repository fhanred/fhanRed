// controllers/debitNoteController.js
const { DebitN, User } = require('../../data');
const response = require("../../utils/response")

module.exports = async (req, res) => {
  try {
    const { n_documento } = req.params;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { n_documento } });
    if (!user) {
      return response(res, 404, 'Usuario no encontrado');
    }

    // Obtener todas las notas de débito del usuario
    const debitNotes = await DebitN.findAll({ where: { party_identification: n_documento } });

    response(res, 200, debitNotes);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, 'Error interno del servidor');
  }
};
