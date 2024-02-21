const { CreditN, User } = require('../../data');
const response = require("../../utils/response");

module.exports = async (req, res) => {
  try {
    const { n_documento } = req.params;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { n_documento } });
    if (!user) {
      return response(res, 404, 'Usuario no encontrado');
    }

    // Obtener todas las notas de crédito del usuario
    const creditNotes = await CreditN.findAll({ where: { party_identification: n_documento } });

    // Filtrar las notas de crédito que tienen un número de factura asociado
    const filteredCreditNotes = creditNotes.filter(creditNote => creditNote.invoice);

    response(res, 200, filteredCreditNotes);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, 'Error interno del servidor');
  }
};

