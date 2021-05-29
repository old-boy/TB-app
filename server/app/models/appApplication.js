var mongoose = require('mongoose')
var appApplicationSchema = require('./../schemas/appApplication')

var AppApplication = mongoose.model('AppApplication', appApplicationSchema)

module.exports = AppApplication