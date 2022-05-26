// 載入套件
const express= require('express')

// 引入路由器
const routes = require('./routes')
// 載入連線 MongeDB 狀態
require('./config/mongoose')


const app = express()
const PORT = 3000

// 將 request 導入路由器
app.use(routes)




// 啟動 Server
app.listen(PORT, () => {
  console.log(`App is runnung on http://localhost:${PORT}`)
})