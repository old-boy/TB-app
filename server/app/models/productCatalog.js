var productCatalogSchema = require('./../schemas/productCatalog')
var mongoose = require('mongoose')
var ProductCatalog = mongoose.model('ProductCatalog', productCatalogSchema)

module.exports = ProductCatalog