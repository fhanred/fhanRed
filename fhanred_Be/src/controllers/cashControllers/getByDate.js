const { Cash } = require('../../data'); 
const response = require("../../utils/response");

module.exports = async (req, res) => {
    const { paymentDate } = req.query;
    try {
      const ingresos = await Cash.findAll({
        where: { paymentDate }
      });
      res.status(200).json(ingresos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }