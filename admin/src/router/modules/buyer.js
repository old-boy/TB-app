import Layout from '@/layout'

const buyerRouter = {
    path: '/buyer',
    component: Layout,
    redirect: 'noRedirect',
    icon: 'el-icon-sold-out',
    meta: {
      title: '采购商管理',
      icon: 'shopping',
      role: ['admin'],
      icon:'el-icon-money'
    },
    children: [
      {
        path: 'buyers',
        component: () => import('@/views/buyerManagement/buyer'),
        name: 'Buyer',
        meta: { title: '采购商', icon: 'el-icon-shopping-bag-1' }
      },
      {
        path: 'info',
        component: () => import('@/views/buyerManagement/buyerInfo'),
        name: 'BuyerInfo',
        meta: { title: '采购商员工', icon: 'el-icon-user' }
      },
      {
        path: 'link',
        component: () => import('@/views/buyerManagement/buyerLink'),
        name: 'BuyerLink',
        meta: { title: '邀请供应商', icon: 'el-icon-hot-water' }
      }
    ]
}
export default buyerRouter
