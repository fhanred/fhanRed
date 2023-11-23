const LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
const bcrypt = require("bcrypt");
const { User } = require("./data");
// Estrategia Local

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {

      try {
        const user = await User.findOne({ where: { email } });
        // console.log(user)
        if (!user) {
          return done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

  // Serialización del usuario
  passport.serializeUser((user, done) => {
    done(null, user.n_documento);
  });

  // Deserialización del usuario
  passport.deserializeUser(async (user, done) => {
    done(null, user);
  });
  module.exports = {passport };

