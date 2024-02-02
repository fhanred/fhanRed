const { User} = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
const {n_documento} = req.params;
  const user = await User.findByPk(n_documento);
  response(res, 200,  user );
}; 
