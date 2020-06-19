'use strict'

const db = require('../server/db')
const {
  User,
  TamagotchiOrder,
  Tamagotchi,
  Order,
  Review
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'admin@email.com', password: '123', isAdmin: true})
  ])

  const tamagotchis = await Promise.all([
    Tamagotchi.create({id: 1, name: 'Didi', age: 'preteen', qty: '3'}),
    Tamagotchi.create({id: 2, name: 'Xavi', age: 'senior', qty: '2'}),
    Tamagotchi.create({id: 3, name: 'Malani', age: 'senior', qty: '100'}),
    Tamagotchi.create({id: 4, name: 'Xiaobao', age: 'adult', qty: '20'}),
    Tamagotchi.create({
      id: 5,
      name: 'Godzilla',
      age: 'boomer',
      qty: '1',
      price: '1000000000'
    })
  ])

  const reviews = await Promise.all([
    Review.create({
      userId: 1,
      tamagotchiId: 1
    }),
    Review.create({
      userId: 2,
      tamagotchiId: 3
    }),
    Review.create({
      userId: 3,
      tamagotchiId: 5
    })
  ])
  const orders = await Promise.all([
    Order.create({}),
    Order.create({}),
    Order.create({})
  ])
  await TamagotchiOrder.bulkCreate([
    {
      orderId: 1,
      tamagotchiId: 1
    }
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  //console.log(Object.keys(users[0].__proto__))
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
