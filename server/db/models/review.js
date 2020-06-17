const Sequelize = require('sequelize')
const db = require('./database')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Review
