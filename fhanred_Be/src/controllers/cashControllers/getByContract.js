const { Cash } = require('../../data'); 
const response = require("../../utils/response");

module.exports = async (req, res) => {
    const { contract } = req.params;
    try {
      const ingresos = await Cash.findAll({
        where: { contract }
      });
      res.status(200).json(ingresos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }