const Sequelize = require('sequelize')
const db = require('./database')

const Tamagotchi = db.define('tamagotchi', {
  name: {
    type: Sequelize.STRING({
      allowNull: false,
      validate: {
        notEmpty: true
      }
    })
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 100
  },
  qty: {
    type: Sequelize.INTEGER
  },
  age: {
    type: Sequelize.STRING,
    defaultValue: 'egg',
    validate: {
      isIn: [['egg', 'baby', 'preteen', 'teen', 'adult', 'senior', 'boomer']]
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.imgur.com/6QbFvy9.png'
  }
})

module.exports = Tamagotchi
