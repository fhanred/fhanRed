const { User } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  const user = req.body;

  await User.create({
    name_razonSocial: user.name_razonSocial.trim(),
    sexo: user.sexo[0],
    tipo_persona: user.tipo_persona,
    tipo_documento: user.tipo_documento,
    fecha_cumple: user.fecha_cumple,
    n_documento: user.n_documento,
    email: user.email,
    id_role: user.id_role,
  });
  response(res, 201, "success");
};
