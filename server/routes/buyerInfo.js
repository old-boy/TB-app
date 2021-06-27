var express = require('express')
var buyerInfoRouter = express.Router()

var BuyerInfo = require('../app/models/buyerInfo')

router.use(signRequired)

//查询
buyerInfoRouter.route(`/`)
	.get((req,res) => {
		BuyerInfo.find({})
		.sort({'_id':1})
		.limit(10)
		.populate('Buyers', 'buyerCompanyName')
		.exec()
		.then((data) => {
			if (data) {
				res.json({
					status: '200',
					msg: '',
					data
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

buyerInfoRouter.route(`/add`)
	.post((req,res) => {
		const buyerAvatar = req.body.buyerAvatar;
		const buyerName = req.body.buyerName;
		const buyerTel = req.body.buyerTel;
		const buyerEmail = req.body.buyerEmail;
		const buyerAddress = req.body.buyerAddress;
		const buyerCompanyName = req.body.buyerCompanyName == null ? this.body.buyerCompanyName : '';

		BuyerInfo.findOne({buyerName:req.body.buyerName}).then((doc)　=> {
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
			
				let newData = {
					buyerAvatar,
					buyerName,
					buyerTel,
					buyerEmail,
					buyerAddress,
					buyerCompanyName
				  };
		  
				  let dataEntity = new BuyerInfo(newData)
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
              

module.exports = buyerInfoRouter