const express = require('express')
const session = reuiqre('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const router = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(router)

app.use(methodOverride('_method'))

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})