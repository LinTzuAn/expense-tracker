const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

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
          return done(null, false, req.flash('warning_msg', 'No user by that email'));
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, req.flash('warning_msg', 'Email or Password incorrect.'))
        }
        return done(null, user)
      } catch (err) {
        done(err, false)
      }
  }))

  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['email', 'displayName']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, name } = profile._json
        const user = await User.findOne({ email })
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        const hash = await bcrypt.hash(randomPassword, 10)
        const created = await User.create({ name, email, password: hash })
        return (null, created)
      } catch(err) {
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
      done(err, null)
    }
  })
}
