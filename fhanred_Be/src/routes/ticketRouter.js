const Router = require("express");
const controllers = require("../controllers");
//const middlewares = require("../middlewares");

const router = Router();

router.post("/charge-ticket-test", controllers.chargeTicket);


module.exports = router;