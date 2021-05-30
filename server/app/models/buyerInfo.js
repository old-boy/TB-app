var mongoose = require('mongoose')
var buyerInfoSchema = require('./../schemas/buyerInfo')

var BuyerInfo = mongoose.model('BuyerInfo', buyerInfoSchema)

module.exports = BuyerInfo