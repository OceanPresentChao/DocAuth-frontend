import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import DashBoard from '@/views/dashboard/DashBoard.vue'

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
    name: 'projectlist',
    path: '/projectList',
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
    ],
  },
  {
    name: 'project',
    path: '/project',
    redirect: '/project/create',
    meta: {
      title: '项目管理',
      icon: 'carbon:home',
      roles: ['sys:manage'],
    },
    children:
        [
          {

            name: 'createProject',
            path: '/project/create',
            component: () => import('@/views/project/nowNewProject.vue'),
            meta: {
              title: '创建项目',
              icon: 'carbon:star',
              roles: ['sys:manage'],
            },
          },
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

const asyncRoutes = [
  {
    name: 'userDetail',
    path: '/userDetail',
    component: () => import('@/views/user/UserDetail.vue'),
  },
  {
    path: '/task/:id',
    component: () => import('@/views/project/TaskDetail.vue'),
    redirect: '/task/:id/timeline',
    meta: {
      title: '任务信息',
    },
    children:
        [
          {
            path: '/task/:id/timeline',
            component: () => import('@/views/project/TaskTimeline.vue'),
            meta: {
              title: '任务时间线',
            },
          },
          {
            path: '/task/:id/edit',
            component: () => import('@/views/project/StepEdit.vue'),
            meta: {
              title: '编撰任务',
              name: 'edit',
              step: 1,
            },
          },
          {
            path: '/task/:id/review',
            component: () => import('@/views/project/StepEdit.vue'),
            meta: {
              title: '审阅任务',
              name: 'review',
              step: 2,
            },
          },
          {
            path: '/task/:id/judge',
            component: () => import('@/views/project/StepEdit.vue'),
            meta: {
              title: '审批任务',
              name: 'judge',
              step: 3,
            },
          },
          {
            path: '/task/:id/compile',
            component: () => import('@/views/project/StepEdit.vue'),
            meta: {
              title: '汇签任务',
              name: 'compile',
              step: 4,
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
    component: () => import('@/views/login/Account.vue'),
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/Error404.vue'),
  },
]

export const router = createRouter({
  routes: [...menuRoutes, ...constantRoutes, ...asyncRoutes],
  history: createWebHashHistory(),
})

router.beforeEach(() => {
  NProgress.start()
  return true
})

router.afterEach(() => {
  NProgress.done()
})

