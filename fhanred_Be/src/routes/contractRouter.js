const Router = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();

router.post("/documentation", controllers.chargeDocumentation);
router.get("/documentation", controllers.getDocumentation);
router.get("/:id_Contract", controllers.getContract);
router.get("/", controllers.getAllContract)
router.post("/create", controllers.initContract )
//router.post("/post", controllers.createContract )

module.exports = router;