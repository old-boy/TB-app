var mongoose = require('mongoose')
var businessSchema = require('./../schemas/business')

var Business = mongoose.model('Business', businessSchema)

module.exports = Business