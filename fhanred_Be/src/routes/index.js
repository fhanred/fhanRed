const { Router } = require("express");

const router = Router();

router.use("/user", require("./userRouter"));
router.use("/contract", require("./contractRouter"));
router.use("/auth", require("./authRouter"));
router.use("/tickets", require("./ticketRouter"));
router.use("/caja", require("./cashRouter"))
router.use("/dataico", require("./dataicoRouter"))
router.use("/summary", require("./summaryRouter"))
router.use("/task", require("./taskRouter"))


module.exports = router;









