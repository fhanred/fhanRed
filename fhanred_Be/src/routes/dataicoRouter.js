const Router = require("express");
const {
 getBillsByRange,
 getCreditNByRange,
 getDebitNByRange,
 saveBillsByRange,
 saveDebit,
 saveCreditByRange
} = require('../controllers');

const router = Router();


router.get('/facturas/range', getBillsByRange);
router.get('/credito/range', getCreditNByRange);
router.get('/debito/range', getDebitNByRange);
router.post('/facturas/range', saveBillsByRange);
router.post('/credito/range', saveCreditByRange);
router.post('/debito/range', saveDebit);

module.exports = router;