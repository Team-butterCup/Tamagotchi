const router = require('express').Router()
const {User, Order} = require('../db/models')

const {isAdmin} = require('../middleware')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [Order]
    })
    if (!user) {
      return res.status(404)
    } else {
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next)
})

router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    console.log('Req.Params:', req.params)
    const singleUser = await User.findByPk(req.params.userId)
    if (!singleUser) return res.sendStatus(404)
    await singleUser.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isAdmin, async (request, response, next) => {
  try {
    const singleUser = await User.findByPk(request.params.userId)
    await singleUser.update(request.body)
    response.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
