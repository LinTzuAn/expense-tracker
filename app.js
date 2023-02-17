const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const router = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.use(methodOverride('_method'))

usePassport(app)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})