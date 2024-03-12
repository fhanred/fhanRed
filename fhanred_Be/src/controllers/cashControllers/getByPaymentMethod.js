const { Cash } = require('../../data');
const response = require("../../utils/response");

module.exports = async (req, res) => {
    const { paymentMethod } = req.params;
    try {
        const cashForMethod = await Cash.findAll({ 
            where: { paymentMethod } 
        });

        res.status(200).json(cashForMethod);
    } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }