// import Express and Express router
const express = require('express')
const router = express.Router()

// import User model
const User = require('../../models/user')

// import passport
const passport = require('passport')


// router: GET/ users/ login
router.get('/login', (req, res) => {
  return res.render('login')
})

// router: POST/ users/ login
// use middleware passport.authenticate() to authenticate request state
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'users/login'
}))

// router: GET/ users/ register
router.get('/register', (req, res) => {
  return res.render('register')
})

// router: POST/ users/ register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  // errors type
  // 1. at least one of the fields is empty
  // 2. password and confirmPassword are not the same
  // 3. email has already been registered
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and Confirm Password do not match!' })
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

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'This email is already registered!' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

// router: GET/ users/ logout
// invoke function logout(), which exposes from Passport.js, to clear the login session
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You have logged out.')
    res.redirect('/users/login')
  })
})


module.exports = router