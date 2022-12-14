import { createRouter, createWebHashHistory } from 'vue-router'
import DashBoard from '@/views/dashboard/DashBoard.vue'
import Account from '@/views/login/Account.vue'

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
    path: '/manage',
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
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: 'login',
    path: '/login',
    component: Account,
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/Error404.vue'),
  },
]

export const router = createRouter({
  routes: [...menuRoutes, ...constantRoutes],
  history: createWebHashHistory(),
})

