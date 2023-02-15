const express = require('express')
const exphbs = require('express-handlebars')
const router = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(router)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})