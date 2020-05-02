/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const sideRouter = {
  path: '/data_hospital ',
  component: Layout,
  redirect: '/data_hospital/data_hospital',
  name: 'Table',
  meta: {
    title: '侧边导航',
    icon: 'table'
  },
  children: [
    {
      path: '/data_hospital/data_hospital',
      component: () => import('@/views/side_navigation/data_hospital/data_hospital'),
      name: 'data_hospital',
      meta: { title: '数据卫院', icon: 'edit' }
    },
    {
      path: '/history/history',
      component: () => import('@/views/side_navigation/history/history'),
      name: 'history',
      meta: { title: '卫院历史', icon: 'edit' }
    },
    {
      path: '/photo_wall/photo_wall',
      component: () => import('@/views/side_navigation/photo_wall/photo_wall'),
      name: 'photo_wall',
      meta: { title: '照片墙', icon: 'edit' }
    }

  ]
}
export default sideRouter
