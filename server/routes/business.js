var express = require('express')
var businessRouter = express.Router()

var Business = require('../app/models/business')


//查询
businessRouter.route(`/search`)
	.get((req,res) => {
		Business.find()
			  .sort({'_id':-1})
			  .limit(10)
			  .populate('caigou','buyerCompanyName')
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
					const invitationPeople = req.body.invitationPeople;
					const caigou = req.body.caigou;

					let newBusiness = {
						companyName,
						factoryName,
						brandNumber,
						invitationPeople,
						caigou
					  };
					  let businessEntity = new Business(newBusiness)
					  businessEntity.save().then(data => res.json(data)).catch(err => console.log(err));
				}
			})
		  })
businessRouter.route('/del/:id')
		.delete((req, res) => {
			var _id = `${req.params.id}`;
			console.log('pppp  ' + _id)
			Business.findById({ _id }).then((doc) => {
			    if (!doc) {
				  res.status(400).json({ message: `${doc} 不存在` })
			    } else {
				Business.deleteOne({ _id }).then(doc => res.status(200).json({ message: "删除成功" })).catch(err => { console.log(err) })
			    }
			})
		  })




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