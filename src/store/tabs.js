import { defineStore } from 'pinia'

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => {
    const data = []
    return {
      tabsList: data,
    }
  },
  getters: {
    getTabsList() {
      return this.tabsList
    },
    getAmount() {
      return this.tabsList.length
    },
  },
  actions: {
    addTab(tab) {
      if (!this.tabsList.some(item => item.path === tab.path))
        this.tabsList.push(tab)
    },
    clearTabs() {
      this.tabsList.splice(0, this.tabsList.length)
    },
    removeTab(tabpath) {
      const index = this.tabsList.findIndex(item => item.path === tabpath)
      this.tabsList.splice(index, 1)
    },
  },

})
