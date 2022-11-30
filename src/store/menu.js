import { defineStore } from 'pinia'
import Layout from '@/components/layout/index.vue'
import { menuRoutes } from '@/router'

const modules = import.meta.glob('../views/**/*.vue')

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => {
    return {
      count: 0,
      isCollapse: false,
      menuList: menuRoutes,
    }
  },
  getters: {
  },
  actions: {
    setCount(count) {
      this.count = count
    },
    setCollapse(collapse) {
      this.isCollapse = collapse
    },
    setMenuList(routes) {
      this.menuList = this.menuList.concat(routes)
    },
    // getMenuListActions(router: any) {
    //     return new Promise((resolve, reject) => {
    //         //存的是有权限的路由，是一个数组
    //         getMenuListApi().then(res => {
    //             let accessedRoutes: RouteRecordRaw[] = [];
    //             if (res.code == 200) {
    //                 // console.log('res.data',res.data)
    //                 accessedRoutes = filterAsyncRoutes(res.data, router)
    //             }
    //             this.setMenuList(accessedRoutes)
    //             resolve(accessedRoutes)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // }
  },
})

export function filterAsyncRoutes(routes, router) {
  const res = []
  // 循环每一个路由
  routes.forEach((route) => {
    const tmp = { ...route }
    const component = tmp.component
    if (route.component) {
      if (component === 'Layout')
        tmp.component = Layout
      else
        tmp.component = modules[`../views${component}.vue`]
    }
    // 判断是否有下级
    if (tmp.children)
      tmp.children = filterAsyncRoutes(tmp.children, router)
    // console.log(tmp)
    router.addRoute(tmp)
    res.push(tmp)
  })
  return res
}
