const { Bill, DebitN, CreditN, Cash, User } = require('../data');
const response = require("../utils/response");

module.exports = async (req, res) => {
  try {
    const n_documento = req.params.n_documento;

    // Obtener el usuario
    const user = await User.findOne({ where: { n_documento } });
    if (!user) {
      return response(res, 404, 'Usuario no encontrado');
    }

    // Obtener todas las facturas, notas de débito y recibos asociados al usuario
    const [bills, debitNotes, receipts] = await Promise.all([
      Bill.findAll({ where: { party_identification: n_documento } }),
      DebitN.findAll({ where: { party_identification: n_documento } }),
      Cash.findAll({ where: { party_identification: n_documento } })
    ]);

    // Obtener todas las notas de crédito asociadas a las facturas
    const creditNotes = await Promise.all(bills.map(async (bill) => {
      const creditNotes = await CreditN.findAll({ where: { bill_id: bill.id } });
      return creditNotes;
    }));

    // Calcular el saldo
    const totalBillAmount = bills.reduce((total, bill) => total + bill.amount, 0);
    const totalDebitNoteAmount = debitNotes.reduce((total, debitNote) => total + debitNote.amount, 0);
    const totalCreditNoteAmount = creditNotes.reduce((total, creditNoteList) =>
      total + creditNoteList.reduce((subTotal, creditNote) => subTotal + creditNote.amount, 0), 0);
    const totalReceiptAmount = receipts.reduce((total, receipt) => total + receipt.amount, 0);
    const saldo = totalBillAmount + totalDebitNoteAmount - totalCreditNoteAmount - totalReceiptAmount;

    // Construir el objeto de resumen de cuenta
    const summary = {
      user,
      saldo,
      bills,
      debitNotes,
      creditNotes,
      receipts
    };

    response(res, 200, summary);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, 'Error interno del servidor');
  }
};


