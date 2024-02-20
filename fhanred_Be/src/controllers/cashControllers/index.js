const createCash = require("./createCash");
const getAllCash = require("./getAllCash");
const getByCashier = require("./getByCashier");
const getByContract = require("./getByContract");
const getByDate = require("./getByDate");
const getReceiptsByUser = require("./getReceiptsByUser")
const getBillByUser= require("./getBillByUser")
const getCreditNByUser= require("./getCreditNByUser")
const getDebitNByUser= require("./getDebitNByUser")


module.exports = {
  createCash,
  getAllCash,
  getByCashier,
  getByContract,
  getByDate,
  getReceiptsByUser,
  getBillByUser,
  getCreditNByUser,
  getDebitNByUser

};
