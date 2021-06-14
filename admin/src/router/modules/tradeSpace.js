import Layout from '@/layout'

const tradeSpaceRouter = {
    path: '/space',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Space',
    meta: {
      title: '交易空间',
      icon: 'component'
    },
    children: [
      {
        path: 'customer/management',
        component: () => import('@/views/tradeSpace/customerManagement'),
        name: 'CustomerManagement',
        meta: { title: '客服管理', noCache: true }
      },
      {
        path: 'auto/reply',
        component: () => import('@/views/tradeSpace/autoReply'),
        name: 'AutoReply',
        meta: { title: '自动回复', noCache: true }
      },
      {
        path: 'chat/recode',
        component: () => import('@/views/tradeSpace/chatRecord'),
        name: 'ChatRecord',
        meta: { title: '聊天记录', noCache: true }
      },
      {
        path: 'faq',
        component: () => import('@/views/tradeSpace/faq'),
        name: 'Faq',
        meta: { title: '常见问题', noCache: true }
      },
      {
        path: 'user/role',
        component: () => import('@/views/tradeSpace/userRole'),
        name: 'UserRole',
        meta: { title: '角色管理', noCache: true }
      }
    ]
}

export default tradeSpaceRouter