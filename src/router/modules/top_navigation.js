/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const topRouter = {
  path: '/wei_yuan ',
  component: Layout,
  redirect: 'top_navigation/wei_yuan/wei_yuan',
  name: 'Table',
  meta: {
    title: '顶部导航',
    icon: 'table'
  },
  children: [
    {
      path: '/wei_yuan/wei_yuan',
      component: () => import('@/views/top_navigation/wei_yuan/wei_yuan'),
      name: 'wei_yuan',
      meta: { title: '卫院概况管理', icon: 'edit' }
    },
    {
      path: 'faculty/faculty',
      component: () => import('@/views/top_navigation/faculty/faculty'),
      name: 'faculty',
      meta: { title: '院系管理', icon: 'edit' }
    },
    {
      path: 'teachers/teachers',
      component: () => import('@/views/top_navigation/teachers/teachers'),
      name: 'teachers',
      meta: { title: '师资管理', icon: 'edit' }
    },
    {
      path: 'students/students',
      component: () => import('@/views/top_navigation/students/students'),
      name: 'students',
      meta: { title: '招生管理', icon: 'edit' }
    },
    {
      path: 'logistics/logistics',
      component: () => import('@/views/top_navigation/logistics/logistics'),
      name: 'logistics',
      meta: { title: '后勤中心管理', icon: 'edit' }
    },
    {
      path: 'school_calendar/school_calendar',
      component: () => import('@/views/top_navigation/school_calendar/school_calendar'),
      name: 'school_calendar',
      meta: { title: '校历管理', icon: 'edit' }
    },
    {
      path: 'notice/notice',
      component: () => import('@/views/top_navigation/notice/notice'),
      name: 'notice',
      meta: { title: '公告管理', icon: 'edit' }
    }

  ]
}
export default topRouter
