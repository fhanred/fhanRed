const response = require('../utils/response');
const { User } = require('../data');

module.exports.deleteUser = async (req, res) => {
    try {
        const { n_documento } = req.params;

        // Verificar si el usuario existe antes de eliminarlo
        const user = await User.findOne({ n_documento });
        if (!user) {
            return response(res, 404, { error: 'Usuario no encontrado' });
        }

        // Eliminar el usuario con el número de documento proporcionado
        await User.deleteOne({ n_documento });

        // Enviar una respuesta indicando que el usuario se eliminó correctamente
        return response(res, 200, { message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar un usuario:', error);
        return response(res, 500, { error: 'Error interno del servidor' });
    }
};
