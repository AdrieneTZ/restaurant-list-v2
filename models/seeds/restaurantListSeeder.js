const RestaurantList = require('../restaurantList')
const seedsData = require('./restaurantData.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  seedsData.results.forEach(seed => {
    RestaurantList.create({
      name: `${seed.name}`,
      name_en: `${seed.name_en}`,
      category: `${seed.category}`,
      image: `${seed.image}`,
      location: `${seed.location}`,
      phone: `${seed.phone}`,
      google_map: `${seed.google_map}`,
      rating: `${seed.rating}`,
      description: `${seed.description}`
    })
  })

  console.log('restaurant Seed data created')
})