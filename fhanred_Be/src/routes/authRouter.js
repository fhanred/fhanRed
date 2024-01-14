const Router = require("express");
const controllers = require("../controllers");
const { passport, authenticate } = require("../passport.js");

const router = Router();
router.post("/signup",  controllers.createUser);// hay que ponerle middlewares de acceso admin 
router.post('/login', passport.authenticate("local", { failureRedirect: "/login" }), controllers.auth);
module.exports = router;