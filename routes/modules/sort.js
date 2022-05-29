const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantList')

// route to create list page
// router.get('/', (req, res) => {
//   RestaurantList.find()
//     .lean()
//     .sort({ _id: 'asc' })
//     .then(lists => res.render('index', { lists }))
//     .catch(error => console.log(error))
// })

// route to sort page: by A to Z
router.get('/AtoZ', (req, res) => {
  return RestaurantList.find()
    .lean()
    .sort({ name_en: 1 })
    .then(lists => res.render('sortAtoZ', { lists}))
})


module.exports = router