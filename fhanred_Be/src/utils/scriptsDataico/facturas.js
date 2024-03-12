const cron = require('node-cron');
const { exec } = require('child_process');


cron.schedule('0 9 * * *', () => {
    console.log('Ejecutando tarea para obtener y guardar facturas...');
    exec('node src/utils/scriptsDataico/facturas.js', (error, stdout, stderr) => {
       
    });
}, {
    scheduled: true,
    timezone: 'America/Bogota' 
});


const obtenerYGuardarFacturas = () => {
   
};


obtenerYGuardarFacturas();
