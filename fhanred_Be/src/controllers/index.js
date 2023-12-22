const { catchedAsync } = require("../utils");
module.exports = {
  createUser: catchedAsync(require("./createUser")),
  listUsers: catchedAsync(require("./listUsers")),
  getUser: catchedAsync(require("./getUser")),
  createContract: catchedAsync(require("./createContract")),
  signUser: catchedAsync(require("./signUser")),
  auth: catchedAsync(require("./auth")),
  chargeContract: catchedAsync(require("./chargeContract"))
};

//exportamos como una propiedad de lo que exporta  modulo  indexjs
