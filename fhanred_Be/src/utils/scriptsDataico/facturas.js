const cron = require('node-cron');
const { exec } = require('child_process');

// Programar tarea para obtener y guardar facturas
cron.schedule('0 9 * * *', () => {
    console.log('Ejecutando tarea para obtener y guardar facturas...');
    exec('node src/utils/scriptsDataico/facturas.js', (error, stdout, stderr) => {
        // Manejar errores y salida estándar si es necesario
    });
}, {
    scheduled: true,
    timezone: 'America/Bogota' // Ajusta la zona horaria según tu ubicación
});

// Función que realiza la lógica para obtener y guardar facturas
const obtenerYGuardarFacturas = () => {
    // Lógica para obtener y guardar facturas aquí
};

// Llamar a la función para ejecutarla manualmente si es necesario
obtenerYGuardarFacturas();
