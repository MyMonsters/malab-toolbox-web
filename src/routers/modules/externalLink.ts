import Layout from '@/layout/index.vue'

const externalLink = [
  {
    path: '/external-link',
    component: Layout,
    redirect: '/external-link/wechat',
    name: 'external-link',
    meta: {
      title: 'chatgpt',
      icon: 'link',
    },
    children: [
      // {
      //   path: '/external-link/wechat',
      //   name: 'wechat',
      //   component: () => import('@/views/externalLinks/wechat/index.vue'),
      //   meta: { title: '加微信群', icon: 'MenuIcon' },
      // },
      // {
      //   path: 'https://github.com/zouzhibin/vue-admin-perfect',
      //   name: 'github',
      //   meta: { title: 'Github 地址', icon: 'MenuIcon' },
      // },
      // {
      //   path: 'https://gitee.com/yuanzbz/vue-admin-perfect?_from=gitee_search',
      //   name: 'github',
      //   meta: { title: 'Gitee 地址', icon: 'MenuIcon' },
      // },
      // {
      //   path: 'https://yuanzbz.gitee.io/vue-admin-simple',
      //   name: 'simple',
      //   meta: { title: '简易版本', icon: 'MenuIcon' },
      //   component: () => import('@/views/externalLinks/simple/index.vue'),
      // },
      {
        path: '/external-link/iframe',
        component: () => import('@/views/externalLinks/chatgpt/index.vue'),
        name: 'iframe',
        meta: { title: 'chatgpt', icon: 'MenuIcon' },
      },
    ],
  },
]

export default externalLink
