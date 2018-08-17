import Sequelize from 'sequelize'

let sequelize = undefined

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    sequelize = require('./connection/production').default
    break
  case 'stage':
  case 'staging':
    sequelize = require('./connection/staging').default
    break
  case 'dev':
  case 'development':
  default:
    sequelize = require('./connection/development').default
    break
}

export default new Sequelize(...sequelize)