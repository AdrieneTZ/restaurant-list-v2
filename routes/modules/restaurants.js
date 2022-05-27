const express = require('express')
const router = express.Router()

const ReataurantList = require('../../models/restaurantList')

router.get('/:id', (req, res) => {
  const id = req.params.id

  return ReataurantList.findById(id)
    .lean()
    .then(list => res.render('detail', { list }))
    .catch(error => console.log(error))
})

module.exports = router