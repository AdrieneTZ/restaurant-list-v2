// 載入 monogoose
require('dotenv').config()
const mongoose = require('mongoose')

// 設定連線到 mongodb
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, { useUnifiedTopology: true })

// 取得跟資料庫連線狀態
const db = mongoose.connection

// 設定資料庫連線狀態
db.on('error', () => {
  console.log('failed connected to MongoDB')
})

db.once('open', () => {
  console.log('connected to MongoDB')
})

// 匯出資料庫的連線狀態到 db
module.exports = db