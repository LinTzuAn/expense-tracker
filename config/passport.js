const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy({ 
      usernameField: 'email', 
      passReqToCallback: true 
    }, 
    async (req, email, password, done) => {
      try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null, false, { message: 'No user by that email' });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'incorrect password'} )
      }
      return done(null, user)
      } catch (err) {
        console.log(err)
      }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser( async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
}
