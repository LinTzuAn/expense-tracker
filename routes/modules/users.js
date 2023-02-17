const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: 'Please fill in all the blanks.' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: 'Passwords do not match.' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    const user = await User.findOne({ email })
    if (user) {
      errors.push({ message: 'This email address has been taken.' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    await User.create({
      name,
      email,
      password,
    })
    res.redirect('/users/login')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router