const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// requiring in our custom isAdmin middlware
const {isAdmin} = require('../middleware')

// adding in our custom middleware to our route
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
