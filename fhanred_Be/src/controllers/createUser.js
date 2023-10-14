const { User } = require('../data');



module.exports = async (user) => {
  
  await User.create(user.body);
  return "success"
}
