// import Express and Express router
const express = require('express')
const router = express.Router()

// import passport
const passport = require('passport')

// router: GET/ auth/ facebook
// user choose to login with facebook
router.get('/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  })
)

// router: GET/ auth/ facebook/ callback
// as user accept authorization, facebook will redirect to this route
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: 'users/login'
  })
)


module.exports = router