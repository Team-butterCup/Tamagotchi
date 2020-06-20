const router = require('express').Router()
const axios = require('axios')
const Sequelize = require('sequelize')
const {User, Tamagotchi, Order, TamagotchiOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({include: [User, Tamagotchi]})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [User, Tamagotchi]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  //console.log('req.body', req.body)
  try {
    const order = await Order.findOrCreate({
      where: {
        status: 'cart',
        userId: req.user.id
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/:orderId', async (req, res, next) => {
  try {
    // const orderId = req.body.orderId
    // const tamagotchiId = req.body.tamagotchiId
    // Here is how we could do it using magic methods
    // const order = await Order.findByPk(orderId)
    // const tamagotchi = await Tamagotchi.findByPk(tamagotchiId)
    // await order.addTamagotchi(tamagotchi)

    const tamagotchiOrder = await TamagotchiOrder.findOrCreate({
      where: req.body
    })

    res.json(tamagotchiOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    await TamagotchiOrder.update(
      {
        qty: Sequelize.literal('qty + 1')
      },
      {
        where: req.body
      }
    )
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await TamagotchiOrder.destroy({
      where: req.body
    })
  } catch (err) {
    next(err)
  }
})
