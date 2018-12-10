const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  alias: String,
  address: String,
  macaroon: Buffer,
  cert: Buffer,
  email: String,
  emailToken: String,
  emailVerified: Boolean 
}, { versionKey: false })

userSchema.index({ alias: 1, email: 1, emailToken: 1 })

if (!userSchema.options.toObject)
  userSchema.options.toObject = {}

userSchema.options.toObject.transform = function (doc, ret) {
  if (doc.macaroon)
    ret.macaroon = doc.macaroon.toString('hex')
  if (doc.cert)
    ret.cert = doc.cert.toString('hex')
  return ret
}

const User = mongoose.model('User', userSchema)

class Db {
  constructor (objects) {
    this.objects = objects
    this.mongoose = mongoose
    this.mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true
    })
  }

  async createUser (input) {
    return await User.create(input)
  }

  async findUserBy (query) {
    return await User.findOne(query)
  }

  async updateUserBy (query, input) {
    return await User.findOneAndUpdate(query, { $set: input })
  }

  async modifyUserBy (query, input) {
    return await User.update(query, { $set: input })
  }

  async removeUserBy (query) {
    return await User.remove(query)
  }
}

module.exports = Db
