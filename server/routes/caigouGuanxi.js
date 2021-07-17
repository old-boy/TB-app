/**采购商管理-邀请
 * 
 */

 var express = require('express')
 var caigouGuanxiRouter = express.Router()
 
 var CaigouGuanxi = require('../app/models/caigouGuanxi')
 
 caigouGuanxiRouter.route(`/`)
       .get((req,res) => {
            CaigouGuanxi.find({})
             .sort({'_id':-1})
             .limit(10)
             .populate('business', 'companyName')
             .populate('caigou', 'buyerCompanyName')
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
 
caigouGuanxiRouter.route(`/add`)
       .post((req,res) => {
             const inviter = req.body.inviter
             const inviterSource = req.body.inviterSource
             const business = req.body.business
             const caigou = req.body.caigou
             const caigouGuanxiName = req.body.caigouGuanxiName
             
             CaigouGuanxi.findOne({caigouGuanxiName:req.body.caigouGuanxiName}).then((doc)　=> {
                   if(doc){
                         res.status(400).json({ message: "巳存在" }).send(doc)
                   }else{
                   
                         let newData = {
                              inviter,
                              inviterSource,
                              business,
                              caigou,
                              caigouGuanxiName
                           };
               
                           let dataEntity = new CaigouGuanxi(newData)
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

caigouGuanxiRouter.route('/del/:id')
       .delete((req, res) => {
             var _id = `${req.params.id}`;
             CaigouGuanxi.findById({ _id }).then((doc) => {
                 if (!doc) {
                     res.status(400).json({ message: `${doc} 不存在` })
                 } else {
                  CaigouGuanxi.deleteOne({ _id }).then(doc => res.status(200).json({ message: "删除成功" })).catch(err => { console.log(err) })
                 }
             })
         })           
 
 module.exports = caigouGuanxiRouter
 