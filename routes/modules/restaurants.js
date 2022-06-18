const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantList')

// route: GET/ restaurants/ new
// create list page
router.get('/new', (req, res) => {
  return res.render('new')
})

// route: POST/ restaurants
// receive list data from new page
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return RestaurantList.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId
  })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// route: GET/ restaurants/ :id
// to detail page of the restaurant list
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return RestaurantList.findOne({ userId, _id })
  .lean()
  .then(list => res.render('detail', { list }))
  .catch(error => console.log(error))
})

// router: GET/ restaurants/ :id/ edit
// to edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return RestaurantList.findOne({ userId, _id })
  .lean()
  .then(list => res.render('edit', { list }))
  .catch(error => console.log(error))
})

// router: PUT/ restaurants/ :id
// get the edited list and send it to the database
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return RestaurantList.findOneAndUpdate({ userId, _id }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// route: DELETE/ restaurants/ :id
// delete a list
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return RestaurantList.findOneAndRemove({ userId, _id })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

module.exports = router