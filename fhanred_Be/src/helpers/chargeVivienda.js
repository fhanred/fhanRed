const { Vivienda } = require('../data');

module.exports = async () => {
  const viviendas = await Vivienda.findAll();
  const list = [
    { id: 1, name_type: 'Alquilada' },
    { id: 2, name_type: 'Propia' },
    { id: 3, name_type: 'Familiar' },
    { id: 4, name_type: 'Tienda' },
    { id: 5, name_type: 'Instituciones' },
    { id: 6, name_type: 'Edificio' },
    { id: 7, name_type: 'Hostal/Hotel' },
    { id: 8, name_type: 'Finca' },
    { id: 9, name_type: 'Cabaña' },
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
