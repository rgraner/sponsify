const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../models/pool');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      if (!rows.length) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    const user = rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;