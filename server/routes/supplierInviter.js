/**采购商管理-邀请
 * 
 */

var express = require('express')
var supplierInviterRouter = express.Router()

var SupplierInviter = require('../app/models/supplierInviter')

supplierInviterRouter.route(`/`)
	.get((req,res) => {
		SupplierInviter.find({})
		.sort({'_id':1})
		.limit(10)
            .populate('buyer', 'buyerCompanyName')
            .populate('supplier', 'supplierCompanyName')
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

supplierInviterRouter.route(`/add`)
	.post((req,res) => {
		const inviterName = req.body.inviterName
		const supplierCompany = req.body.supplierCompany
		const buyerCompany = req.body.buyerCompany
            const inviter = req.body.inviter
            const inviterSource = req.body.inviterSource
		
		SupplierInviter.findOne({inviterName:req.body.inviterName}).then((doc)　=> {
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
			
				let newData = {
					inviterName,
					supplierCompany,
					buyerCompany,
                              inviter,
                              inviterSource
				  };
		  
				  let dataEntity = new SupplierInviter(newData)
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
              

module.exports = supplierInviterRouter
