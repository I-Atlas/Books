const config = require('../config')
const env = 'development'

module.exports = { [env]: config.db }