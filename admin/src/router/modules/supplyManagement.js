import Layout from '@/layout'

const supplyRouter = {
    path: '/suuply',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Supply',
    meta: {
        title: '供应商管理',
        icon: 'shopping',
        role: ['admin'],
        icon:'el-icon-s-claim'
    },
    children: [
        {
          path: 'merchant',
          component: () => import('@/views/supplyManagement/merchant/index'),
          name: 'Merchant',
          meta: { title: '商户管理', noCache: true,icon:'el-icon-s-check'  }
        },
        {
          path: 'product',
          component: () => import('@/views/supplyManagement/product/index'),
          name: 'Product',
          meta: { title: '产品管理', noCache: true,icon:'el-icon-orange'}
        },
        {
          path: 'product/catalog',
          component: () => import('@/views/supplyManagement/productCatalog/index'),
          name: 'ProductCatalog',
          meta: { title: '产品分类', noCache: true,icon:'el-icon-notebook-2'}
        },
        {
            path: 'order',
            component: () => import('@/views/supplyManagement/order/index'),
            name: 'Order',
            meta: { title: '订单管理', noCache: true,icon:'el-icon-shopping-cart-full'}
          }
      ]
}

export default supplyRouter