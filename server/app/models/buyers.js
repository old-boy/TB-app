var mongoose = require('mongoose')
var buyerSchema = require('./../schemas/buyers')

var Buyer = mongoose.model('Buyer', buyerSchema)

module.exports = Buyer