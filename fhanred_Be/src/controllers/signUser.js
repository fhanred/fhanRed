const bcrypt = require("bcrypt");
const { User } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  const user = req.body;

  hash = await bcrypt.hash(user.password, 10); //encrypt the password so as not to save it in plain text
  // create an error instance to handle create error with parameters that are unique
  await User.create({
    name_razonSocial: user.name_razonSocial.trim(),
    sexo: user.sexo[0],
    tipo_persona: user.tipo_persona,
    password: hash,
    tipo_documento: user.tipo_documento,
    fecha_cumple: user.fecha_cumple,
    n_documento: user.n_documento,
    email: user.email,
    id_role: 3,
  });
  response(res, 201, "The user has been created successfully");
};
