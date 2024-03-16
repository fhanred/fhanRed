const { User } = require("../data");
const response = require("../utils/response");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const user = req.body;
  console.log(user)
  
  if (user.apellidos && user.nombres) {
   
    user.name_razonSocial = `${user.apellidos.toUpperCase().trim()}, ${user.nombres.toUpperCase().trim()}`;
  } else if (user.razonSocial) {
    
    user.name_razonSocial = user.razonSocial.toUpperCase().trim();
  }

  user.email = user.email.toUpperCase().trim();

  
  const hash = await bcrypt.hash(user.password, 10); // <--- Aquí se corrige

  await User.create({
    name_razonSocial: user.name_razonSocial,
    sexo: user.sexo[0],
    tipo_persona: user.tipo_persona,
    tipo_documento: user.tipo_documento,
    fecha_cumple: user.fecha_cumple,
    n_documento: user.n_documento,
    email: user.email,
    password: hash,
    id_role: user.id_role || 1,
  });
  response(res, 201, "success");
};