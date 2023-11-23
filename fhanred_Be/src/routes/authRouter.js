const Router = require("express");
const controllers = require("../controllers");
const { passport, authenticate } = require("../passport.js");

const router = Router();
router.post("/sign",  controllers.signUser);
router.post('/login', passport.authenticate("local", { failureRedirect: "/login" }), controllers.auth);
module.exports = router;