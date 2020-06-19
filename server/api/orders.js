const router = require('express').Router()
const {User, Tamagotchi, Order} = require('../db/models')
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

router.post('/', (req, res, next) => {
  Order.findOrCreate({
    where: {
      status: 'cart',
      userId: req.user.id
    }
  })
    .then(order => res.json(order))
    .catch(next)
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
