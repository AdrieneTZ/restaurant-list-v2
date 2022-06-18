// 載入套件
const express= require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// 引入路由器
const routes = require('./routes')

// import passport setting module
// create a function usePassport(), and this function will be called below
const usePassport = require('./config/passport')

// 載入連線 MongeDB 狀態
require('./config/mongoose')


const app = express()
const PORT = 3000


// 設定樣板引擎
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

//
app.use(session({
  secret: 'TopSecret',
  resave: false,
  saveUninitialized: true
}))

// 使用靜態資料
app.use(express.static('public'))

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定 methodOverride
app.use(methodOverride('_method'))

// invoke function usePassport(), app is an argument from passport.js
usePassport(app)

// 將 request 導入路由器
app.use(routes)


// 啟動 Server
app.listen(PORT, () => {
  console.log(`App is runnung on http://localhost:${PORT}`)
})