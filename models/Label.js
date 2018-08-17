import Sequelize from 'sequelize'
import sequelize from '../config/sequelize'

export default sequelize.define('Label', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})
