const { catchedAsync } = require("../utils");
module.exports = {
  createUser: catchedAsync(require("./createUser")),
  listUsers: catchedAsync(require("./listUsers")),
  getUser: catchedAsync(require("./getUser")),
  createContract: catchedAsync(require("./createContract")),
  auth: catchedAsync(require("./auth")),
  chargeContract: catchedAsync(require("./chargeContract")),
  getContract: catchedAsync(require("./getContract"))
};

//exportamos como una propiedad de lo que exporta  modulo  indexjs
