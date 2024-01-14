const Router = require("express");
const controllers = require("../controllers");


const router = Router();
router.get("/",  controllers.listUsers);
router.get("/:n_documento", controllers.getUser);


module.exports = router;
