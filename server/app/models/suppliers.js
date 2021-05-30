var mongoose = require('mongoose')
var supplierSchema = require('../schemas/suppliers')

var Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier