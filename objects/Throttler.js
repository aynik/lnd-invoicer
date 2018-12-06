const { RateLimiterMongo } = require('rate-limiter-flexible')

class Throttler {
  constructor (objects) {
    this.objects = objects
  }

  middleware (hits, seconds) {
    const { db } = this.objects  
    const limiter = new RateLimiterMongo({
      storeClient: db.mongoose.connection,
      points: 1,
      duration: 10
    })
    return (req, res, next) => {
      limiter.consume(req.connection.remoteAddress)
        .then(() => next())
        .catch((err) => res.status(429).send('Too Many Requests'))
    }
  }
}

module.exports = Throttler
