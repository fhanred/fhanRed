const { Cash } = require('../../data'); 
const response = require("../../utils/response");


module.exports = async (req, res) => {
    const { cashierName } = req.params;
    try {
      const ingresos = await Cash.findAll({
        where: { cashierName }
      });
      res.status(200).json(ingresos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
