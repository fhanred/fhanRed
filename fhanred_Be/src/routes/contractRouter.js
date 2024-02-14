const Router = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

router.post("/documentation", controllers.chargeDocumentation);
router.get("/documentation", controllers.getDocumentation);
router.get("/:id_Contract", controllers.getContract);



module.exports = router;