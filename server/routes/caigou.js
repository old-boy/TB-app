var express = require('express')
var caigouRouter = express.Router()

var Caigou = require('../app/models/caigou')



//查询
caigouRouter.route(`/`)
	.get((req,res) => {
		Caigou.find({})
		.sort({'_id':1})
		.limit(10)
		.populate('caigouInfo', 'buyerName buyerTel buyerEmail buyerAddress buyerAvatar')
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
caigouRouter.route(`/add`)
	.post((req,res) => {
		const buyerCompanyName = req.body.buyerCompanyName
		const buyerCompanyAddres = req.body.buyerCompanyAddres
		const buyerCompanyTel = req.body.buyerCompanyTel
		const caigouInfo = req.body.caigouInfo
		
		Caigou.findOne({buyerCompanyName:req.body.buyerCompanyName}).then((doc)　=> {
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
			
				let newData = {
					buyerCompanyName,
					buyerCompanyAddres,
					buyerCompanyTel,
					caigouInfo
				  };
		  
				  let dataEntity = new Caigou(newData)
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

module.exports = caigouRouter