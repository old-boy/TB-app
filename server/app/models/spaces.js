var mongoose = require('mongoose')
var spacesSchema = require('../schemas/spaces')

var Spaces = mongoose.model('OrderType', spacesSchema)

module.exports = Spaces