const { catchedAsync } = require("../utils");
const cashControllers = require("../controllers/cashControllers")
const assignmentController = require("../controllers/dashboardControllers")
module.exports = {
  createUser: catchedAsync(require("./createUser")),
  listUsers: catchedAsync(require("./listUsers")),
  getUser: catchedAsync(require("./getUser")),
  createContract: catchedAsync(require("./createContract")),
  auth: catchedAsync(require("./auth")),
  chargeContract: catchedAsync(require("./chargeContract")),
  getContract: catchedAsync(require("./getContract")),
  forgotPassword: catchedAsync(require("./forgotPassword")),
  chargeDocumentation: catchedAsync(require("./chargeDocumentation")),
  getDocumentation: catchedAsync(require("./getDocumentation")),
  getBillsByRange:catchedAsync(require("./dataicoControllers/getBillsByRange")),
  getDebitNByRange:catchedAsync(require("./dataicoControllers/getDebitNByRange")),
  getCreditNByRange:catchedAsync(require("./dataicoControllers/getCreditNByRange")),
  saveCreditByRange: catchedAsync(require("./dataicoControllers/saveCreditByRange")),
  saveDebit: catchedAsync(require("./dataicoControllers/saveDebit")),
  saveBillsByRange: catchedAsync(require("./dataicoControllers/getBillsByRange")),
  getAllReceipt:catchedAsync(require("./getAllReceipt")),
  getAllCash:catchedAsync(require("./cashControllers/getAllCash")),
  getReceiptsByUser:catchedAsync(require("./cashControllers/getReceiptsByUser")),
  getSummaryByUser:catchedAsync(require("./getSummaryByUser")),
  getAllTasks:catchedAsync(require("./dashboardControllers/getAllTasks")),
  createTask:catchedAsync(require("./dashboardControllers/createTask")),
  assignTask:catchedAsync(require("./dashboardControllers/assignTask")),
  getTasksForUser:catchedAsync(require("./dashboardControllers/getTasksForUser")),
  getByPaymentMethod:catchedAsync(require("./cashControllers/getByPaymentMethod")),

};

//exportamos como una propiedad de lo que exporta  modulo  indexjs
