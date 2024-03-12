const response = require("../../utils/response");
const { Cash } = require('../../data');

module.exports = async (req, res) => {
    try {
        console.log(req.body);
        const ingresoData = req.body;

    
        const ultimoIngreso = await Cash.findOne({
            order: [['receipt', 'DESC']]
        });


        let receipt = 1;
        if (ultimoIngreso && ultimoIngreso.receipt) {
            receipt = ultimoIngreso.receipt + 1;
        }

       
        ingresoData.receipt = receipt;

       
        const newIngreso = await Cash.create(ingresoData);

        response(res, 200, {
            newIngreso: newIngreso
        });
    } catch (error) {
        console.error("Error al crear un nuevo ingreso:", error);
        response(res, 500, { error: "Error al crear un nuevo ingreso" });
    }
};
