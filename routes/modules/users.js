const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', 
  (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      req.flash('warning_msg', 'Please enter email and password')
      return res.redirect('/users/login')
    }
    next()
  },
  passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have been logout successfully')
  res.redirect('/users/login')
})

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
    const hash = await bcrypt.hash(password, 10)
    await User.create({
      name,
      email,
      password: hash
    })
    res.redirect('/users/login')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router