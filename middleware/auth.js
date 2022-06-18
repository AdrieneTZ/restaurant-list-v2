// req.isAuthenticated() is a function exposing from Passport.js, and returns true or false
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}