import { createRouter, createWebHashHistory } from 'vue-router'
import DashBoard from '@/views/dashboard/DashBoard.vue'
import Account from '@/views/login/Account.vue'
import { useAuthStore } from '@/store/auth'
// 菜单路由在这里配置
export const menuRoutes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: DashBoard,
    meta: {
      title: '首页',
      icon: 'carbon:home',
      roles: ['sys:manage'],
    },
  },
  {
    name: 'project',
    path: '/project',
    component: () => import('@/views/project/ProjectList.vue'),
    meta: {
      title: '个人项目',
      icon: 'carbon:home',
    },
  },
  {
    name: 'manage',
    component: () => import('@/views/manage/index.vue'),
    redirect: '/manage/user',
    meta: {
      title: '系统管理',
      icon: 'carbon:security-services',
    },
    children: [
      {
        name: 'userManage',
        path: '/manage/user',
        component: () => import('@/views/manage/UserManage.vue'),
        meta: {
          title: '用户管理',
          icon: 'carbon:user-access',
        },
      },
      {
        name: 'permissionManage',
        path: '/manage/Permission',
        component: () => import('@/views/manage/PermissionManage.vue'),
        meta: {
          title: '权限管理',
          icon: 'carbon:security-services',
        },
      },
    ],
  },
]

const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
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
