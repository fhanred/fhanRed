const response = require("../utils/response");
const Cash = require("../data"); 

const getAllReceipts = async (req, res) => {
  try {
   
    const receipts = await Cash.findAll();

    
    response(res, 200, receipts);
  } catch (error) {
    console.error('Error:', error);
   ror
    response(res, 500, 'Error interno del servidor');
  }
};

module.exports = {
  getAllReceipts
};