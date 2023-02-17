const express = require('express')
const router = express.Router()

const home = require('../routes/modules/home')
const users = require('./modules/users')
const records = require('./modules/records')

const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/', authenticator, home)

module.exports = router