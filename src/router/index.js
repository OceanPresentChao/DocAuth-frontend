import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import DashBoard from '@/components/layout/dashboard/DashBoard.vue'
import Account from '@/views/login/Account.vue'
import { useAuthStore } from '@/store/auth'
import nowNewProject from '@/components/layout/project/nowNewProject.vue'

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
  {
    path:'/project',
    component:Layout,
    meta: {
      title: '项目',
      icon: 'carbon:home',
      roles: ['sys:manage'],
    },
    children:
        [
        {
        path:'/project/create',
        component:nowNewProject,
        meta:{
          title:'创建项目',
          roles: ['sys:manage'],
        }
        },
        ]
  }
]

const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Account,
  },
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

router.beforeEach((to, _) => {
  const authStore = useAuthStore()
  if (to.path === '/login') {
    if (authStore.getToken())
      return { path: '/' }
  }
  else {

    return true
  }
})
