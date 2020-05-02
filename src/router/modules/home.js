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
      meta: { title: '轮播图管理', icon: 'edit' }
    },
    {
      path: 'memorabilia/memorabilia',
      component: () => import('@/views/home/memorabilia/memorabilia'),
      name: 'memorabilia',
      meta: { title: '大事记管理', icon: 'edit' }
    },
    {
      path: 'homepage/homepage',
      component: () => import('@/views/home/homepage/homepage'),
      name: 'homepage',
      meta: { title: '首页管理', icon: 'edit' }
    },
    {
      path: 'list/list',
      component: () => import('@/views/home/list/list'),
      name: 'list',
      meta: { title: '列表页管理', icon: 'edit' }
    },
    {
      path: 'focus_news/focus_news',
      component: () => import('@/views/home/focus_news/focus_news'),
      name: 'focus_news',
      meta: { title: '要闻管理', icon: 'edit' }
    },
    {
      path: 'briefing/briefing',
      component: () => import('@/views/home/briefing'),
      // component: Layout,
      name: '',
      meta: { title: '简报管理', icon: 'edit' },
      children: [
        {
          path: 'briefing/briefing',
          component: () => import('@/views/home/briefing/briefing/briefing'),
          name: 'briefing',
          meta: { title: '简报管理' }
        },
        {
          path: 'briefing/briefing_poster/briefing_poster',
          component: () => import('@/views/home/briefing/briefing_poster/briefing_poster'),
          name: 'briefing_poster',
          meta: { title: '简报海报管理' }
        }
      ]
    },
    {
      path: 'research/research',
      component: () => import('@/views/home/research/research'),
      name: 'research',
      meta: { title: '科研管理', icon: 'edit' }
    },
    {
      path: 'theme_education/theme_education',
      component: () => import('@/views/home/theme_education/theme_education'),
      name: 'theme_education',
      meta: { title: '主题教育管理', icon: 'edit' }
    },
    {
      path: 'hippophae/hippophae',
      component: () => import('@/views/home/hippophae'),
      name: '',
      meta: { title: '沙棘精神管理', icon: 'edit' },
      children: [
        {
          path: 'hippophae/hippophae',
          component: () => import('@/views/home/hippophae/hippophae'),
          name: 'hippophae',
          meta: { title: '沙棘精神管理' }
        },
        {
          path: 'hippophae/hippophae_video/hippophae_video',
          component: () => import('@/views/home/hippophae/hippophae_video/hippophae_video'),
          name: 'hippophae_video',
          meta: { title: '沙棘精神-视频管理' }
        }
      ]
    },
    {
      path: 'video/video',
      component: () => import('@/views/home/video/video'),
      name: 'video',
      meta: { title: '视频管理', icon: 'edit' }
    },
    {
      path: 'association/association',
      component: () => import('@/views/home/association/association'),
      name: 'association',
      meta: { title: '社团管理', icon: 'edit' }
    },
    {
      path: 'campus/campus',
      component: () => import('@/views/home/campus/campus'),
      name: 'campus',
      meta: { title: '校园风采管理', icon: 'edit' }
    },
    {
      path: 'collection/collection',
      component: () => import('@/views/home/collection/collection'),
      name: 'collection',
      meta: { title: '馆藏管理', icon: 'edit' }
    },
    {
      path: 'guide/guide',
      component: () => import('@/views/home/guide/guide'),
      name: 'guide',
      meta: { title: '导览管理', icon: 'edit' }
    }
  ]
}
export default homeRouter
