const { User } = require("../data");
const response = require("../utils/response");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/envs");

module.exports = async (req, res) => {


 
      let user = req.user;

      if (!user.active) {
        // Si el usuario no está activo, enviar una respuesta de error.
        res.status(401).json({ error: "El usuario ha sido dado de baja." });
        return;
      }
      //Crear el token JWT con los datos del usuario.
      const payload = {
        id: user.n_documento,
        email: user.email,
      };
      const token = jwt.sign(payload, `${JWT_SECRET_KEY}`, {
        expiresIn: "1d",
      });
      
      response(res, 200, {
        token: token,
        user: payload
      });
    
  
};
