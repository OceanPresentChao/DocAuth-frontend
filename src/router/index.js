import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import DashBoard from '@/components/layout/dashboard/DashBoard.vue'
export const menuRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: 'carbon:home',
      roles: ['sys:manage'],
    },
    children: [
      {
        path: '/dashboard',
        component: DashBoard,
      },
    ],
  },
]

const constantRoutes = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/error/404.vue'),
  },
]

export const router = createRouter({
  routes: [...menuRoutes, ...constantRoutes],
  history: createWebHashHistory(),
})
