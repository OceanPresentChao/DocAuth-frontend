import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import DashBoard from '@/views/dashboard/DashBoard.vue'
import Account from '@/views/login/Account.vue'
import { useAuthStore } from '@/store/auth'
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
    path: '/user',
    name: 'user',
    component: import('@/views/user/UserDetail.vue'),
  },
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

const whiteList = ['/login']

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  return true
  // NProgress.start()
  // if (authStore.getToken()) { // 判断是否有token
  //   if (to.path === '/login')
  //     next({ path: '/' })

  //   else
  //     return true
  // }
  // else {
  //   if (whiteList.includes(to.path)) { // 在免登录白名单，直接进入
  //     next()
  //   }
  //   else {
  //     next('/login') // 否则全部重定向到登录页
  //   }
  // }
})

router.afterEach(() => {
  // NProgress.done()
})
