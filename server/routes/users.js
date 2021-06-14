var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var bcrypt = require('bcrypt')
const saltRounds = 10;

var multipartMiddleware = require('connect-multiparty')()
var { uploadImage } = require('../middleware/uploadImage.js')
var { handleError } = require('../public/util/handleError.js')
var { signRequired, adminRole } = require('../middleware/auth.js')
var User = require('../app/models/user')
var Info = require('../app/models/info')
var Role = require('../app/models/role')

// 查询所有用户信息
// router.get('/', signRequired, (req, res, next) => {
router.get('/', (req, res, next) => {
	User.find({})
		.sort({'_id':-1})
		.limit(10)
		.populate('info')
		.populate('role')
		.exec()
		.then((users) => {
			if (users) {
				res.json({
					status: '1',
					msg: '',
					result: users
				})
			} else {
				res.json({
					status: '0',
					msg: '没有用户',
					result: ''
				})
			}
		})
})

// 根据 name 查询用户
router.get('/search/:name',(req,res,next) => {
	const name = req.params.name;
	User.find({'username':name})
		.populate('Role','roleName')
		.exec((user) => {
		console.log(user)
		if(user){
			res.status(200).json({
				status: '1',
				msg:'',
				result: user
			})
		}else{
			res.json({
				status: '0',
				msg: '用户不存在',
				result: ''
			})
		}
	})
})

//分页查询
router.get('/page/:page/size/:size',(req,res,next) => {
	const _page = `${req.params.page}`;
	const _size = `${req.params.size}`

	console.log("传的size为：   " + _size + "    page:   " + _page)
	var query=User.find();

    query.skip(_page * _size);
    query.limit(_size);
	query.sort({'_id':-1});
	query.populate('info');
	query.exec().then((users,total,index) => {
		if (users) {
			res.json({
				status: '1',
				msg: '',
				result: users,
				curPage: index
			})
		} else {
			res.json({
				status: '0',
				msg: '没有用户',
				result: ''
			})
		}
	})
})
//查询table 总数
router.get('/total',(req,res,next) => {
	User.find()
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
//根据ID查询

// 添加用户
router.post('/add', (req, res, next) => {
	var username = req.body.username,
		password = req.body.password;
		


		User.findOne({ username: req.body.username }).then((user) => {
        if (user) {
			return res.status(400).json(
				{
					status: '0',
					msg: '用户已存在',
					result: ''
				}
			);
        }else {
			let newInfo = {
				password,
				username
			}
			let info = new Info(newInfo)
		
			info.save((err) => {
				if (err) {
					res.json({
						status: '0',
						msg: err.message,
						result: ''
					})
				} else {
					let newUser = {
						username: username,
						password: password
					}
					let user = new User(newUser)
					user.save(err => {
						if (err) {
							res.json({
								status: '0',
								msg: err.message,
								result: ''
							})
						} else {
							res.json({
								status: '1',
								msg: '用户创建成功',
								result: ''
							})
						}
					})
				}
			})
        }
    });
});

// 删除用户  signRequired, adminRole,
router.delete('/del/:id',  (req, res, next) => {
	const id = `${req.params.id}`;
	User.deleteOne({ _id: id }).then((user) => {
		// console.log(user)
		if(user){
			res.status(200).json({
				status: '1',
				msg: '删除用户成功',
				result: ''
			})
		}else{
			res.status(400).json({
				status: '0',
				msg: '用户不存在',
				result: ''
			})
		}
	})
})

// 修改用户权限  signRequired, adminRole,
router.post('/modify/role', (req, res, next) => {
	let role = req.body.role
	let id = req.body.id
	User.findOne({ _id: id }, (err, user) => {
		if (err) {
			res.json({
				status: '0',
				msg: err.message,
				result: ''
			})
		}
		if (user) {
			if (user.role >= 50) {
				res.json({
					status: '0',
					msg: '权限不够，不能修改',
					result: ''
				})
			} else {
				user.role = role
				user.save(err => {
					if (err) {
						res.json({
							status: '0',
							msg: err.message,
							result: ''
						})
					} else {
						res.json({
							status: '1',
							msg: '权限修改成功',
							result: ''
						})
					}
				})
			}
		} else {
			res.json({
				status: '0',
				msg: '用户不存在',
				result: ''
			})
		}
	})
})

// 最高权限修改密码 signRequired, adminRole,
router.post('/modify/psd', (req, res, next) => {
	let pwd = req.body.password
	let id = req.body.id
	User.findOne({ _id: id }, (err, user) => {
		if (user) {
			console.log(user)
			crypto.randomBytes(16, (err, buf) => {
				let salt = buf.toString('hex')
				user.pwdKey = salt
				crypto.pbkdf2(pwd, salt, 4096, 16, 'sha1', (err, secret) => {
					if (err) throw err
					user.password = secret.toString('hex')
					user.save(err => {
						if (err) {
							res.json({
								status: '0',
								msg: err.message,
								result: ''
							})
						} else {
							res.json({
								status: '1',
								msg: '修改密码成功',
								result: ''
							})
						}
					})
				})
			})
		} else {
			res.json({
				status: '0',
				msg: '用户不存在',
				result: ''
			})
		}
	})
})

// 登陆接口
router.post('/login', (req, res, next) => {
	var username = req.body.username,
		cur_password = req.body.password
	User.findOne({'username': username})
		.exec()
	.then((user) => {
				if (user) {
				// console.log('uuuu  ' + user)
				// console.log('userPassword  ' + user.password)
				// console.log('cur_password  ' + cur_password)
				 
				const isMatch = bcrypt.compare(cur_password, user.password);
				console.log('ism  ' + isMatch)
				if(isMatch){
					req.session.user = user

					res.json({
						status: '1',
						code:'200',
						msg: '',
						result: {
							'user': user,
							'sessionId': req.session.id
						}
					})
				} else {
					res.json({
						status: '0',
						code:'400',
						msg: 'password incorrect',
						result: ''
					})
				}
				
			} else {
				res.json({
					status: '0',
					msg: '用户不存在',
					result: ''
				})
			}
		})
})

// 重置 token
router.post('/resetToken',(req,res,next) =>{

})

// 登出接口
router.get('/logout', (req, res, next) => {
	delete req.session.user
	res.json({
		status: '1',
		msg: '用户已登出',
		result: ''
	})
})

// 检测是否已经登陆
router.post('/checklogin', (req, res, next) => {
	let sessionId = req.body.sessionId
	let userId = req.session.user._id
	if (req.session.id === sessionId) {
		User.findOne({ _id: userId })
			.populate('info', 'username avatar')
			.exec()
			.then((user) => {
				if (user) {
					req.session.user = user
					res.json({
						status: '1',
						msg: '用户已登陆',
						result: user
					})
				} else {
					res.json({
						status: '0',
						msg: '用户不存在',
						result: ''
					})
				}
			})
	} else {
		res.json({
			status: '0',
			msg: '用户未登陆',
			result: ''
		})
	}
})

// 读取用户资料  signRequired, adminRole
router.get('/userInfo/:id', (req, res, next) => {
	var _id = `${req.params.id}`;
	console.log('get id    ' + _id);
	Info.findById({_id})
		.exec((err, info) => {
			if (info) {
				res.json({
					status: '1',
					msg: '',
					result: info
				})
			} else {
				res.json({
					status: '0',
					msg: '用户不存在',
					result: ''
				})
			}
		})
})

// 上传用户资料  signRequired, multipartMiddleware, uploadImage,
router.post('/userInfo/:id',  (req, res, next) => {
	var _id = `${req.params.id}`;
	console.log('post id  ' + _id)
	Info.findByIdAndUpdate({ _id }, req.body, (err, info) => {
		let infoId = _id
		let username = req.body.username
		let job = req.body.job
		let address = req.body.address
		let tel = req.body.tel
		let email = req.body.email
		let avatar = req.body.avatar

		if (avatar) {
			avatar = req.body.avatar
		}

		// 用于判断是否有新上传图片
		if (avatar !== '') {
			let oldPath = path.join(__dirname, '../', `/public/${avatar}`)
			// 删除之前的图片
			fs.unlink(oldPath, (err) => {
				if (err) {
					if (err.code === 'ENOENT') {
						console.error('myfile does not exist')
					}
					handleError(err)
				}
			})
		}

		const newInfo = new Info({
			infoId,
			username,
			job,
			address,
			tel,
			email,
			avatar
		})

		newInfo.save().then(info => 
			res.json({ 
				status: '1', 
				msg: "修改成功", 
				result: info 
			})).catch(err => console.log(err));
	})
})

module.exports = router