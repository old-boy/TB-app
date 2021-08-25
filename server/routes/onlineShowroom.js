/*
 * @Author: your name
 * @Date: 2021-05-29 20:11:32
 * @LastEditTime: 2021-08-26 00:30:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TB-app\server\routes\onlineShowroom.js
 */
var express = require('express')
var onlineRoomRouter = express.Router()

var OnlineShowroom = require('../app/models/onlineShowroom')

onlineRoomRouter.route(`/`)
	.get((req,res) => {
		OnlineShowroom.find({})
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

onlineRoomRouter.route(`/add`)
	.post((req,res) => {
		const showroomName = req.body.showroomName;
		const showroomThumbnail = req.body.showroomThumbnail;
		const showroomStatus = req.body.showroomStatus;
		const caigou = req.body.caigou;
		const productNum = req.body.productNum;

		OnlineShowroom.findOne({showroomName:req.body.showroomName}).then((doc)　=> {
			if(doc){
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
				
				let newRoom = {
					showroomName,
					showroomThumbnail,
					showroomStatus,
					caigou,
					productNum
				  };
		  
				  let roomEntity = new OnlineShowroom(newRoom)
				  roomEntity.save(err => {
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

	onlineRoomRouter.route('/del/:id')
		.delete((req, res) => {
			var _id = `${req.params.id}`;
			OnlineShowroom.findById({ _id }).then((doc) => {
			    if (!doc) {
				  res.status(400).json({ message: `${doc} 不存在` })
			    } else {
				OnlineShowroom.deleteOne({ _id }).then(doc => res.status(200).json({ message: "删除成功" })).catch(err => { console.log(err) })
			    }
			})
		  })


module.exports = onlineRoomRouter