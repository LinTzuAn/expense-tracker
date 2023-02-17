const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', async (req, res) => {
  async function findOrCreate(name) {
    const found = await Category.findOne({ name }).lean()
    if (!found) {
      const create = await Category.create({ name }).lean()
      return create
    }
    return found
  }
  try {
    const userId = req.user._id
    const categoryItem = await findOrCreate(req.body.category)
    const categoryId = categoryItem._id
    await Record.create({ ...req.body, userId, categoryId})
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router