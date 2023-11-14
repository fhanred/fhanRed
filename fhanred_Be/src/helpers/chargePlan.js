const { Plan } = require("../data");

module.exports = async () => {
  const planes = await Plan.findAll();
  const list = [
    {
      id: 0,
      name: "5 MB - BRONCE",
      costo: "56.000,00"
    },

    {
      id: 1,
      name: "7 MB - PLATA",
      costo: "66.000,00"
    },
    {
      id: 2,
      name: "10 MB - ORO",
      costo: "86.000,00"
    },
    {
      id: 3,
      name: "20 MB - PLATINO",
      costo: "126.000,00"
    },
  ];

  if (planes.length <= 0) {
    const planes = list.map((e) => {
      return {
        name: e.name,
        costo: e.costo
      };
    });
    await Plan.bulkCreate(planes);
    return planes;
  }
  return planes;
};
