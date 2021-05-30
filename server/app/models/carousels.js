var mongoose = require('mongoose')
var carouselSchema = require('./../schemas/carousels')

var Carousel = mongoose.model('Carousel', carouselSchema)

module.exports = Carousel