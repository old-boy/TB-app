import Layout from '@/layout'

const buyerRouter = {
    path: '/buyer',
    component: Layout,
    redirect: 'noRedirect',
    name: '采购商管理',
    icon: 'el-icon-sold-out',
    children: [
      {
        path: 'buyer',
        component: () => import('@/views/buyerManagement/buyer'),
        name: 'Buyer',
        meta: { title: '采购商管理', icon: 'el-icon-shopping-bag-1' }
      }
    ]
}
export default buyerRouter
