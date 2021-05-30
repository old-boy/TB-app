var mongoose = require('mongoose')
var chatSchema = require('./../schemas/chats')

var Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat