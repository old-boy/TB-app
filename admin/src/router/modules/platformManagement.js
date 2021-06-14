import Layout from '@/layout'

const platformRouter = {
    path: '/platform',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Platform',
    meta: {
        title: '平台管理',
        icon: 'el-icon-news'
    },
    children: [
        {
          path: 'carousel',
          component: () => import('@/views/platformManagement/carousel'),
          name: 'Carousel',
          meta: { title: '轮播图', noCache: true }
        },
        {
          path: 'features',
          component: () => import('@/views/platformManagement/features/index'), // Parent router-view
          name: 'Features',
          meta: { title: '功能区' },
          // redirect: '/features/onlineShowroom/index',
          children: [
            {
              path: 'online-showroom',
              component: () => import('@/views/platformManagement/features/onlineShowroom/index'),
              name: 'OnlineShowroom',
              meta: { title: '线上展厅' }
            },
            {
              path: 'factory/product',
              component: () => import('@/views/platformManagement/features/factoryProduct/index'),
              name: 'FactoryProduct',
              meta: { title: '厂家新品' }
            },
            {
              path: 'member/showroom',
              component: () => import('@/views/platformManagement/features/memberShowroom/index'),
              name: 'MemberShowroom',
              meta: { title: '会员展厅' }
            },
            {
              path: 'youpin',
              component: () => import('@/views/platformManagement/features/youpin/index'),
              name: 'YouPin',
              meta: { title: '优品推荐' }
            },
            {
              path: 'ordering',
              component: () => import('@/views/platformManagement/features/ordering/index'),
              name: 'Ordering',
              meta: { title: '订货会' }
            }
          ]
        },
        {
          path: 'user/authority',
          component: () => import('@/views/platformManagement/userAuthority'),
          name: 'UserAuthority',
          meta: { title: '用户权限', noCache: true }
        },
        {
            path: 'user/audit',
            component: () => import('@/views/platformManagement/userAudit'),
            name: 'UserAudit',
            meta: { title: '用户审核', noCache: true }
          },
          {
            path: 'supply/management',
            component: () => import('@/views/platformManagement/supplyManagement'),
            name: 'SupplyManagement',
            meta: { title: '找货源管理', noCache: true }
          }
      ]
}

export default platformRouter