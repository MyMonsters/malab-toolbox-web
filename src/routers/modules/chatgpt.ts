import Layout from '@/layout/index.vue'

const chatgpt = [
  {
    path: '/chatgpt',
    component: Layout,
    redirect: '/chatgpt/machat',
    name: 'chatgpt',
    meta: {
      title: 'chatgpt',
      icon: 'link',
    },
    children: [
      {
        path: '/chatgpt/machat',
        component: () => import('@/views/chatgpt/Machatgpt'),
        name: 'Machat',
        meta: { title: 'Machat', icon: 'MenuIcon' },
      },
      {
        path: '/chatgpt/chatPDF',
        component: () => import('@/views/chatgpt/chatpdf'),
        name: 'chatPDF',
        meta: { title: 'chatPDF', icon: 'MenuIcon' },
      },
    ],
  },
]

export default chatgpt
