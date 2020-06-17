const db = require('../db')
const Sequelize = require('sequelize')
const User = require('./user')
const Tamagotchi = require('./tamagotchi')
const Order = require('./order')
const Review = require('./review')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

const TamagotchiOrder = db.define('TamagotchiOrder', {
  qty: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  purchasePrice: {
    type: Sequelize.FLOAT
  }
})

Order.belongsToMany(Tamagotchi, {
  through: TamagotchiOrder
})

Tamagotchi.belongsToMany(Order, {
  through: TamagotchiOrder
})

Order.belongsTo(User)
User.hasMany(Order)
Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Tamagotchi)
Tamagotchi.hasMany(Review)

module.exports = {
  User,
  Tamagotchi,
  Order,
  Review,
  TamagotchiOrder
}
