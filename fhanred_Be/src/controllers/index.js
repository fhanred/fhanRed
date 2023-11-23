const { catchedAsync } = require("../utils");
module.exports = {
  createUser: catchedAsync(require("./createUser")),
  listUsers: catchedAsync(require("./listUsers")),
  getUser: catchedAsync(require("./getUser")),
  createContract: catchedAsync(require("./createContract")),
  signUser: catchedAsync(require("./signUser")),
  auth: catchedAsync(require("./auth")),
};

//exportamos como una propiedad de lo que exporta  modulo  indexjs
