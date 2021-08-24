/*
 * @Author: your name
 * @Date: 2021-08-25 02:29:51
 * @LastEditTime: 2021-08-25 02:54:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \TB-app\admin\src\router\modules\chat.js
 */
import Layout from '@/layout'

const chatRouter = {
    path: '/chat',
    component: Layout,
    redirect: 'noRedirect',
    icon: 'el-icon-sold-out',
    meta: {
      title: '聊天管理',
      icon: 'shopping',
      role: ['admin'],
      icon:'el-icon-money'
    },
    children: [
      {
        path: 'customer',
        component: () => import('@/views/chat/customer/index'),
        name: 'Customer',
        meta: { title: '客服管理', icon: 'el-icon-shopping-bag-1' }
      },
      {
        path: 'autoReply',
        component: () => import('@/views/chat/autoReply/index'),
        name: 'AutoReply',
        meta: { title: '自动回复', icon: 'el-icon-user' }
      },
      {
        path: 'chatHistory',
        component: () => import('@/views/chat/chatHistory/index'),
        name: 'ChatHistory',
        meta: { title: '聊天记录', icon: 'el-icon-hot-water' }
      },
      {
        path: 'faq',
        component: () => import('@/views/chat/faq/index'),
        name: 'Faq',
        meta: { title: '常见问题', icon: 'el-icon-hot-water' }
      },
      {
        path: 'role',
        component: () => import('@/views/chat/role/index'),
        name: 'Role',
        meta: { title: '角色管理', icon: 'el-icon-hot-water' }
      }
    ]
}
export default chatRouter
