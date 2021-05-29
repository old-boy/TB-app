var express = require('express')
var router = express.Router()
var Replye = require('./../app/models/replye')

router.get('/',(req,res,next) => {
    Replye.find({})
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

//根据ID查询
router.get('/:id',(req,res,next) => {
	const id = `${req.params.id}`;
	console.log('id  ' + id)
	Replye.findById({ _id:id })
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
// 添加
router.post('/add', (req, res, next) => {
	var replyKeywords = req.body.replyKeywords,
	replyContent = req.body.replyContent,
	replyPriority = req.body.replyPriority,
	replyStatus = req.body.replyStatus;


	Replye.findOne({ replyKeywords: req.body.replyKeywords }).then((data) => {
        if (data) {
			return res.status(400).json(
				{
					status: '0',
					msg: '已存在',
					result: ''
				}
			);
        }else {
			let newReplye = {
				replyKeywords,
				replyContent,
				replyPriority,
				replyStatus
			}
			let replyeEntity = new Pay(newReplye)
		
			replyeEntity.save((err) => {
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
    });
});

// 删除帐户
router.delete('/del/:id',  (req, res, next) => {
	const id = `${req.params.id}`;
	Replye.deleteOne({ _id: id }).then((pay) => {
		if(pay){
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

//查询table 总数
router.get('/total',(req,res,next) => {
	Replye.find()
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

//修改
router.post('/modify/:id',(req,res,next) => {
	const _id = `${req.params.id}`;
	Replye.updateOne({ _id }, req.body, (err, pay) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			res.status(200).send(pay);
		}
	})
})

module.exports = router