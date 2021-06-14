import Layout from '@/layout'

const auditRouter = {
    path: '/authority',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Authority',
    meta: {
      title: '用户审核',
      role: ['admin'],
      icon:'el-icon-set-up'
    },
    children: [
        {
          path: 'supply',
          component: () => import('@/views/audit/supplyAudit/index'),
          name: 'SupplyAudit',
          meta: { title: '供应商审核', noCache: true }
        },
        {
          path: 'buyer',
          component: () => import('@/views/audit/buyerAudit/index'),
          name: 'BuyerAudit',
          meta: { title: '采购商审核', noCache: true }
        }
      ]
}

export default auditRouter