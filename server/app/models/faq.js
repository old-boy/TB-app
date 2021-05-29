var mongoose = require('mongoose')
var faqSchema = require('./../schemas/faq')

var Faq = mongoose.model('Faq', faqSchema)

module.exports = Faq