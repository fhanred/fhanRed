
const  {data  }= require("./users.js");
const { User } = require("../data"); 

module.exports = async () => {
    const data1 = data.map((e) => {
        return {
            name_razon_social: e.name_razon_social,
            sexo: e.sexo,
            tipo_persona: e.tipo_persona.trim(),
            tipo_documento: e.tipo_documento,
            fecha_cumple: e.fecha_cumple,
            n_documento: e.n_documento,
            email:e.email
        };
      });
    
  const users = await User.findAll();
 
  if (users.length <= 0) {
    const users = data1 ? data1.map((e) => {
      return  {
        name_razonSocial: e.name_razon_social.trim(),
        sexo: e.sexo[0],
        tipo_persona: e.tipo_persona,
        tipo_documento: e.tipo_documento,
        fecha_cumple: e.fecha_cumple,
        n_documento: e.n_documento,
        email:e.email,
        id_role: 1
      }
    }) : [];
    await User.bulkCreate(users);
    return users;
  }
  return users;
} 



