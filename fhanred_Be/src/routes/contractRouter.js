const Router = require("express");
const controllers = require("../controllers");
//const middlewares = require("../middlewares");

const router = Router();

router.get("/:id_Contract", controllers.getContract);
router.post("/", controllers.createContract);

module.exports = router;