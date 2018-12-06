const nextEnv = require('next-env')

const withNextEnv = nextEnv({
  publicPrefix: 'APP_'
})
 
module.exports = withNextEnv({})
