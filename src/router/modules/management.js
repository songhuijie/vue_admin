/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const managementRouter = {
  path: '/management',
  component: Layout,
  redirect: '/management/major/major',
  name: 'Table',
  meta: {
    title: '系统管理',
    icon: 'table'
  },
  children: [
    {
      path: 'password/password',
      component: () => import('@/views/management/password/password'),
      name: 'password',
      meta: { title: '修改密码', icon: 'list' }
    },
    {
      path: 'account/account',
      component: () => import('@/views/management/account/account'),
      name: 'account',
      meta: { title: '账号管理', icon: 'list' }
    }
  ]
}
export default managementRouter
