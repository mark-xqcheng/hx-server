/**
 * Created by LXHFIGHT on 2019/4/8
 * Email: lxhfight1@gmail.com
 * Description:
 *   A database manager of Sequelize
 */
const Sequelize = require('sequelize')
const config = require('./../config/database/mysql')
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options
)
module.exports = sequelize
