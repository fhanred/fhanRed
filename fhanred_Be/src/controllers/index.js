const { catchedAsync } = require("../utils");
module.exports = {
  createUser: catchedAsync(require("./createUser")),
  listUsers: catchedAsync(require("./listUsers")),
  getUser: catchedAsync(require("./getUser")),
};

//exportamos como una propiedad de lo que exporta  modulo  indexjs
