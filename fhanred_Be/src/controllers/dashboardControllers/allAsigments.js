const response = require('../../utils/response');
const { TaskAsign } = require('../../data');

module.exports = async (req, res) => {
    try {
        const allAssignments = await TaskAsign.findAll();

        response(res, 200, { assignments: allAssignments });
    } catch (error) {
        console.error('Error al obtener todas las tareas asignadas:', error);
        response(res, 500, { error: 'Error interno del servidor' });
    }
};