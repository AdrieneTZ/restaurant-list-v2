// import packages
const bcrypt = require('bcryptjs')

// in develope mode, import .env to get environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// import Schema models:
const User = require('../user')

// import database connection
const db = require('../../config/mongoose')

// import seed user data
const SEED_USER = require('./user.json')

// generate seed users
db.once('open', () => {
  function generateSeedUser (users) {
    return users.results.map(user => bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        email: user.email,
        password: hash,
        lists: user.lists
      }))
    )
  }

  return Promise.all(generateSeedUser(SEED_USER))
    .then(() => {
      console.log('Seed users are created!')
      process.exit()
    })
})