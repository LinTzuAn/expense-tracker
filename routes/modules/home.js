const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const records = await Record.find({ userId }).populate('categoryId').lean()
    let total = 0
    for (let i = 0; i < records.length; i++) {
      total += records[i].amount
    }
    total = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    res.render('index', { records, total })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router