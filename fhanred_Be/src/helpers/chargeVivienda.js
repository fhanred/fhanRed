const { Vivienda } = require("../data");

module.exports = async () => {
  const viviendas = await Vivienda.findAll();
  const list = [
    { name_type: "Alquilada" },
    { name_type: "Propia" },
    { name_type: "Familiar" },
    { name_type: "Tienda" },
    { name_type: "Instituciones" },
    { name_type: "Edificio" },
    { name_type: "Hostal/Hotel" },
    { name_type: "Finca" },
    { name_type: "Cabaña" },
  ];

  if (viviendas.length <= 0) {
    const viviendas = list.map((e) => {
      return {
        name_type: e.name_type,
      };
    });
    await Vivienda.bulkCreate(viviendas);
    return viviendas;
  }
  return viviendas;
};
