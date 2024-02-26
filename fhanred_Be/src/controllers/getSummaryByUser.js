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

    
    const [bills, debitNotes, creditNotes, cash] = await Promise.all([
      Bill.findAll({ where: { party_identification: n_documento } }),
      DebitN.findAll({ where: { party_identification: n_documento } }),
      CreditN.findAll({ where: { party_identification: n_documento } }),
      Cash.findAll({ where: { n_documento } })
    ]);
    console.log("Bills:", bills);
    console.log("Debit Notes:", debitNotes);
    console.log("Credit Notes:", creditNotes);
    console.log("Cash:", cash);
   
    const totalBillAmount = bills.reduce((total, bill) => total + bill.price, 0);
    const totalDebitNoteAmount = debitNotes.reduce((total, debitNote) => total + debitNote.price, 0);
    const totalCreditNoteAmount = creditNotes.reduce((total, creditNote) => total + creditNote.price, 0);
    const totalReceiptAmount = cash.reduce((total, receipt) => total + receipt.importe, 0);
    const saldo = totalBillAmount + totalDebitNoteAmount - totalCreditNoteAmount - totalReceiptAmount;


    const summary = {
      user,
      saldo,
      bills,
      debitNotes,
      creditNotes,
      cash
    };

    response(res, 200, summary);
  } catch (error) {
    console.error('Error:', error);
    response(res, 500, 'Error interno del servidor');
  }
};


