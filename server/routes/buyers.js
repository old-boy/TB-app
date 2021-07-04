var express = require('express')
var buyerRouter = express.Router()

var Buyer = require('../app/models/buyers')



//查询
buyerRouter.route(`/`)
	.get((req,res) => {
		Buyer.find({})
		.sort({'_id':1})
		.limit(10)
		.populate('BuyerInfo', 'buyerName buyerTel buyerEmail buyerAddress buyerAvatar')
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

buyerRouter.route(`/add`)
	.post((req,res) => {
		const buyerCompanyName = req.body.buyerCompanyName;
		const buyerCompanyAddres = req.body.buyerCompanyAddres;
		const buyerCompanyTel = req.body.buyerCompanyTel;
		const buyerInfo = req.body.buyerInfo;
		
		Buyer.findOne({buyerCompanyName:req.body.buyerCompanyName}).then((doc)　=> {
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
				let newData = {
					buyerCompanyName,
					buyerCompanyAddres,
					buyerCompanyTel,
					buyerInfo
				  };
				  let dataEntity = new Buyer(newData)
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

                

module.exports = buyerRouter