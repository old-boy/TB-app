var express = require('express')
var productRouter = express.Router()

var Product = require('./../app/models/product')


productRouter.route(`/`)
.get((req,res) => {
    Product.find({})
    .sort({'_id':-1})
    .limit(10)
    .populate('productCatalog', 'catalogName')
    .populate('brandName','brandName brandDescription')
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
                msg: '没有product',
                result: ''
            })
        }
    })
})



productRouter.route(`/:id`)
    .get((req,res) => {
        var _id = `${req.params.id}`;
        Product.findByIdAndUpdate({ _id }, req.body, (err, faq) => {
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: "ok" })
            }
        })
    })

productRouter.route(`/add`)
    .post((req,res) => {
        const productName = req.body.productName,
        productCatalog = req.body.productCatalog,
        productMainPicture = '',
        productPrice = req.body.productPrice,
        productTotal = req.body.productTotal,
        productSalesTotal = req.body.productSalesTotal,
        productStatus = req.body.productStatus,
        productOrigin = req.body.productOrigin,
        brandName = req.body.brandName;

        Product.findOne({productName:req.body.productName}).then((doc)　=> {
            if(doc){
                console.log('productName  ' + doc)
				res.status(400).json({ message: "巳存在" }).send(doc)
			}else{
                let newProduct = {
                    productName,
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
                            status: '200',
                            msg: '创建成功',
                            result: ''
                        })
                    }
                })
            }
        })
    })

    productRouter.route('/del/:id')
		.delete((req, res) => {
			var _id = `${req.params.id}`;
			Product.findById({ _id }).then((doc) => {
			    if (!doc) {
				  res.status(400).json({ message: `${doc} 不存在` })
			    } else {
                    Product.deleteOne({ _id }).then(doc => res.status(200).json({ message: "删除成功" })).catch(err => { console.log(err) })
			    }
			})
		  })

//统计某个产品分类下的产品数量
productRouter.route('/total')
.get((req,res) => {
    Product.find({})
    .aggregate( [
        {
          $group: {
             _id: null,
             total: { $sum: "$discountMoney" }
          }
        }
     ] );
})

module.exports = productRouter