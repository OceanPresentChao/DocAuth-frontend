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
          title: '角色管理',
          icon: 'carbon:security-services',
        },
      },
      {
        name: 'functionManage',
        path: '/manage/function',
        component: () => import('@/views/manage/FunctionManage.vue'),
        meta: {
          title: '权限管理',
          icon: 'carbon:security-services',
         },
       },
      {
        name: 'apiManage',
        path: '/manage/api',
        component: () => import('@/views/manage/ApiManage.vue'),
        meta: {
          title: '接口管理',
          icon: 'carbon:security-services',
        },
      },
      {
        name: 'test',
        path: '/manage/test',
        component: () => import('@/views/manage/test.vue'),
        meta: {
          title: '测试',
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
            name: 'viewProject',
            path: '/project/view',
            component: () => import('@/views/project/viewProject.vue'),
            meta: {
              title: '观看项目',
              icon: 'carbon:view',
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

