/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const chartsRouter = [
  {
    path: '/paper',
    component: Layout,
    redirect: '/paper/index',
    name: 'chat',
    meta: {
      title: 'papers',
      icon: 'chat-square',
    },
    children: [
      {
        path: '/paper/459paper',
        component: () => import('@/views/papers/459paper'),
        name: '459paper',
        meta: { title: '文献部落', icon: 'chat-square' },
      },
      {
        path: '/paper/LetPubs',
        component: () => import('@/views/papers/LetPubs'),
        name: 'chatBox',
        meta: { title: 'LetPubs', icon: 'chat-square' },
      },
      {
        path: '/paper/Zlibrary',
        component: () => import('@/views/papers/Z-library'),
        name: 'library',
        meta: { title: 'Z-library', icon: 'chat-square' },
      },
    ],
  },
]

export default chartsRouter
