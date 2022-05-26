// 載入 mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number
  },
  description: {
    type: String,
    required: true
  }
})

// export schema and named it 'Todo'
module.exports = mongoose.model('ReataurantList', restaurantSchema)