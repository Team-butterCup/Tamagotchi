const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart',
    validate: {
      isIn: [['cart', 'complete']]
    }
  }
})

module.exports = Order
