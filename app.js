// 載入套件
const express= require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// 引入路由器
const routes = require('./routes')
// 載入連線 MongeDB 狀態
require('./config/mongoose')


const app = express()
const PORT = 3000

// 將 request 導入路由器
app.use(routes)

// 設定樣板引擎
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))


// 啟動 Server
app.listen(PORT, () => {
  console.log(`App is runnung on http://localhost:${PORT}`)
})