var mongoose = require('mongoose')
var ReplyesSchema = require('./../schemas/replye')

var Replye = mongoose.model('Replye', ReplyesSchema)

module.exports = Replye