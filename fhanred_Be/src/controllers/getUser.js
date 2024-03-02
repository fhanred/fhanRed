const { User, Contract, Delivery, Vivienda, Plan } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  try {
    const { n_documento } = req.params;
    console.log(n_documento);
    const user = await User.findByPk(n_documento, {
      include: [
        {
          model: Contract,
          include: [{
            model: Delivery,
            attributes: ["municipio", "barrio_vereda", "direccion"],
            include: [
              {
                model: Vivienda,
                attributes: ["name_type"],
              },
            ],
          },
          {
            model: Plan
          },
          ],
        },
      ],
    });
    console.log(user);
    if (!user) {
      return response(res, 404, "Usuario no encontrado");
    }

    return response(res, 200, user);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return response(res, 500, "Error interno del servidor");
  }
};




// {
//   "Plan": {
//       "name_plan": "5 MG - BRONCE",
//       "costo": "56.000,00"
//   },
//   "municipio": "CUMARAL",
//   "direccion": "KILOMETRO 4 LOTE 3"
// }