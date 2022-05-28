// 載入 Express and Express router
const express = require('express')
const router = express.Router()

// 載入 restaurant model
const RestaurantList = require('../../models/restaurantList')

router.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(lists => res.render('index', { lists }))
    .catch(error => console.log(error))
})

module.exports = router
