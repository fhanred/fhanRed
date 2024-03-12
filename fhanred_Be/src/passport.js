const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User, Role } = require("./data");
// Estrategia Local

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {

      try {
        const user = await User.findOne({ where: { email }, include: Role });
        // console.log('User: ', user)
        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }
        return done(null, user);
      } catch (error) {
        console.error("Error en estrategia local:", error);
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
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  module.exports = {passport };

