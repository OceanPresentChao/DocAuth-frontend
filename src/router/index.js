import { createRouter, createWebHashHistory } from 'vue-router'
import DashBoard from '@/views/dashboard/DashBoard.vue'
import Account from '@/views/login/Account.vue'
import Layout from '@/components/layout/index.vue'
import { useAuthStore } from '@/store/auth'
import nowNewProject from '@/components/layout/project/nowNewProject.vue'

// 菜单路由在这里配置
// 一级菜单即不需要子菜单的配置可以参考“首页”配置
// 二级菜单即需要子菜单的配置可以参考“系统管理”配置
export const menuRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: 'carbon:home',
      roles: ['sys:manage'],
      // 此处需要标注isTop为true，否则会被认为是子菜单
      isTop: true,
    },
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: DashBoard,
      },
    ],
  },
  {
    path: '/reproject',
    component: Layout,
    redirect: '/project',
    meta: {
      title: '个人项目',
      icon: 'carbon:home',
      isTop: true,
    },
    children: [
      {
        name: 'project',
        path: '/project',
        component: () => import('@/views/project/ProjectList.vue'),
      },
    ],
  },
  {
    name: 'manage',
    path: '/manage',
    component: Layout,
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
        path: '/manage/permission',
        component: () => import('@/views/manage/PermissionManage.vue'),
        meta: {
          title: '权限管理',
          icon: 'carbon:security-services',
        },
      },
    ],
  },
  {
    name: 'project',
    path: '/project',
    component: Layout,
    redirect: '/project/create',
    meta: {
      title: '项目',
      icon: 'carbon:home',
      roles: ['sys:manage'],
    },
    children:
        [
          {
            name: 'createProject',
            path: '/project/create',
            component: () => import('@/components/layout/project/nowNewProject.vue'),
            meta: {
              title: '创建项目',
              roles: ['sys:manage'],
            },
          },
        ],
  },
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
