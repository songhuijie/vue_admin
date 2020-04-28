/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const otherRouter = {
  path: '/other',
  component: Layout,
  redirect: '/other/major/major',
  name: 'Table',
  meta: {
    title: '其他',
    icon: 'table'
  },
  children: [
    {
      path: 'major/major',
      component: () => import('@/views/other/major/major'),
      name: 'major',
      meta: { title: '专业分类管理', icon: 'list' }
    },
    {
      path: 'contact/contact',
      component: () => import('@/views/other/contact/contact'),
      name: 'contact',
      meta: { title: '联系我们', icon: 'list' }
    },

    {
      path: 'content/content',
      component: () => import('@/views/other/content/content'),
      name: 'content',
      meta: { title: '内容管理', icon: 'list' }
    },
    {
      path: 'content/footer',
      component: () => import('@/views/other/content/footer'),
      name: 'footer',
      meta: { title: '内容底部配置', icon: 'list' }
    }

    // {
    //   path: 'content',
    //   component: () => import('@/views/other/content/content'),
    //   name: '',
    //   meta: { title: '内容管理', icon: 'list' },
    //   children: [
    //     {
    //       path: 'content',
    //       component: () => import('@/views/other/content/content'),
    //       name: 'content',
    //       meta: { title: '内容管理' }
    //     },
    //     {
    //       path: 'footers',
    //       component: () => import('@/views/other/content/footers'),
    //       name: 'footer',
    //       meta: { title: '内容底部配置1' }
    //     },
    //   ]
    // },

  ]
}
export default otherRouter
