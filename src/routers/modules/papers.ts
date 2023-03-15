/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const chartsRouter = [
  {
    path: '/paper',
    component: Layout,
    redirect: '/chat/index',
    name: 'chat',
    meta: {
      title: 'papers',
      icon: 'chat-square',
    },
    children: [
      {
        path: '/chat/index',
        component: () => import('@/views/papers/index.vue'),
        name: 'chatBox',
        meta: { title: 'papers', icon: 'chat-square' },
      },
    ],
  },
]

export default chartsRouter
