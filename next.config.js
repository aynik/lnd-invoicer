const nextEnv = require('next-env')
const withCSS = require('@zeit/next-css')

const withNextEnv = nextEnv({
  publicPrefix: 'APP_'
})
 
module.exports = withNextEnv(withCSS())
