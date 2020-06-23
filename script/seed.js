'use strict'

const db = require('../server/db')
const faker = require('faker')
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

  for (let i = 0; i < 100; i++) {
    await Tamagotchi.create({
      name: faker.name.firstName() + 'atchi',
      imageUrl: faker.random.arrayElement([
        'https://www.pinclipart.com/picdir/middle/329-3290728_tamagotchi-id-l-15th-anniversary-version-characters-tamagotchi.png',
        'https://www.clipartmax.com/png/middle/283-2831529_mametchi-anime-winking-tamagotchi-characters-mametchi.png',
        'https://library.kissclipart.com/20181214/gw/kissclipart-gozarutchi-my-tamagotchi-forever-clipart-mametchi-db06e8f6f440b26a.jpg',
        'https://vignette.wikia.nocookie.net/tamagotchi/images/a/ab/Sebiretchi_Large.png/revision/latest?cb=20110909104100',
        'https://img.favpng.com/15/3/19/mametchi-kuchipatchi-tamagotchi-id-character-png-favpng-NKgJFcBvU6CzHYS3YnZtSKuDB.jpg',
        'https://www.clipartmax.com/png/middle/287-2874563_thumbnail-for-version-as-of-tamagotchi-chantotchi.png',
        'https://webstockreview.net/images/einstein-clipart-kawaii-5.png',
        'https://f0.pngfuel.com/png/121/457/cartoon-illustration-png-clip-art-thumbnail.png',
        'https://c7.uihere.com/files/619/725/270/5bb927493a8de.jpg',
        'https://cdn.imgbin.com/22/12/24/imgbin-tamagotchi-keyword-tool-smiley-memetchi-Sr6M4Pq39cm2nzq6hy4FC4Eja.jpg',
        'https://i.pinimg.com/originals/56/01/da/5601da181f76cea67bebf0091221ec12.png',
        'https://img.favpng.com/14/13/19/tamagotchi-t-shirt-digital-pet-hoodie-clip-art-png-favpng-8PdtuELWV15jevyVj18Qmcpia.jpg',
        'https://www.clipartmax.com/png/middle/91-918288_tamagotchi-yume-kira-dream-tamagotchi-memetchi.png',
        'https://i.pinimg.com/originals/44/07/58/440758b8e8622297f27e27806b9e66fe.png',
        'https://f0.pngfuel.com/png/588/904/orange-character-clip-art-png-clip-art-thumbnail.png'
      ]),
      qty: faker.random.number({
        min: 0,
        max: 100
      }),
      description: faker.lorem.sentences(),
      age: faker.random.arrayElement([
        'egg',
        'baby',
        'preteen',
        'teen',
        'adult',
        'senior',
        'boomer'
      ])
    })
  }

  // const tamagotchis = await Promise.all([
  //   Tamagotchi.create({ id: 1, name: 'Didi', age: 'preteen', qty: '3' }),
  //   Tamagotchi.create({ id: 2, name: 'Xavi', age: 'senior', qty: '2' }),
  //   Tamagotchi.create({ id: 3, name: 'Malani', age: 'senior', qty: '100' }),
  //   Tamagotchi.create({ id: 4, name: 'Xiaobao', age: 'adult', qty: '20' }),
  //   Tamagotchi.create({
  //     id: 5,
  //     name: 'Godzilla',
  //     age: 'boomer',
  //     qty: '1',
  //     price: '1000000000'
  //   })
  // ])

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
  // await TamagotchiOrder.bulkCreate([
  //   {
  //     orderId: 1,
  //     tamagotchiId: 1
  //   }
  // ])
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
