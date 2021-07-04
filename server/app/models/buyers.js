var mongoose = require('mongoose')
var buyerSchema = require('./../schemas/buyers')

var Buyer = mongoose.model('', buyerSchema)
Buyer
module.exports = Buyer