// in develope mode, import .env to get environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// import Schema models:
const RestaurantList = require('../restaurantList')
const User = require('../user')

// import database connection
const db = require('../../config/mongoose')

// import seed restaurant data
const SEED_RESTAURANT = require('./restaurant.json')

// generate seed restaurant
db.once('open', () => {
  // find all users from DB
  // each user object has a property: `lists`: array of number
  // each restaurant has a property: `id`
  // check if `id` is in user.lists
  // if true: restaurant.userId = user._id, if fasle: restaurant.userId = ''
  // `restaurantWithUserId`: array of object
  return User.find()
    .then(users => {
      const restaurantWithUserId = SEED_RESTAURANT.results.map(restaurant => {
        const { id } = restaurant
        restaurant.userId = ''
        for (const user of users) {
          if (user.lists.includes(id)) {
            restaurant.userId = user._id
          }
        }
        return restaurant
      })
      return restaurantWithUserId
    })
    .then((restaurantWithUserId) => {
      return Promise.all(generateSeedRestaurant(restaurantWithUserId))
    })
    .then(() => {
      console.log('Seed restaurant lists are created!')
      process.exit()
    })

  function generateSeedRestaurant (lists) {
    return lists.map(list =>
      RestaurantList.create({
        id: list.id,
        name: list.name,
        name_en: list.name_en,
        category: list.category,
        image: list.image,
        location: list.location,
        phone: list.phone,
        google_map: list.google_map,
        rating: list.rating,
        description: list.description,
        userId: list.userId
      })
    )
  }
})
