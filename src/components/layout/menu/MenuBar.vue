<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/store/menu'
// 控制菜单展开和关闭
const menuStore = useMenuStore()
const { menuList, isCollapse } = storeToRefs(menuStore)

const route = useRoute()
const activeIndex = computed(() => {
  const { path } = route
  return path
})
// 菜单数据

function handleOpen(index, indexPath) {
}
function handleClose(index, indexPath) {
}
// 菜单数据
</script>

<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeIndex"
        class="menu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#303133"
        unique-opened router
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/dashboard">
          Logo
        </el-menu-item>
        <MenuItem :menu-list="menuList" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style  scoped>
.menu:not(.el-menu--collapse) {
    width: 15vw;
}

.menu {
    min-height: 100vh;
}

.el-menu {
    border-right: none;
}
</style>
