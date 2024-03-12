const { Cash } = require('../../data');
const { Op } = require('sequelize');
const response = require("../../utils/response");

module.exports = async (req, res) => {
    const { paymentDate } = req.params; // Obtener paymentDate de los parámetros de la ruta
    const startDateTime = new Date(paymentDate);
    startDateTime.setHours(0, 0, 0, 0); // Establecer hora a 00:00:00
    const endDateTime = new Date(paymentDate);
    endDateTime.setHours(23, 59, 59, 999); // Establecer hora a 23:59:59

    try {
        const ingresos = await Cash.findAll({
            where: {
                paymentDate: {
                    [Op.between]: [startDateTime, endDateTime]
                }
            }
        });
        res.status(200).json(ingresos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}