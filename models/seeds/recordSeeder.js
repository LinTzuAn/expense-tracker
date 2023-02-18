const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '1234'
}

const SEED_RECORD = { 
  name: '午餐',
  date: '2019.4.23',
  amount: 60,
  category: '餐飲食品'
};

db.once('open', async () => {
  try {
    const hash = await bcrypt.hash(SEED_USER.password, 10)
    const newUser = await User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    })
    const categoryItem = await Category.findOne({ name: SEED_RECORD.category})
    SEED_RECORD.userId = newUser._id
    SEED_RECORD.categoryId = categoryItem._id
    await Record.create( SEED_RECORD )
    console.log('record created')
    process.exit()
  } catch (error) {
    console.log(error)
  }
})
