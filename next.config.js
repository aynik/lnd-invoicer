const dotenvLoad = require('dotenv-load')
const nextEnv = require('next-env')
const nextCSS = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

dotenvLoad()

const withNextEnv = nextEnv({
  publicPrefix: 'APP_'
})

module.exports = withNextEnv(nextCSS())
