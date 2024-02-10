const { Cash } = require('../../data'); 
const response = require("../../utils/response");

module.exports = async (req, res) => {
    try {
        const ingresos = await Cash.findAll();
        response(res, 200, ingresos);
    } catch (error) {
        console.error("Error al obtener los ingresos:", error);
        response(res, 500, { message: "Error al obtener los ingresos." });
    }
}; 