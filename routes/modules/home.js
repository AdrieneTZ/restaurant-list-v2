// 載入 Express and Express router
const express = require('express')
const router = express.Router()

// 載入 restaurant model
const RestaurantList = require('../../models/restaurantList')

router.get('/', (req, res) => {
  const userId = req.user._id
  const { sort, rating } = req.query

  let sorting = {}
  if (sort) sorting = { name_en: sort }
  else sorting = rating === 'highest' ? { rating: -1 } : { rating: 1 }

  RestaurantList.find({ userId })
    .lean()
    .sort(sorting)
    .then(lists => {
      res.render('index', { lists })
    })
    .catch(error => console.log(error))


})

module.exports = router
