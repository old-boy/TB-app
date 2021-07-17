var mongoose = require('mongoose')
var caigouGuanxiSchema = require('../schemas/caigouGuanxi')

var CaigouGuanxi = mongoose.model('CaigouGuanxi', caigouGuanxiSchema)

module.exports = CaigouGuanxi