const router = require('express').Router()
const {Review, User, Tamagotchi} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({include: [User, Tamagotchi]})
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId, {
      include: [User, Tamagotchi]
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})

router.delete('/:Id', (req, res, next) => {
  Review.destroy({
    where: {
      id: req.params.reviewId
    }
  })
    .then(() => res.status(204).end())
    .catch(next)
})

router.put('/:reviewId', async (request, response, next) => {
  try {
    const review = await Review.findByPk(request.params.reviewId)
    await review.update(request.body)
    response.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
