const model = require('./../models/user')
const baseServiceMiddleware = require('./../../core/middlewares/baseServiceMiddleware')
module.exports = {
  ...baseServiceMiddleware(model)
}
