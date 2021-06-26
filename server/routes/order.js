var express = require('express')
var orderRouter = express.Router()

var Order = require('../app/models/order')

orderRouter.route(`/`)
	.get((req,res) => {
		Order.find({})
		.sort({'_id':1})
		.limit(10)
		.populate('Product', 'productName')
		.populate('ProductCatalog', 'productCatalog')
		.populate('Suppliers', 'supplierCompanyName')
		.populate('Buyers', 'buyerCompanyName')
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

orderRouter.route(`/add`)
	.post((req,res) => {
		const orderNo = req.body.orderNo;
		const productCatalog = req.body.productCatalog;
		const productNum = req.body.productNum;
		const buyerCompanyName = req.body.buyerCompanyName;
		const username = req.body.username;
		const userTel = req.body.userTel;
		const orderDate = req.body.orderDate;
		const product = req.body.product;
		const orderTime = req.body.orderTime;
		const orderStatus = req.body.orderStatus;
		const orderPrice = req.body.orderPrice;
		const orderCertificate = req.body.orderCertificate;
		const supplierCompanyName = req.body.supplierCompanyName;

		Order.findOne({orderNo:req.body.orderNo}).then((doc)　=> {
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
				let nowDate = new Date()
				let year = nowDate.getYear()
				let mon = nowDate.getMonth()
				let day = nowDate.getDay()
				let createdAt = nowDate
				let newOrder = {
					orderNo,
					productCatalog,
					productNum,
					buyerCompanyName,
					username,
					userTel,
					product,
					orderDate,
					orderPrice,
					orderStatus,
					orderTime,
					orderCertificate,
					supplierCompanyName,
					createdAt
				  };
		  
				  let orderEntity = new Order(newOrder)
				  orderEntity.save(err => {
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

// router.post('/update/:id',(req,res,next) => {
// 	var _id = `${req.params.id}`;
// 	Order.updateOne({ _id }, req.body, (err, order) => {
// 		if (err) {
// 			res.status(500).json({ error: err });
// 		} else {
// 			res.status(200).send(order);
// 		}
// 	})
// })




// router.delete('/del/:id',(req,res,next) => {
// 	const id = `${req.params.id}`;
// 	Order.deleteOne({ _id: id }).then((order) => {
// 		console.log(order)
// 		if(order){
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

// router.get('/total',(req,res,next) => {
// 	Order.find({})
// 		.count()
// 		.then((total) => {
// 			console.log('total  ' + total)
// 			if(total > 0){
// 				res.json({
// 					status: '1',
// 					msg: '',
// 					total: total
// 				})
// 			} else {
// 				res.json({
// 					status: '0',
// 					msg: '没有用户',
// 					total: 0
// 				})
// 			}
// 		})

// })




module.exports = orderRouter