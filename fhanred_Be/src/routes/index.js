const { Router } = require("express");
const userRouter = require("./userRouter");
const contractRouter = require("./contractRouter")


const router = Router();

router.use("/user", userRouter);
router.use("/contract", contractRouter)


module.exports = router;
