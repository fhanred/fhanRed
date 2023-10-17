const { User } = require('../data');
const response = require('../utils/response');



module.exports = async (req,res) => {

  const user = req.body
  console.log(user)
  await User.create(user);
  response(res,201, "success") 
}
