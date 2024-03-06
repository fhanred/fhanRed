const { Role } = require("../data");

module.exports = async () => {
  const roles = await Role.findAll();
  const list = [
    { id: 0, name: "Usuario" },

    { id: 1, name: "cliente" },

    {
      id: 2,
      name: "tecnico",
    },
    {
      id: 3,
      name: "cajero",
    },
    {
      id: 4,
      name: 'admin' 
    },
  ];

  if (roles.length <= 0) {
    const roles = list.map((e) => {
      return {
        name: e.name,
      };
    });
    await Role.bulkCreate(roles);
    return roles;
  }
  return roles;
};
