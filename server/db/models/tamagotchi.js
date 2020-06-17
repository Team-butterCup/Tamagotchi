const Sequelize = require('sequelize')
const db = require('../db')

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
    type: Sequelize.TEXT,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 100
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0
    }
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
