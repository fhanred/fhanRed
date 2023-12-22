const { Plan } = require('../data');

module.exports = async () => {
  const planes = await Plan.findAll();
  const list = [
    {
      name_plan: '5 MG - BRONCE',
      costo: '56.000,00',
    },

    {
      name_plan: '7 MG - PLATA',
      costo: '66.000,00',
    },
    {
      name_plan: '10 MG - ORO',
      costo: '86.000,00',
    },
    {
      name_plan: '20 MG - PLATINO',
      costo: '126.000,00',
    },
    {
      name_plan: '30 MG - RUBI',
      costo: '185.000,00',
    },
    {
      name_plan: '50 MG - ZAFIRO',
      costo: '350.000,00',
    },
    {
      name_plan: '100 MG - ESMERALDA',
      costo: '620.000,00',
    },
    {
      name_plan: '200 MG - DIAMANTE',
      costo: ' 1.200.000,00',
    },
    {
      name_plan: '300 MG - CORONA',
      costo: '1.800.000,00',
    },
    {
      name_plan: '20 MG - DEDICADO',
      costo: '520.000,00',
    },
    {
      name_plan: '50 MG - DEDICADO',
      costo: '1.200.000,00',
    },
    {
      name_plan: '100 MG - DEDICADO',
      costo: '2.200.000,00',
    },
    {
      name_plan: '200 MG - DEDICADO',
      costo: '4.000.000,00',
    },
    {
      name_plan: '300 MG - DEDICADO',
      costo: '4.650.000,00',
    },
    {
      name_plan: '500 MG - DEDICADO',
      costo: '7.250.000,00',
    },
    {
      name_plan: '1000 MG - DEDICADO',
      costo: '14.000.000,00',
    },
    {
      name_plan: 'GRATIS',
      costo: '0,00',
    },
  ];

  if (planes.length <= 0) {
    const planes = list.map((e) => {
      return {
        name_plan: e.name_plan,
        costo: e.costo,
      };
    });
    await Plan.bulkCreate(planes);
    return planes;
  }
  return planes;
};
