const express = require('express')

const router = express.Router()

const ReataurantList = require('../../models/restaurantList')

// route to detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return ReataurantList.findById(id)
  .lean()
  .then(list => res.render('detail', { list }))
  .catch(error => console.log(error))
})

// route to search result page
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const regexKeyword = new RegExp(keyword, 'i')

  keyword.trim() ? keyword = req.query.keyword : res.redirect('/')

  return ReataurantList.find({ $or: [{ name: regexKeyword }, { name_en: regexKeyword }, { category: regexKeyword }] })
    .lean()
    .then(searchResult => res.render('search', { searchResult, keyword }))
    .catch(error => console.log(error))
})



module.exports = router