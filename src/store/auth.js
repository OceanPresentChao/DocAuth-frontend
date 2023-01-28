import { defineStore } from 'pinia'
import { useTabsStore } from './tabs'
import { requestUserDetail } from '@/api/user'
const emptyInfo = {
  id: 4,
  name: 'OceanPresent',
  username: 'OceanPresent',
  email: '',
  phone: '12345678910',
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
      const str = localStorage.getItem(this.TokenKey)
      if (str)
        return JSON.parse(str)
      return null
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
      location.reload()
    },
    async fetchUserInfo() {
      const token = this.getToken()
      if (token) {
        const data = (await requestUserDetail({ id: token.id })).data
        const user = data.data
        console.log(user)
        Object.assign(this.userInfo, user)
      }
    },
  },
})

