const response = require('../utils/response');
const { User } = require('../data');
const bcrypt = require("bcrypt")
// Controlador para actualizar un usuario

module.exports = async (req, res) => {
    try {
        const { n_documento } = req.params;
        const {password, ...userData} = req.body;
        const user = await User.findOne({where:{n_documento}})
        if(!user){
            return response(res, 404,"usuario no encontrado")
        }
        const updateField = {}
        for(const key in userData){
            if(userData.hasOwnProperty(key)){
             if(userData[key] !== ""){
                updateField[key] = userData[key]
             }   
            }
        }

        if(password){
            const hashPassword = await bcrypt.hash(password, 10)
            updateField.password = hashPassword
        }
        if(Object.keys(updateField).length === 0){
            return response(res, 400, { 
                message: "No hay que actualizar datos"
            })
        }
        // Actualizar el usuario con el número de documento proporcionado
         await User.update(updateField,{where: {n_documento} });

        // Enviar la respuesta con el usuario actualizado
        response(res, 200, "Usuario actualizado");
    } catch (error) {
        console.error('Error al actualizar un usuario:', error);
        response(res, 500, { error: 'Error interno del servidor' });
    }
};