const Sequelize = require('sequelize')
const db = require('../db')

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
    type: Sequelize.TEXT,
    defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
})

module.exports = Review
