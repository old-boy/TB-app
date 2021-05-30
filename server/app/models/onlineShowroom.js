var mongoose = require('mongoose')
var onlineShowroomSchema = require('./../schemas/onlineShowroom')

var OnlineShowroom = mongoose.model('OnlineShowroom', onlineShowroomSchema)

module.exports = OnlineShowroom