var express = require('express')
var businessRouter = express.Router()

var Business = require('../app/models/business')



//根据ID查询
// router.get('/:id',(req,res,next) => {
// 	const _id = `${req.params.id}`;
// 	console.log('id  ' + _id)
// 	Business.findById({_id})
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
// 	Business.updateOne({ _id }, req.body, (err, data) => {
// 		if (err) {
// 			res.status(500).json({ error: err });
// 		} else {
// 			res.status(200).send(data);
// 		}
// 	})
// })
//查询
businessRouter.route(`/search`)
	.get((req,res) => {
		Business.find()
			  .populate('Brand','brandNumber')
			  .populate('Users','username')
			  .populate('Suppliers','supplierCompanyName')
			  .populate('Buyers','buyerCompanyName')
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
//新增
businessRouter.route(`/add`)
		  .post((req, res) => {
			Business.findOne({companyName:req.body.companyName}).then((doc) => {
				if(doc){
					res.status(400).json({ message: "巳存在" }).send(doc)
				}else{
					const companyName = req.body.companyName;
					const factoryName = req.body.factoryName;
					const brandNumber = req.body.brandNumber;
					const supplierCompanyName = req.body.supplierCompanyName;
					const invitationPeople = req.body.invitationPeople;
					const buyerCompanyName = req.body.buyerCompanyName;

					let newBusiness = {
						companyName,
						factoryName,
						brandNumber,
						supplierCompanyName,
						invitationPeople,
						buyerCompanyName
					  };
					  let businessEntity = new Business(newBusiness)
					  businessEntity.save().then(data => res.json(data)).catch(err => console.log(err));
				}
			})
		  })



//删除某一个
// router.delete('/del/:id',(req,res,next) => {
// 	const id = `${req.params.id}`;
// 	Business.deleteOne({ _id: id }).then((data) => {
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
// 	Business.find()
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
//     Business.find({'companyName':name})
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
                

module.exports = businessRouter