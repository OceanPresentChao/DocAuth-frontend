<script setup>
import { useTabsStore } from '@/store/tabs'
const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const { tabsList } = storeToRefs(tabsStore)
const activeTab = ref('')

onMounted(() => {
  beforeUnload()
  watch(route, (nv, ov) => {
    if (nv.meta.title) {
      activeTab.value = nv.path
      addTab(nv)
    }
  }, { immediate: true })
})
function addTab(route) {
  const { path, meta } = route
  const tab = {
    title: meta.title,
    path,
  }
  tabsStore.addTab(tab)
}
function tabClick(tab) {
  const { props } = tab
  router.push({ path: props.name, title: props.label })
}

function removeTab(targetName) {
  if (targetName === '/dashboard')
    return
  const tabs = tabsList.value
  let activeName = activeTab.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab)
          activeName = nextTab.path
      }
    })
  }
  tabsStore.removeTab(targetName)
  activeTab.value = activeName
  router.push({ path: activeName })
}

// 解决刷新数据丢失问题
function beforeUnload() {
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('tabViews', JSON.stringify(tabsList.value))
  })
  const tabSession = sessionStorage.getItem('tabViews')
  if (tabSession) {
    const oldViews = JSON.parse(tabSession)
    if (oldViews.length > 0)
      tabsStore.tabsList = oldViews
  }
}
</script>

<template>
  <el-tabs v-model="activeTab" type="card" closable @tab-click="tabClick" @tab-remove="removeTab">
    <el-tab-pane v-for="item in tabsList" :key="item.path" :label="item.title" :name="item.path" />
  </el-tabs>
</template>

<style scoped>
:deep(.el-tabs__header) {
    margin: 0.5rem 0;
}

:deep(.el-tabs__item) {
    height: 1.5rem !important;
    line-height: 1.5rem !important;
    text-align: center !important;
    border: 1px solid #d8dce5 !important;
    margin: 0px 3px !important;
    color: #495060;
    font-size: 0.8rem !important;
    padding: 0xp 1rem !important;
}

:deep(.el-tabs__nav) {
    border: none !important;
}

:deep(.is-active) {
    border-bottom: 1px solid transparent !important;
    border: 1px solid #42b983 !important;
    background-color: #42b983 !important;
    color: #fff !important;
}

:deep(.el-tabs__item:hover) {
    color: #495060 !important;
}

:deep(.is-active:hover) {
    color: #fff !important;
}
</style>
