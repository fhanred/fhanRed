const Router = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");

const router = Router();


router.post("/",  middlewares.userValidation, controllers.createUser);

module.exports = router;
