const response = require("../../utils/response");
const { Task } = require('../../data'); // Asumiendo que Task es el modelo para las tareas

module.exports = async (req, res) => {
    try {
        const { taskId, nameTask } = req.body;

        // Crear la tarea con los datos proporcionados
        const newTask = await Task.create({ taskId, nameTask });

        // Enviar la respuesta con el nuevo objeto creado
        response(res, 200, { newTask: newTask });
    } catch (error) {
        console.error('Error al crear una nueva tarea:', error);
        response(res, 500, { error: 'Error interno del servidor' });
    }
};










