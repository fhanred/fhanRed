const Router = require("express");
const cashControllers = require("../controllers/cashControllers/index");


const router = Router();

router.post("/", cashControllers.createCash);
router.get("/", cashControllers.getAllCash)
router.get("/porCajero/:cashierName", cashControllers.getByCashier)
router.get("/porContrato/:contract", cashControllers.getByContract);
router.get("/porFecha", cashControllers.getByDate)
// router.get("/lastReceiptNumber", cashControllers.getLastReceiptNumber);
module.exports = router;



