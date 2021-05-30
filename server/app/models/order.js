var mongoose = require('mongoose')
var orderSchema = require('./../schemas/orders')

var Order = mongoose.model('Order', orderSchema)

module.exports = Order