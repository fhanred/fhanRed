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
    {
      id: 4,
      name: "30 MB - RUBI",
      costo: "185.000,00"
    },
    {
      id: 5,
      name: "50 MB - ZAFIRO",
      costo: "350.000,00"
    },
    {
      id: 6,
      name: "100 MB - ESMERALDA",
      costo: "620.000,00"
    },
    {
      id: 7,
      name: "200 MB - DIAMANTE",
      costo: " 1.200.000,00"
    },
    {
      id: 9,
      name: "300 MB - CORONA",
      costo: "1.800.000,00"
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
