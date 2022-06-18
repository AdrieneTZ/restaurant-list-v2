// 引入 Express and Express router
const express = require('express')
const router = express.Router()

// 引入 User model
const User = require('../../models/user')

router.get('/login', (req, res) => {
  return res.render('login')
})

module.exports = router