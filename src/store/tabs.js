import { defineStore } from 'pinia'

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => {
    const data = []
    return {
      collapse: false,
      tabsList: data,
    }
  },
  getters: {
    // 获取collapse
    getCollapse() {
      return this.collapse
    },
    getTabsList() {
      return this.tabsList
    },
    getAmount() {
      return this.tabsList.length
    },
  },
  actions: {
    setCollapse(collapse) {
      this.$state.collapse = collapse
    },
    addTab(tab) {
      if (this.$state.tabsList.some(item => item.path === tab.path))
        return
      this.$state.tabsList.push(tab)
    },
    clearTabs() {
      this.tabsList.splice(0, this.tabsList.length)
    },
  },

})
