'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// SPE_API: '"http://localhost/spe-api/"'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
 
  SPE_API: '"https://api-v2.onewoorks-solutions.com/"'
})
