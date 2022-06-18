// import bcrypt
const bcrypt = require('bcryptjs')

// import passport & LocalStrategy & FacebookStrategy modules
const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')

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

          // use bcrypt to compare password
          // bcrypt.compare() returns a Boolean, passed to isMatch
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) {
                return done(null, false, { message: 'Incorrect email or password!'})
              }
              return done(null, user)
            })
        })
        .catch(error => console.log(error))
    }
  ))

  // set passport strategy: facebook strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['email', 'displayName']
  },
    function (accessToken, refreshToken, profile, done) {
      // profile._json { email: 'www', name: 'www', id: 'www' }
      const { email, name } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) {
            return done(null, user)
          }
          /**
           * create a set of random password to the user register with Facebook account
           * for password is a required property in the User model
           * this random password still have to be hashed by bcrypt.js
           * 36: a to z + 0 to 9
           * -10: last 10 characters
           */
          const randomPassword = Math.random().toString(36).slice(-10)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({ name, email, password: hash }))
            .then(user => done(null, user))
            .catch(error => console.log(error))
        })
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