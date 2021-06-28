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
		const buyerAvatar = req.body.buyerAvatar;
		const buyerName = req.body.buyerName;
		const buyerTel = req.body.buyerTel;
		const buyerEmail = req.body.buyerEmail;
		const buyerAddress = req.body.buyerAddress;
		const buyerCompanyName = req.body.buyerCompanyName == null ? [] : '';

		Buyer.findOne({buyerName:req.body.buyerName}).then((doc)　=> {
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
//根据ID查询
// router.get('/:id',(req,res,next) => {
// 	const _id = `${req.params.id}`;
// 	console.log('id  ' + _id)
// 	Buyer.findById({_id})
// 		.exec(function (err, data) {   
// 			if (err) {   
// 			  return res.status(400).send({   
// 				message: '不存在',   
// 				result: {}   
// 			  });   
// 			} else {
// 			  res.jsonp({   
// 				result: data   
// 			  })  
// 			}
// 	})
// })

//根据 id 更新数据
// router.post('/update/:id',(req,res,next) => {
// 	var _id = `${req.params.id}`;
// 	Buyer.updateOne({ _id }, req.body, (err, data) => {
// 		if (err) {
// 			res.status(500).json({ error: err });
// 		} else {
// 			res.status(200).send(data);
// 		}
// 	})
// })



//删除某一个
// router.delete('/del/:id',(req,res,next) => {
// 	const id = `${req.params.id}`;
// 	Buyer.deleteOne({ _id: id }).then((data) => {
// 		// console.log(user)
// 		console.log(data)
// 		if(data){
// 			res.status(200).json({
// 				status: '1',
// 				msg: '删除成功',
// 				result: ''
// 			})
// 		}else{
// 			res.status(400).json({
// 				status: '0',
// 				msg: '不存在',
// 				result: ''
// 			})
// 		}
// 	})
// })


                

module.exports = buyerRouter