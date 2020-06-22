// custom middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // if user is logged in and is an admin, go to next matching route
    next()
  } else {
    // else send back an authorized status with some sort of custom message
    res.status(401).send('unauthorized')
  }
}

// you can create other custom middleware and export them below

module.exports = {
  isAdmin
}
