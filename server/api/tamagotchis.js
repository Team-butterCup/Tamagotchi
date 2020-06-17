const router = require('express').Router()
const {Tamagotchi} = require('../db/models')
router.get('/', async (req, res, next) => {
  try {
    const tamagotchi = await Tamagotchi.findAll()
    res.json(tamagotchi)
  } catch (error) {
    next(error)
  }
})
router.get('/:tamagotchiId', async (req, res, next) => {
  try {
    const tamagotchi = await Tamagotchi.findByPk(req.params.tamagotchiId)
    if (!tamagotchi) {
      return res.status(404)
    } else {
      res.json(tamagotchi)
    }
  } catch (error) {
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      imageUrl
    } = req.body.newTamagotchi
    const newTamagotchi = await Tamagotchi.create({
      name,
      description,
      price,
      quantity,
      imageUrl
    })
    res.status(201).json(newTamagotchi)
  } catch (err) {
    next(err)
  }
})
router.delete('/:tamagotchiId', async (req, res, next) => {
  try {
    const tamagotchi = await Tamagotchi.findByPk(req.params.tamagotchiId)
    if (!tamagotchi) return res.sendStatus(404)
    await tamagotchi.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
router.put('/:tamagotchiId', async (req, res, next) => {
  try {
    const tamagotchi = await Tamagotchi.findByPk(req.params.tamagotchiId)
    if (!tamagotchi) return res.sendStatus(404)
    await tamagotchi.update(req.body)
    res.json(tamagotchi)
  } catch (err) {
    next(err)
  }
})
module.exports = router
