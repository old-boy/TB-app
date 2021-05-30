var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var multipartMiddleware = require('connect-multiparty')()
var { signRequired, adminRole } = require('../middleware/auth.js')

var Product = require('./../app/models/product')
router.use(signRequired)

//查询所有的 tags
router.get('/', (req, res, next) => {
	Product.find({})
		.sort({'_id':-1})
		.limit(10)
        .populate('ProductCatalog','productCatalog')
        .populate('Brand','brandName brandDescription')
		.exec()
		.then((product) => {
			if (product) {
				res.json({
					status: '1',
					msg: '',
					result: product
				})
			} else {
				res.json({
					status: '0',
					msg: '没有product',
					result: ''
				})
			}
		})
})

//根据name查询product
router.get('/:productName',(req,res,next) => {
    const productName = req.params.productName;
    Product.find({ productName })
    .sort({'_id':-1})
    .limit(10)
    .exec()
    .then((product) => {
        if (product) {
            res.json({
                status: '1',
                msg: '',
                result: product
            })
        } else {
            res.json({
                status: '0',
                msg: '没有product',
                result: ''
            })
        }
    })
})

//新增
router.post('/add',(req,res,next) => {
    const productName = req.body.productName,
    productCatalog = req.body.productCatalog,
    productMainPicture = req.body.productMainPicture,
    productPrice = req.body.productPrice,
    productTotal = req.body.productTotal,
    productSalesTotal = req.body.productSalesTotal,
    productStatus = req.body.productStatus,
    productOrigin = req.body.productOrigin,
    brandName = req.body.brandName;


       Product.findOne({productName:req.body.productName}).then((product)　=> {
        if(product){
            return res.status(400).json(
				{
					status: '0',
					msg: '产品已存在',
					result: ''
				}
			);
        }else{
            let newProduct = {
                productCatalog,
                productMainPicture,
                productTotal,
                productPrice,
                productTotal,
                productSalesTotal,
                productStatus,
                productOrigin,
                brandName
            };

            let productEntity = new Product(newProduct)
            productEntity.save(err => {
                if (err) {
                    res.json({
                        status: '0',
                        msg: err.message,
                        result: ''
                    })
                } else {
                    res.json({
                        status: '1',
                        msg: '产品创建成功',
                        result: ''
                    })
                }
            })
        }
    })
})

//根据 id 更新数据
router.post('/update/:id',(req,res,next) => {
	var _id = `${req.params.id}`;
	Product.updateOne({ _id }, req.body, (err, product) => {
		if (err) {
			res.status(500).json({ error: err });
		} else {
			res.status(200).send(product);
		}
	})
})

//删除tags
router.delete('/del/:id',(req,res,next) => {
    const id = `${req.params.id}`;
	Product.deleteOne({ _id: id }).then((product) => {
		if(product){
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

//查询类型总数
router.get('/total',(req,res,next) => {
    const total = Product.find().count();
    console.log('product total   ' + total)
    if(total > 0){
        res.json({
            status: '1',
            msg: '',
            total: num
        })
    } else {
        res.json({
            status: '0',
            msg: '没有产品',
            total: 0
        })
    }

})

module.exports = router