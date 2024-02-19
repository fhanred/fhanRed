const Router = require("express");
const controllers = require("../controllers");
//const middlewares = require("../middlewares");

const router = Router();

router.post("/charge-ticket", controllers.chargeTicket);


module.exports = router;