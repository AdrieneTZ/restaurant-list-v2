const express = require('express')
const router = express.Router()

// import router modules
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')
// import middleware module
const { authenticator } = require('../middleware/auth')

// add authentication middleware to routes
router.use('/restaurants', authenticator, restaurants)
router.use('/search', search)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router