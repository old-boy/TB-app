var express = require('express')
var router = express.Router()

var UserRole = require('../app/models/role')

var { handleError } = require('../public/util/handleError')
var { signRequired, adminRole } = require('../middleware/auth.js')

router.use(signRequired)

//查询
router.get('/search',(req,res,next) => {
      UserRole.find({})
		.sort({'_id':1})
		.limit(10)
		.exec()
		.then((data) => {
			console.log('roles  ++'  + data)
			if (data) {
				
				res.json({
					status: '200',
					msg: '',
					users: data
				})
			} else {
				res.json({
					status: '0',
					msg: '不存在',
					users: ''
				})
			}
		})
})

//根据ID查询
router.get('/:id',(req,res,next) => {
	const _id = `${req.params.id}`;
	console.log('id  ' + _id)
	UserRole.findById({_id})
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
	UserRole.updateOne({ _id }, req.body, (err, data) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			res.status(200).send(data);
		}
	})
})


//新增
router.post('/add',(req,res,next) => {
    let roleName = req.body.roleName
    let roleCode = req.body.roleCode
console.log('role  ' + roleName)
    UserRole.findOne({roleName:req.body.roleName}).then((data)　=> {
        if(data){
            return res.status(400).json(
				{
					status: '0',
					msg: '已存在'
				}
			);
        }else{
		
		let newRole = {
			roleName,
			roleCode
            };

            let userRoleEntity = new UserRole(newRole)
            userRoleEntity.save(err => {
                if (err) {
                    res.json({
                        status: '0',
                        msg: err.message
                    })
                } else {
                    res.json({
                        status: '200',
                        msg: '创建成功'
                    })
                }
            })
        }
    })
})

//删除某一个
router.delete('/del/:id',(req,res,next) => {
	const id = `${req.params.id}`;
	UserRole.deleteOne({ _id: id }).then((data) => {
		// console.log(user)
		console.log(data)
		if(data){
			res.status(200).json({
				status: '200',
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
	UserRole.find()
		.count()
		.then((total) => {
			console.log('total  ' + total)
			if(total > 0){
				res.json({
					status: '200',
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

//根据token查询
router.get('/:token',(req,res,next) => {
    const name = req.params.name;
    UserRole.find({'token':token})
    .sort({'_id':-1})
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
                

module.exports = router