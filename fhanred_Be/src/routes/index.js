const { Router } = require("express");

const router = Router();

router.use("/user", require("./userRouter"));
router.use("/contract", require("./contractRouter"));
router.use("/auth", require("./authRouter"));
router.use("/tickets", require("./ticketRouter"));


module.exports = router;
