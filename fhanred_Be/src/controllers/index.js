const { catchedAsync } = require("../utils");
module.exports = {
  createUser: catchedAsync(require("./createUser")),
 
};

//exportamos como una propiedad de lo que exporta  modulo  indexjs
