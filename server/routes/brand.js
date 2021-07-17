var express = require('express')
var brandRouter = express.Router()

var Brand = require('../app/models/brands')

//查询品牌
brandRouter.route(`/`)
	.get((req,res) => {
		Brand.find({})
		.sort({'_id':1})
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

brandRouter.route(`/add`)
	.post((req,res) => {
		const brandName = req.body.brandName
		const brandDescription = req.body.brandDescription
		
		Brand.findOne({brandName:req.body.brandName}).then((doc)　=> {
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
			
				let newData = {
					brandName,
					brandDescription
				  };
		  
				  let dataEntity = new Brand(newData)
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

	brandRouter.route('/del/:id')
		.delete((req, res) => {
			var _id = `${req.params.id}`;
			Brand.findById({ _id }).then((doc) => {
			    if (!doc) {
				  res.status(400).json({ message: `${doc} 不存在` })
			    } else {
				Brand.deleteOne({ _id }).then(doc => res.status(200).json({ message: "删除成功" })).catch(err => { console.log(err) })
			    }
			})
		  })
              

module.exports = brandRouter
