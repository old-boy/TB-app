var express = require('express')
var router = express.Router()

var Supplier = require('../app/models/suppliers')

var { handleError } = require('../public/util/handleError')
var { signRequired, adminRole } = require('../middleware/auth.js')

router.use(signRequired)

//查询
router.get('/',(req,res,next) => {
    Supplier.find({})
		.sort({'_id':1})
        .populate('Users','supplierStaffName')
		.limit(10)
		.exec()
		.then((data) => {
			if (data) {
				res.json({
					status: '1',
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

//根据ID查询
router.get('/:id',(req,res,next) => {
	const _id = `${req.params.id}`;
	console.log('id  ' + _id)
	Supplier.findById({_id})
		.exec(function (err, data) {   
			if (err) {   
			  return res.status(400).send({   
				message: '不存在',   
				result: {}   
			  });   
			} else {
			  res.jsonp({   
				result: data   
			  })  
			}
	})
})

//根据 id 更新数据
router.post('/update/:id',(req,res,next) => {
	var _id = `${req.params.id}`;
	Supplier.updateOne({ _id }, req.body, (err, data) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			res.status(200).send(data);
		}
	})
})


//新增
router.post('/add',(req,res,next) => {
    const supplierCompanyName = req.body.supplierCompanyName;
	const supplierStaffName = req.body.supplierStaffName;
    const supplierStaffTel = req.body.supplierStaffTel;
    const supplierStaffEmail = req.body.supplierStaffEmail;
    const supplierStatus = req.body.supplierStatus;
    const supplierLogo = req.body.supplierLogo;
    const supplierResources = req.body.supplierResources;

    Supplier.findOne({supplierCompanyName:req.body.supplierCompanyName}).then((data)　=> {
        if(data){
            return res.status(400).json(
				{
					status: '0',
					msg: '已存在',
					result: ''
				}
			);
        }else{
            let newSupplier = {
                supplierCompanyName,
                supplierStaffName,
				supplierStaffTel,
                supplierStaffEmail,
                supplierStatus,
                supplierLogo,
                supplierResources
            };

            let suppliersEntity = new Faq(newSupplier)
            suppliersEntity.save(err => {
                if (err) {
                    res.json({
                        status: '0',
                        msg: err.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '1',
                        msg: '创建成功',
                        result: ''
                    })
                }
            })
        }
    })
})

//删除某一个
router.delete('/del/:id',(req,res,next) => {
	const id = `${req.params.id}`;
	Supplier.deleteOne({ _id: id }).then((data) => {
		// console.log(user)
		console.log(data)
		if(data){
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


//查询总数
router.get('/total',(req,res,next) => {
	Supplier.find()
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
					msg: '不存在',
					total: 0
				})
			}
		})

})

//根据名称查询
router.get('/:name',(req,res,next) => {
    const name = req.params.name;
    Supplier.find({'supplierCompanyName':name})
    .sort({'_id':-1})
    .limit(10)
    .exec()
    .then((data) => {
        if (data) {
            res.json({
                status: '1',
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
                

module.exports = router