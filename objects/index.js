const Db = require('./Db')
const Auth = require('./Auth')
const Throttler = require('./Throttler')
const Grpc = require('./Grpc')

const objects = {}

module.exports = ({ exclude = [], include = {}} = {}) => {
  if (Object.keys(objects).length)
    return objects
  if (exclude.indexOf('db') === -1)
    objects.db = new Db(objects)
  if (include.Db)
    objects.db = new include.Db(objects)
  if (exclude.indexOf('auth') === -1)
    objects.auth = new Auth(objects)
  if (include.Auth)
    objects.auth = new include.Auth(objects)
  if (exclude.indexOf('throttler') === -1)
    objects.throttler = new Throttler(objects)
  if (include.Throttler)
    objects.throttler = new include.Throttler(objects)
  if (exclude.indexOf('grpc') === -1)
    objects.grpc = new Grpc(objects)
  if (include.Grpc)
    objects.grpc = new include.Grpc(objects)
  return objects
}
