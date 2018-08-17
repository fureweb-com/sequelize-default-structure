const database = 'db_sequelize_test'
const username = 'root'
const password = ''
const options = {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,
  timezone: 'Asia/Seoul',
  pool: {
    max: 5,
    min: 0, 
    acquire: 30000,
    idle: 10000
  }
}

export default [database, username, password, options]
