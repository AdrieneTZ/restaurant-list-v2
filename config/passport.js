// 載入 passport & LocalStrategy modules
const passport = require('passport')
const LocalStrategy = require('passport-local')

const User = require('../models/user')

// app: 匿名函示，將要被作為參數傳入 app.js
module.exports = app => {
  // initialize passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // set passport strategy: local strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'This email has not been registered!' })
          }
          if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password!'})
          }
          return done(null, user)
        })
        .catch(error => console.log(error))
    }
  ))

  // serialize & deserialize
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}