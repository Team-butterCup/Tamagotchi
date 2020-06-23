const router = require('express').Router()
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
      include: [User, Tamagotchi, TamagotchiOrder]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  //console.log('req.body', req.body)
  try {
    let order
    if (!req.user) {
      const session = req.session
      if (!session.cartId) {
        order = await Order.create(req.body)
        session.cartId = order.id
        order = await Order.findByPk(session.cartId, {
          include: [Tamagotchi, User]
        })
      } else {
        order = await Order.findByPk(session.cartId, {
          include: [Tamagotchi, User]
        })
      }
      res.status(200).json(order)
    } else {
      console.log('WE ARE FIND OR CREATING!')
      order = await Order.findOrCreate({
        where: {
          status: 'cart',
          userId: req.user.id
        }
      })
      order = await Order.findByPk(order[0].id, {
        include: [Tamagotchi, User]
      })
      res.json(order)
    }
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

router.patch('/checkout', async (req, res, next) => {
  try {
    // const { updatedFields } = req.body;

    //first: how many instances of order; second: what you returned
    const [, userOrder] = await Order.update(
      {status: 'complete'},
      {
        where: {userId: req.user.id, status: 'cart'},
        returning: true,
        plain: true
      }
    )
    console.log('userOrder', userOrder)
    const orderItems = await TamagotchiOrder.findAll({
      where: {orderId: userOrder.id}
    })
    orderItems.forEach(async orderItem => {
      const tamagotchi = await Tamagotchi.findByPk(orderItem.tamagotchiId)
      await tamagotchi.update({qty: tamagotchi.qty - orderItem.qty})
    })
    const newOrder = await Order.create({userId: req.user.id, status: 'cart'})
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})
