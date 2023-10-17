const { User, Role } = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
  const users = await User.findAll();
  response(res, 200, { users });
};
