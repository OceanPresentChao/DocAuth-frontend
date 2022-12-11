<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from './types'
import { useMenuStore } from '@/store/menu'

const menuStore = useMenuStore()
const { isCollapse, menuList } = storeToRefs(menuStore)
const menuData = computed(() => getMenuData(menuList.value))

function getMenuData(menuRoute: RouteRecordRaw[]): MenuOption[] {
  const res: MenuOption[] = []
  for (const menu of menuRoute) {
    if (menu.meta && menu.meta.hidden)
      continue

    const item: MenuOption = {
      index: (menu.path ? menu.path : menu.redirect?.toString()) || '/',
      title: menu.meta?.title as string || '',
      icon: menu.meta?.icon as string || '',
      children: [],
    }

    if (menu.children && menu.meta && !menu.meta.isTop)
      item.children = getMenuData(menu.children)
    res.push(item)
  }
  return res
}
</script>

<template>
  <el-menu v-bind="$attrs" style="height:100%;" :collapse="isCollapse" router>
    <MenuItem
      v-for="(item) in menuData"
      :key="item.index"
      :item="item"
    />
  </el-menu>
</template>

<style scoped lang="scss">
</style>
