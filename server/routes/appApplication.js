var express = require('express')
var router = express.Router()

var AppApplication = require('../app/models/appApplication')

var { handleError } = require('../public/util/handleError')
var { signRequired, adminRole } = require('../middleware/auth.js')

router.use(signRequired)

//查询品牌
router.get('/app',(req,res,next) => {
    AppApplication.find({})
		.sort({'_id':1})
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
					msg: 'APP不存在',
					result: ''
				})
			}
		})
})

//根据ID查询
router.get('/:id',(req,res,next) => {
	const _id = `${req.params.id}`;
	console.log('id  ' + _id)
	AppApplication.findById({_id})
		.exec(function (err, data) {   
			if (err) {   
			  return res.status(400).send({   
				message: 'APP 不存在',   
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
	AppApplication.updateOne({ _id }, req.body, (err, data) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			res.status(200).send(data);
		}
	})
})


//新增APP
router.post('/add',(req,res,next) => {
    const applicationName = req.body.applicationName;
	const applicationUrl = req.body.applicationUrl;
	const applicationVersion = req.body.applicationVersion;
	const applicationSize = req.body.applicationSize;
    const applicationDownloadTotal = req.body.applicationDownloadTotal;
    const applicationUpdate = req.body.applicationUpdate;

    AppApplication.findOne({applicationName:req.body.applicationName}).then((data)　=> {
        if(data){
            return res.status(400).json(
				{
					status: '0',
					msg: 'APP 已存在',
					result: ''
				}
			);
        }else{
            let newAppApplication = {
                applicationName,
				applicationUrl,
				applicationVersion,
				applicationSize,
                applicationDownloadTotal,
                applicationUpdate
            };

            let appApplicationEntity = new AppApplication(newAppApplication)
            appApplicationEntity.save(err => {
                if (err) {
                    res.json({
                        status: '0',
                        msg: err.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '1',
                        msg: 'APP创建成功',
                        result: ''
                    })
                }
            })
        }
    })
})

//删除客户类型
router.delete('/del/:id',(req,res,next) => {
	const id = `${req.params.id}`;
	AppApplication.deleteOne({ _id: id }).then((data) => {
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
	Client.find({})
		.sort({'_id':-1})
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
					msg: 'app不存在',
					result: ''
				})
			}
		})
})
//查询总数
router.get('/total',(req,res,next) => {
	AppApplication.find()
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
					msg: '没有app',
					total: 0
				})
			}
		})

})
//根据app名称查询app
router.get('/:name',(req,res,next) => {
    const name = req.params.name;
    AppApplication.find({'applicationName':name})
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
                msg: '没有app',
                result: ''
            })
        }
    })
})

//新增
router.post('/add',(req,res,next) => {
	console.log('add    ' + req.body)
    const applicationName = req.body.applicationName,
            applicationUrl = req.body.applicationUrl,
            applicationQRCode = req.body.applicationQRCode,
            applicationVersion = req.body.applicationVersion,
            applicationSize = req.body.applicationSize,
            applicationDownloadTotal = req.body.applicationDownloadTotal,
            applicationUpdate = req.body.applicationUpdate;

    AppApplication.findOne({applicationName:req.body.applicationName}).then((data)　=> {
        if(data){
            return res.status(400).json(
				{
					status: '0',
					msg: 'app 已存在',
					result: ''
				}
			);
        }else{
            let newAppApplication = {
                applicationName,
                applicationUrl,
                applicationQRCode,
                applicationVersion,
                applicationSize,
                applicationDownloadTotal,
				applicationUpdate
            };
			

            let appApplicationEntity = new Client(newAppApplication)
            appApplicationEntity.save(err => {
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
	AppApplication.deleteOne({ _id: id }).then((data) => {
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