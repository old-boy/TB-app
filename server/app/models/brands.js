var mongoose = require('mongoose')
var brandSchema = require('./../schemas/brands')

var Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand