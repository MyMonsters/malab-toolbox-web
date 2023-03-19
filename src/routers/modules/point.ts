import Layout from '@/layout/index.vue'

const point = [
  {
    path: '/point',
    component: Layout,
    redirect: '/point/world',
    name: 'point',
    meta: {
      title: 'point',
      icon: 'link',
    },
    children: [
      {
        path: '/point/world',
        component: () => import('@/views/point/index.vue'),
        name: 'world',
        meta: { title: 'World', icon: 'MenuIcon' },
      },
    ],
  },
]

export default point
