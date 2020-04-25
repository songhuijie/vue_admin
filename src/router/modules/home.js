/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const homeRouter = {
  path: '/home',
  component: Layout,
  redirect: '/home/rotation/rotation',
  name: 'Table',
  meta: {
    title: '主页',
    icon: 'table'
  },
  children: [
    {
      path: 'rotation/rotation',
      component: () => import('@/views/home/rotation/rotation'),
      name: 'rotation',
      meta: { title: '轮播图管理', icon: 'list'  }
    },
    {
      path: 'memorabilia/memorabilia',
      component: () => import('@/views/home/memorabilia/memorabilia'),
      name: 'memorabilia',
      meta: { title: '大事记管理' , icon: 'list' }
    }
  ]
}
export default homeRouter
