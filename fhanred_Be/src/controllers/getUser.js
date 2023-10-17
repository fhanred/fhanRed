const { User} = require("../data");
const response = require("../utils/response");

module.exports = async (req, res) => {
    const {id} = req.params
    console.log(id ,req.params)
  const user = await User.findByPk(id);
  response(res, 200,  user );
};
