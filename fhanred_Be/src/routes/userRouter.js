const Router = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();
router.get("/",  controllers.listUsers);
router.get("/:id", controllers.getUser);
router.post("/",  middlewares.userValidation, controllers.createUser);

module.exports = router;
