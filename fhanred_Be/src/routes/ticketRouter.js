const Router = require("express");
const controllers = require("../controllers");
//const middlewares = require("../middlewares");

const router = Router();

router.post("/create-ticket-test", controllers.createTicket);

router.get("/get-all-tickets-test", controllers.getAllTickets);


module.exports = router;