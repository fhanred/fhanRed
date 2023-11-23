const { Router } = require("express");

const router = Router();

router.use("/user", require("./userRouter"));
router.use("/auth", require("./authRouter"));


module.exports = router;
