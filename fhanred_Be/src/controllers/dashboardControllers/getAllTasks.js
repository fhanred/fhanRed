const response = require('../../utils/response');
const { Task } = require('../../data');

module.exports = async (req, res) => {
    try {
        // Obtener la lista de tareas
        if (req.method === 'GET') {
            const tasks = await Task.findAll();
            response(res, 200, { tasks });
        } else {
            response(res, 405, { error: 'Método no permitido' });
        }
    } catch (error) {
        console.error('Error al obtener la lista de tareas:', error);
        response(res, 500, { error: 'Error interno del servidor' });
    }
};
