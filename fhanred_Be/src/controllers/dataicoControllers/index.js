const getCreditNByRange = require("./getCreditNByRange");
const getDebitNByRange = require("./getDebitNByRange");
const getBillsByRange = require("./getBillsByRange");
const saveBillsByRange= require("./saveBillsByRange")
const saveCreditByRange=require("./saveCreditByRange")
const saveDebitByRange = require("./saveDebitByRange")

module.exports = {
  getCreditNByRange,
  getDebitNByRange,
  getBillsByRange, 
  saveBillsByRange,
  saveCreditByRange,
  saveDebitByRange
};