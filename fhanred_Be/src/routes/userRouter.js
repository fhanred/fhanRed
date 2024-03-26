const Router = require("express");
const controllers = require("../controllers/");
const isAuth = require('../middlewares/ authenticateToken')


const router = Router();
router.get("/",  controllers.listUsers);
router.get("/:n_documento", controllers.getUser);
router.post("/forgotpassword", controllers.forgotPassword);
//router.delete("/:n_documento", controllers.deleteUser);
router.put("/update/:n_documento",controllers.updateUser);
router.delete("/eliminar/:id",controllers.deletedAssignment)
module.exports = router;
