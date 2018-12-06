const nextAuth = require('next-auth')
const nodemailer = require('nodemailer')
const nodemailerSmtpTransport = require('nodemailer-smtp-transport')
const verifyEmailTmpl = require('../templates/verifyEmail')

const nodemailerTransport = nodemailerSmtpTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD 
  }
})

class Auth {
  constructor (objects) {
    this.objects = objects
    this.emailTransport = nodemailer
      .createTransport(nodemailerTransport)
  }

  find (query) {
    const { db } = this.objects
    return db.findUserBy(query)
  }

  insert (user) {
    const { db } = this.objects
    return db.createUser(user)
  }

  update (user) {
    const { db } = this.objects
    return db.updateUserBy({ _id: user.id }, user)
  }

  remove (id) {
    const { db } = this.objects
    return db.removeUserBy({ _id: id })
  }

  serialize (user) {
    return Promise.resolve(user.id)
  }

  deserialize (id) {
    const { db } = this.objects
    return db.findUserBy({ _id: id })
  }

  sendSignInEmail ({ email, url }) {
    this.emailTransport.sendMail({
      to: email,
      from: process.env.EMAIL_ADDRESS,
      subject: `Sign in link for ${process.env.APP_DOMAIN}`,
      text: 'Verify your email to log on to ' +
        `${process.env.APP_DOMAIN} using this link:\n\n${url}\n\n`,
      html: verifyEmailTmpl(url, process.env.APP_DOMAIN)
    })
  }

  genNextAuthConf (expressSession, sessionStore) {
    return { 
      functions: this 
    }
  }
}

module.exports = Auth
