const Router = require("express");
const controllers = require("../controllers");


const router = Router();
router.get("/",  controllers.listUsers);
router.get("/:n_documento", controllers.getUser);
router.post("/forgotpassword", controllers.forgotPassword);


module.exports = router;
