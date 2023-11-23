/* const { ClientError } = require('../utils/errors');

module.exports = ( req,res, next ) => {
    const {name_razonSocial} = req.body;
    if (name_razonSocial) return next();
    else throw new ClientError("Falta el nombre de usuario", 401);
    
}; */