var mongoose = require('mongoose')
var caigouInfoSchema = require('../schemas/caigouInfo')

var CaigouInfo = mongoose.model('CaigouInfo', caigouInfoSchema)

module.exports = CaigouInfo