var mongoose = require('mongoose')
var supplierInviterSchema = require('../schemas/supplierInviter')

var SupplierInviter = mongoose.model('SupplierInviter', supplierInviterSchema)

module.exports = SupplierInviter