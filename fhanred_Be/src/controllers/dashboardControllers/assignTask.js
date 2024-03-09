const response = require('../../utils/response');
const { TaskAsign } = require('../../data');

module.exports = async (req, res) => {
    try {
        const { taskId, n_documento, turno } = req.body;
        
        // Asignar una tarea a un usuario con los datos proporcionados
        const newAssignment = await TaskAsign.create({ taskId, n_documento, turno });

        // Responder con la asignación creada
        response(res, 200, { newAssignment: newAssignment });
    } catch (error) {
        console.error('Error al crear una nueva tarea:', error);
        response(res, 500, { error: 'Error interno del servidor' });
    }
};
