var express = require('express')
var carouselRouter = express.Router()

var Carousel = require('../app/models/carousels')



//查询
carouselRouter.route(`/`)
	.get((req,res) => {
		Carousel.find({})
		.sort({'_id':-1})
		.limit(10)
		.exec()
		.then((data) => {
			if (data) {
				res.json({
					status: '200',
					msg: '',
					result: data
				})
			} else {
				res.json({
					status: '0',
					msg: '不存在',
					result: ''
				})
			}
		})
	})
carouselRouter.route(`/add`)
	.post((req,res) => {
		const title = req.body.title
		const thumbnail = req.body.thumbnail
		const url = req.body.url
		const position = req.body.position
		const status = req.body.status
		const sort = req.body.sort
		const userName = req.body.userName
		
		Carousel.findOne({title:req.body.title}).then((doc)　=> {
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
			
				let newData = {
					title,
					thumbnail,
					url,
					position,
					status,
					sort,
					userName
				  };
		  
				  let dataEntity = new Carousel(newData)
				  dataEntity.save(err => {
					if (err) {
					    res.json({
						  status: '0',
						  msg: err.message,
						  result: ''
					    })
					} else {
					    res.json({
						  status: '200',
						  msg: '创建成功',
						  result: ''
					    })
					}
				  })
			}
		})
	})

	carouselRouter.route('/del/:id')
		.delete((req, res) => {
			var _id = `${req.params.id}`;
			Carousel.findById({ _id }).then((doc) => {
			    if (!doc) {
				  res.status(400).json({ message: `${doc} 不存在` })
			    } else {
				Carousel.deleteOne({ _id }).then(doc => res.status(200).json({ message: "删除成功" })).catch(err => { console.log(err) })
			    }
			})
		  })
              
module.exports = carouselRouter