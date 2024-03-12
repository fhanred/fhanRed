const app = require('./src/app.js');
const { conn } = require('./src/data');
const { PORT } = require('./src/config/envs.js');
const helpers = require('./src/helpers');
const sendNotifications = require('./src/controllers/sendNotifications.js')




// Syncing all the models at once.
conn.sync({ alter: true }).then(async () => {
  app.listen(PORT, () => {
    console.log(`🚀 listening on port: ${PORT} 🚀`);
  });
  await helpers.chargeRol();
  await helpers.chargePlan();
  await helpers.chargeVivienda();
  await helpers.chargeUsers();
  await helpers.chargeVivienda();
  //await helpers.chargeContratos();
  // await sendNotifications(); CUIDADO NO DESCOMENTAR HASTA QUE SE ENVIEN LOS DATOS
});
