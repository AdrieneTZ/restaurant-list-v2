// 載入套件
const express= require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

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

// use connect-flash
app.use(flash())

// add middleware
/**
 * app.use(): this middleware is used to every router
 * req.isAuthenticated(): method from Passport.js, return Boolean
 * this Bollean is stored in variable `isAuthenticated`
 *
 * res.locals: from Express.js, an object stores the authentication state and user data for view
 * storing data in res.locals is a better way for the frequently used data
 *
 * req.user: from Passport.js library: "If authentication is successful, the user
 * will be logged in and populated at `req.user` and a session will be
 * established by default."
 * this user object, getting from passport deserializing, is stored in variable `user`
 *
 * both `isAuthenticated` and `user` are stored in res.locals and can be used in view template
 */
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user

  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')

  next()
})

// 將 request 導入路由器
app.use(routes)


// 啟動 Server
app.listen(PORT, () => {
  console.log(`App is runnung on http://localhost:${PORT}`)
})