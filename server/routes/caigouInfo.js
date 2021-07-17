var express = require('express')
var caigouInfoRouter = express.Router()

var CaigouInfo = require('../app/models/caigouInfo')

//查询
caigouInfoRouter.route(`/`)
	.get((req,res) => {
		CaigouInfo.find({})
		.sort({'_id':1})
		.limit(10)
		.populate('caigou', 'buyerCompanyName')
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

	caigouInfoRouter.route(`/add`)
	.post((req,res) => {
		const buyerAvatar = req.body.buyerAvatar == '' ? [] : '';
		const buyerName = req.body.buyerName;
		const buyerTel = req.body.buyerTel;
		const buyerEmail = req.body.buyerEmail;
		const buyerAddress = req.body.buyerAddress;
		const caigou = req.body.buyerCompanyName;

		
		CaigouInfo.findOne({buyerName:req.body.buyerName}).then((doc)　=> {
			console.log('ppp  ' +doc)
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
			
				let newData = {
					buyerAvatar,
					buyerName,
					buyerTel,
					buyerEmail,
					buyerAddress,
					caigou
				  };
		  
				  let dataEntity = new CaigouInfo(newData)
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
              

module.exports = caigouInfoRouter