const response = require('../../utils/response');
const { TaskAsign } = require('../../data');

module.exports = async (req, res) => {
    try {
        const { id } = req.params; // Recibir el id de la tarea asignada a eliminar desde el cuerpo de la solicitud
        
        // Buscar y eliminar la tarea asignada por su id
        const deletedAssignment = await TaskAsign.destroy({ where: { id } });
                console.log(deletedAssignment,"probando eliminacion de tareas")
        if (deletedAssignment === 0) { // Si no se eliminó ninguna tarea (ninguna tarea tenía el id proporcionado)
            return response(res, 404, { error: 'La tarea asignada no fue encontrada.' });
        }

        // Responder con la tarea asignada eliminada
        response(res, 200, { message: 'Tarea asignada eliminada exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar la tarea asignada:', error);
        response(res, 500, { error: 'Error interno del servidor' });
    }
};

