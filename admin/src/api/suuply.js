/**供应商管理
 * 商户管理 merchant
 * 产品分类 productCatalog
 * 品牌管理
 * 产品管理
 */
 import request from '@/utils/request'


// 获取品牌列表
export function getBrand(){
      return request({
            url:'/brand/',
            method:'get'
      })
}

// 添加品牌
export function addBrand(data) {
      return request({
        url:'/brand/add',
        method: 'post',
        data
      })
}

// 获取商户列表
export function getMerchant(){
      return request({
            url:'/business/search',
            method:'get'
      })
}

// 添加商户
export function addMerchant(data) {
      return request({
        url:'/business/add',
        method: 'post',
        data
      })
}

// 删除商户
export function delMerchant(data) {
      return request({
        url:`/business/del/${data}`,
        method: 'delete'
      })
}

// 获取产品分类列表
export function getProductCatalog(){
      return request({
            url:'/product/catalog/all',
            method:'get'
      })
}

// 添加产品分类
export function addProductCatalog(data) {
      return request({
            url:'/product/catalog/add',
            method: 'post',
            data
      })
}

// 查询产品
export function getProductList(){
      return request({
            url:'/product/',
            method:'get'
      })
}

// 新增产品
export function addProduct(data) {
      return request({
            url:'/product/add',
            method: 'post',
            data
      })
}

// 查询产品分类
export function getOneProductCatalgo(params){
      return request({
            url:`/product/catalog/${params}`,
            method:'get'
      })
}

//查询订单
export function getOrderList(){
      return request({
            url:'/order/',
            method:'get'
      })
}

// 添加订单
export function addOrder(data) {
      return request({
            url:'/order/add',
            method: 'post',
            data
      })
}

