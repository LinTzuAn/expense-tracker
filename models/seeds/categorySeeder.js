const Category = require('../category')
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const CATEGORY = [
  ['家居物業', 'fa-house'],
  ['交通出行', 'fa-van-shuttle'],
  ['休閒娛樂', 'fa-face-grin-beam'],
  ['餐飲食品', 'fa-utensils'],
  ['其他', 'fa-pen']
]

db.once('open' ,async () => {
  try {
    await Promise.all(
        Array.from(
          { length: 5 },
          (_, i) => Category.create({ name: CATEGORY[i][0], icon: CATEGORY[i][1] })
        )
      )
      console.log('category created.')
      process.exit()
  } catch (error) {
    console.log(error)
  }
})
