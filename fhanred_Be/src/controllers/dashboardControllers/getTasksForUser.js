const response = require('../../utils/response');
const { TaskAsign } = require('../../data');

module.exports = async (req, res) => {
    try {
        const { n_documento } = req.params;
        
        // Obtener las tareas asignadas al usuario con el número de documento proporcionado
        const assignments = await TaskAsign.findAll({ where: { n_documento } });

        // Responder con las asignaciones obtenidas
        response(res, 200, { assignments });
    } catch (error) {
        console.error('Error al obtener las tareas asignadas para un usuario:', error);
        response(res, 500, { error: 'Error interno del servidor' });
    }
};
