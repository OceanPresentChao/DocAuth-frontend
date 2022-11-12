import { defineStore } from 'pinia'

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => {
    const data = []
    return {
      count: 0,
      collapse: false,
      tabsList: data,
    }
  },
  getters: {
    getCount() {
      return this.count
    },
    // 获取collapse
    getCollapse() {
      return this.collapse
    },
    getTabsList() {
      return this.tabsList
    },
  },
  actions: {
    setCount(count) {
      this.$state.count = count
    },
    setCollapse(collapse) {
      this.$state.collapse = collapse
    },
    addTab(tab) {
      if (this.$state.tabsList.some(item => item.path === tab.path))
        return
      this.$state.tabsList.push(tab)
    },
  },

})
