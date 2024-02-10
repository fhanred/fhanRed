const { Cash } = require('../../data');
const response = require("../../utils/response");

module.exports = async (req, res) => {
    try {
        console.log(req.body);
        const ingresoData = req.body;

        // Obtener el último número de recibo
        const ultimoIngreso = await Cash.findOne({
            order: [['receipt', 'DESC']]
        });

        // Inicializar el número de recibo si no hay ningún recibo existente
        let receipt = 1;
        if (ultimoIngreso) {
            receipt = ultimoIngreso.receipt + 1;
        }

        // Asignar el número de recibo al nuevo ingreso
        ingresoData.receipt = receipt;

        // Crear el nuevo ingreso con el número de recibo asignado
        const newIngreso = await Cash.create(ingresoData);

        response(res, 200, {
            newIngreso: newIngreso
        });
    } catch (error) {
        console.error("Error al crear un nuevo ingreso:", error);
        response(res, 500, { error: "Error al crear un nuevo ingreso" });
    }
};
