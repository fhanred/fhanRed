const Router = require("express");
const cashControllers = require("../controllers/cashControllers/");
const { passport, authenticate } = require("../passport.js");


const router = Router();
 
router.post("/", cashControllers.createCash);
router.get("/", cashControllers.getAllCash)
router.get("/porCajero/:cashierName", cashControllers.getByCashier)
router.get("/porContrato/:contract", cashControllers.getByContract);
router.get('/porFecha/:paymentDate', cashControllers.getByDate);
router.get('/porUser/:n_documento', cashControllers.getReceiptsByUser)
router.get('/porUser/factura/:n_documento', cashControllers.getBillByUser)
router.get('/porUser/creditN/:n_documento', cashControllers.getCreditNByUser)
router.get('/porUser/debitN/:n_documento', cashControllers.getDebitNByUser)
router.get('/porUser/debitN/:n_documento', cashControllers.getDebitNByUser)
router.get('/porMetodo/:paymentMethod', cashControllers.getByPaymentMethod)


module.exports = router;



