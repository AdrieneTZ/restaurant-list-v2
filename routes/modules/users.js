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
  User.findOne({ email })
    .then(user => {
      if (user) {
        return console.log('This email is already registered!')
      } else {
        User.create({ name, email, password })
      }
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// router: GET/ users/ logout
// invoke function logout(), which exposes from Passport.js, to clear the login session
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/users/login')
  })
})


module.exports = router