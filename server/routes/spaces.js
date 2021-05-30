var express = require('express')
var router = express.Router()

var Spaces = require('../app/models/spaces')

var { handleError } = require('../public/util/handleError')
var { signRequired, adminRole } = require('../middleware/auth.js')

router.use(signRequired)

//查询
router.get('/space',(req,res,next) => {
    Spaces.find({})
		.sort({'_id':1})
        .populate('buyer')
        .populate('supplier')
        .populate('user')
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
	Spaces.findById({_id})
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
	Spaces.updateOne({ _id }, req.body, (err, data) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			res.status(200).send(data);
		}
	})
})


//新增
router.post('/add',(req,res,next) => {
    const spaceName = req.body.spaceName;
	const buyer = req.body.buyer;
    const supplier = req.body.supplier;
    const customers = req.body.customers;

    Spaces.findOne({spaceName:req.body.spaceName}).then((data)　=> {
        if(data){
            return res.status(400).json(
				{
					status: '0',
					msg: '已存在',
					result: ''
				}
			);
        }else{
            let newSpaces = {
                spaceName,
                buyer,
				supplier,
                customers
            };

            let spacesEntity = new Faq(newSpaces)
            spacesEntity.save(err => {
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
	Spaces.deleteOne({ _id: id }).then((data) => {
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










//查询APP
router.get('/', (req, res, next) => {
	Spaces.find({})
		.sort({'_id':-1})
        .populate('buyer')
        .populate('supplier')
        .populate('user')
		.limit(10)
		.exec((err, data) => {
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
//查询总数
router.get('/total',(req,res,next) => {
	Spaces.find()
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
//根据app名称查询app
router.get('/:name',(req,res,next) => {
    const name = req.params.name;
    Spaces.find({'spaceName':name})
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
                
//新增
router.post('/add',(req,res,next) => {
	console.log('add    ' + req.body)
    const spaceName = req.body.spaceName,
    buyer = req.body.buyer,
    supplier = req.body.supplier,
    customers = req.body.customers;

    Spaces.findOne({spaceName:req.body.spaceName}).then((data)　=> {
        if(data){
            return res.status(400).json(
				{
					status: '0',
					msg: '已存在',
					result: ''
				}
			);
        }else{
            let newSpaces = {
                spaceName,
                buyer,
                supplier,
                customers
            };
			

            let spacesEntity = new Client(newSpaces)
            spacesEntity.save(err => {
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

//删除
router.delete('/del/:id',(req,res,next) => {
    const id = `${req.params.id}`;
	Spaces.deleteOne({ _id: id }).then((data) => {
		// console.log(user)
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

module.exports = router