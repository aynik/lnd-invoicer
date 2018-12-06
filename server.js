const url = require('url')
const express = require('express')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator/check')
const next = require('next')
const { createServer } = require('http')
const sslRedirect = require('heroku-ssl-redirect')
const expressSession = require('express-session')
const SessionMongoStore = require('connect-mongo')(expressSession)
const nextAuth = require('next-auth')

process.env.PORT = parseInt(process.env.PORT, 10) || 4000
process.env.NODE_ENV = process.env.NODE_ENV || 'development' 

process.env.MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/invoicer'

process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'

const objects = require('./objects')

const { db, auth, throttler, grpc } = objects()

const nextApp = next({
  dev: process.env.NODE_ENV === 'development'
})

nextApp.prepare().then(async () => {
  const app = express()
  const server = createServer(app)

  app.use(sslRedirect())

  const sessionStore = new SessionMongoStore({
    mongooseConnection: db.mongoose.connection,
    collection: 'sessions'
  })

  await nextAuth(nextApp, {
    sessionSecret: process.env.SECRET,
    sessionMaxAge: 60000 * 60 * 24 * 7,
    sessionRevalidateAge: 60000,
    serverUrl: process.env.SERVER_URL || null,
    expressSession,
    sessionStore,
    providers: [],
    functions: auth,
    expressApp: app
  })

  const nextHandler = nextApp.getRequestHandler()

  app.post('/link-up', [
    check('alias').custom((value, { req }) => (
      db.findUserBy({ alias: value }).then((user) => {
	if (user && req.user.alias !== user.alias) {
	  return Promise.reject('Alias already in use')
	}
      })
    )),
    check('address').matches(/[^\:]+:[0-9]{1,5}/),
    check('macaroon').matches(/[a-f0-9]+/),
    check('cert').matches(/[a-f0-9]+/)
  ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      })
    }
    try {
      await db.modifyUserBy({_id: req.user.id}, {
        alias: req.body.alias,
        address: req.body.address,
        macaroon: new Buffer(req.body.macaroon, 'hex'),
        cert: new Buffer(req.body.cert, 'hex')
      })
    } catch (err) {
      return res.status(500)
    }
    res.redirect(`/${req.body.alias}`)
  })

  app.get('/:alias', async (req, res) => {
    const user = await db.findUserBy({ alias: req.params.alias })
    if (!user) return nextHandler(req, res)
    nextApp.render(req, res, '/payment-link', {}) 
  })

  app.get('/:alias/invoice', throttler.middleware(1, 10), async (req, res) => {
    const user = await db.findUserBy({ alias: req.params.alias })
    if (!user) return nextHandler(req, res)
    const ln = await grpc.connect('lnrpc.proto', 
      user.address,
      user.macaroon.buffer.toString('hex'),
      user.cert.buffer)
    const payReq = await new Promise((resolve, reject) => {
      ln.addInvoice({
        memo: `Payment sent through ${process.env.APP_DOMAIN}`,
        value: parseInt(req.query.amount, 10) || 0
      }, (err, data) => {
        ln.close()
        if (err) return reject(err)
        resolve(data.payment_request)
      })
    })
    res.status(200).send(payReq)
  })

  app.get('*', nextHandler)

  server.listen(process.env.PORT, (err) => {
    if (err) throw err
    console.log(`next: http://localhost:${process.env.PORT}`)
  })
})
