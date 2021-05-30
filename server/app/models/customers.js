var mongoose = require('mongoose')
var customerSchema = require('./../schemas/customers')

var Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer