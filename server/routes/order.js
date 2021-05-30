var express = require('express')
var router = express.Router()

var Order = require('../app/models/order')


router.get('/',(req,res,next) => {
	Order.find({})
		.populate('Product', 'productName productSalesNumber')
		.populate('ProductCatalog', 'productCatalog')
		.populate('Suppliers', 'supplierCompanyName')
		.populate('Buyers', 'buyerCompanyName buyerStaffName')
		.sort({'_id':1})
		.limit(10)
		.exec()
		.then((order) => {
			if (order) {
				res.json({
					status: '1',
					msg: '',
					result: order
				})
			} else {
				res.json({
					status: '0',
					msg: '订单不存在',
					result: ''
				})
			}
		})
})


router.post('/update/:id',(req,res,next) => {
	var _id = `${req.params.id}`;
	Order.updateOne({ _id }, req.body, (err, order) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			res.status(200).send(order);
		}
	})
})

router.post('/add',(req,res,next) => {
	const orderNo = req.body.orderNo,
	orderTime = req.body.orderTime,
	orderStatus = req.body.orderStatus,
	orderPrice = req.body.orderPrice,
	orderCertificate = req.body.orderCertificate,
	product = req.body.product,
	productCatalog = req.body.productCatalog,
	supplierCompanyName = req.body.supplierCompanyName,
	buyerCompanyName = req.body.buyerCompanyName
		  ;

	    Order.findOne({controrderNoactNo:req.body.orderNo}).then((order)　=> {
        if(order){
            return res.status(400).json(
				{
					status: '0',
					msg: '订单已存在',
					result: ''
				}
			);
        }else{
            let newOrder = {
				orderTime,
				orderStatus,
				orderPrice,
				orderCertificate,
				product,
				productCatalog,
				supplierCompanyName,
				buyerCompanyName
            };

			console.log('newOrder   ' + JSON.stringify(newOrder))
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
                        status: '1',
                        msg: '订单创建成功',
                        result: ''
                    })
                }
            })
        }
    })
})


router.delete('/del/:id',(req,res,next) => {
	const id = `${req.params.id}`;
	Order.deleteOne({ _id: id }).then((order) => {
		console.log(order)
		if(order){
			res.status(200).json({
				status: '1',
				msg: '删除成功',
				result: ''
			})
		}else{
			res.status(400).json({
				status: '0',
				msg: '不存在',
				result: ''
			})
		}
	})
})

router.get('/total',(req,res,next) => {
	Order.find({})
		.count()
		.then((total) => {
			console.log('total  ' + total)
			if(total > 0){
				res.json({
					status: '1',
					msg: '',
					total: total
				})
			} else {
				res.json({
					status: '0',
					msg: '没有用户',
					total: 0
				})
			}
		})

})




module.exports = router