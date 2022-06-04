const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurantList')

// route to create list page
router.get('/new', (req, res) => {
  return res.render('new')
})

// route to get the list from create list page
router.post('/', (req, res) => {

  return RestaurantList.create(req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// route to detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
  .lean()
  .then(list => res.render('detail', { list }))
  .catch(error => console.log(error))
})

// router to edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return RestaurantList.findById(id)
  .lean()
  .then(list => res.render('edit', { list }))
  .catch(error => console.log(error))
})

// router to get the edited list and send it to the database
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return RestaurantList.findByIdAndUpdate(id, req.body, { new: true })
    .then(updateList => { return updateList.save() })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// route to delete a list
router.delete('/:id', (req, res) => {
  const id = req.params.id

  return RestaurantList.findByIdAndRemove(id)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

module.exports = router