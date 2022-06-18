// 引入 Express and Express router
const express = require('express')
const router = express.Router()

// 引入 User model
const User = require('../../models/user')

router.get('/login', (req, res) => {
  return res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  return res.render('register')
})

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

router.get('/logout', (req, res) => {

})


module.exports = router