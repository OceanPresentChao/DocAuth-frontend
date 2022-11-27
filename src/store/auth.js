import { defineStore } from 'pinia'
import { useTabsStore } from './tabs'
const emptyInfo = {
  name: 'OceanPresent',
  avatar: 'http://q1.qlogo.cn/g?b=qq&nk=1255342403&s=640',
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      TokenKey: 'AuthToken',
      currentPage: 'login',
      userInfo: emptyInfo,
    }
  },
  getters: {

  },
  actions: {
    getToken() {
      return localStorage.getItem(this.TokenKey)
    },
    setToken(token) {
      localStorage.setItem(this.TokenKey, token)
    },
    removeToken() {
      localStorage.removeItem(this.TokenKey)
    },
    setCurrentPage(page) {
      this.currentPage = page
    },
    logOut() {
      const tabsStore = useTabsStore()
      this.userInfo = emptyInfo
      this.removeToken()
      tabsStore.clearTabs()
    },
  },
})

