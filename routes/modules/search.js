const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantList')

// route to search result page
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const regexKeyword = new RegExp(keyword, 'i')

  if (!keyword.trim()) {res.redirect('/')}

  return RestaurantList.find({ $or: [{ name: regexKeyword }, { name_en: regexKeyword }, { category: regexKeyword }] })
    .lean()
    .then(searchResult => res.render('search', { searchResult, keyword }))
    .catch(error => console.log(error))
})

module.exports = router