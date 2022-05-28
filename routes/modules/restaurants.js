const express = require('express')
const router = express.Router()

const ReataurantList = require('../../models/restaurantList')

// route to create list page
router.get('/new', (req, res) => {
  return res.render('new')
})

// route to get the list from create list page
router.post('/', (req, res) => {
  return ReataurantList.create(req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// route to detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return ReataurantList.findById(id)
  .lean()
  .then(list => res.render('detail', { list }))
  .catch(error => console.log(error))
})

module.exports = router