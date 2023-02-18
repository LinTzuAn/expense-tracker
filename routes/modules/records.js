const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', async (req, res) => {
  async function findOrCreate(name) {
    const found = await Category.findOne({ name })
    if (!found) {
      const create = await Category.create({ name })
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

router.get('/filter', async (req, res) => {
  try {
    const option = req.query.category 

    if (option === 'default') {
      return res.redirect('/')
    }
  
    const filter = {
      default: {},
      a: {name: '家居物業'},
      b: {name: '交通出行'},
      c: {name: '休閒娛樂'},
      d: {name: '餐飲食品'},
      e: {name: '其他'},
    }
    const filterSelected = {[option]: true}
    const userId = req.user._id
    const category = await Category.findOne(filter[option])
    const categoryId = category._id
    const records = await Record.find({ categoryId, userId }).lean()
    res.render('index', { records, filterSelected })
  } catch(err) {
    console.log(err)
  }
})

router.get('/:id/edit', async(req, res) => {
  try{
    const _id = req.params.id
    const userId = req.user._id
    const record = await Record.findOne({ _id, userId }).lean()
    console.log('record', record)
    res.render('edit', { record })
  } catch(err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    await Record.findOneAndUpdate({ _id, userId }, req.body).lean()
    res.redirect(`/`) 
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try{
    const _id = req.params.id
    const userId = req.user._id
    await Record.findOneAndDelete({ _id, userId })
    res.redirect('/')
  } catch(err) {
    console.log(err)
  }
})

module.exports = router