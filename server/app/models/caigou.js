var mongoose = require('mongoose')
var caigouSchema = require('../schemas/caigou')

var Caigou = mongoose.model('Caigou', caigouSchema)

module.exports = Caigou