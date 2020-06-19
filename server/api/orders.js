const router = require('express').Router()
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
  console.log('req.body', req.body)
  try {
    const order = await Order.findOrCreate({
      where: {
        status: 'cart',
        userId: req.user.id
      }
    })
    console.log('order', order)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/:Id', (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.orderId
    }
  })
    .then(() => res.status(204).end())
    .catch(next)
})

router.put('/:orderId', async (request, response, next) => {
  try {
    const order = await Order.findByPk(request.params.orderId)
    await order.update(request.body)
    response.sendStatus(204)
  } catch (err) {
    next(err)
  }
})