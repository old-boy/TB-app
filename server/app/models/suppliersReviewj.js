var mongoose = require('mongoose')
var suppliersReviewSchema = require('./../schemas/suppliersReview')

var SuppliersReview = mongoose.model('SuppliersReview', suppliersReviewSchema)

module.exports = SuppliersReview