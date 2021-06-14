import Layout from '@/layout'

const applicationRouter = {
    path: '/application',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Application',
    meta: {
      title: '应用管理',
      icon: 'international'
    },
    children: [
      {
        path: 'application/version',
        component: () => import('@/views/applicationManagement/appcationEntrance'),
        name: 'AppcationEntrance',
        meta: { title: '应用入口', noCache: true }
      },
      {
        path: 'application/android',
        component: () => import('@/views/applicationManagement/androidVersion'),
        name: 'AndroidVersion',
        meta: { title: 'Android 版本', noCache: true }
      }
    ]
}

export default applicationRouter