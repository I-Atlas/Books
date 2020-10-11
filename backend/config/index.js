const _defaultsDeep = require('lodash/defaultsDeep')
const env = process.env.NODE_ENV || 'development'

let localConfig
let config = {
  development: {
    db: {
      username: 'postgres',
      password: 'postgres',
      database: 'books',
      host: '127.0.0.1',
      dialect: 'postgres',
      logging: false
    },
    common: {
      jwtSecret: 'secret',
      accessTokenExpiresInSec: 172800,
      refreshTokenExpiresInSec: 604800,
      accessTokenExpiresIn: '2days',
      refreshTokenExpiresIn: '7days',
      url: 'http://localhost:5000',
      hashType: 'md5',
      hashKey: 'fusion',
      port: '6800',
      maxSizeImage: 3100000,
      qualityImage: 70,
      quantityPicture: 5
    },
    mail: {
      email: 'bolotov.iliya.w@gmail.com',
      password: '',
      service: 'gmail'
    }
  }
}

try {
  localConfig = require('./config.json')
  console.log(`>>> \u001b[32mConfig loaded from config.json for '${env}' environment\u001b[39m`)
} catch (error) {
  console.error(`>>> \u001b[32m${'Local config not found'}\u001b[39m`, error)
}

if (localConfig) {
  config = _defaultsDeep(localConfig, config)
}

module.exports = config[env]