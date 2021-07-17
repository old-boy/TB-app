var express = require('express')
var productCatalogRouter = express.Router()

var ProductCatalog = require('../app/models/productCatalog')

//查询
productCatalogRouter.route(`/all`)
	.get((req,res) => {
		ProductCatalog.find({})
		.sort({'_id':1})
		.limit(10)
		.populate('product','productTotal productTotal')
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

	productCatalogRouter.route(`/add`)
	.post((req,res) => {
		const catalogName = req.body.catalogName;
		const productTotal = req.body.productTotal;
		const catalogStatus = req.body.catalogStatus;
		ProductCatalog.findOne({catalogName:req.body.catalogName}).then((doc)　=> {
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
				let nowDate = new Date()
				let year = nowDate.getYear()
				let mon = nowDate.getMonth()
				let day = nowDate.getDay()
				let newProductCatalog = {
					catalogName,
					productTotal,
					catalogStatus
				  };
		  
				  let productCatalogEntity = new ProductCatalog(newProductCatalog)
				  productCatalogEntity.save(err => {
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
productCatalogRouter.route('/:id')
    .get((req, res) => {
        const _id = `${req.params.id}`;
        ProductCatalog.findById({ _id }).then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
    })


//根据 id 更新数据
// router.post('/update/:id',(req,res,next) => {
// 	var _id = `${req.params.id}`;
// 	ProductCatalog.updateOne({ _id }, req.body, (err, data) => {
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
// 	ProductCatalog.deleteOne({ _id: id }).then((data) => {
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


//查询总数
// router.get('/total',(req,res,next) => {
// 	ProductCatalog.find()
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
// 					msg: '不存在',
// 					total: 0
// 				})
// 			}
// 		})

// })

//根据名称查询
// router.get('/:name',(req,res,next) => {
//     const name = req.params.name;
//     ProductCatalog.find({'catalogName':name})
//     .sort({'_id':-1})
//     .limit(10)
//     .exec()
//     .then((data) => {
//         if (data) {
//             res.json({
//                 status: '1',
//                 msg: '',
//                 result: data
//             })
//         } else {
//             res.json({
//                 status: '0',
//                 msg: '不存在',
//                 result: ''
//             })
//         }
//     })
// })
                

module.exports = productCatalogRouter