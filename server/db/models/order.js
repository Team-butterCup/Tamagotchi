const Sequelize = require('sequelize')
const db = require('./database')

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.FLOAT
  },

  qty: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['cart', 'complete']]
    }
  }
})

module.exports = Order
