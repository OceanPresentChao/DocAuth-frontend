<script lang="ts" setup>
import type { PropType } from 'vue'
import { defineProps } from 'vue'
import type { MenuOption } from './types'

defineProps({
  item: {
    type: Object as PropType<MenuOption>,
    required: true,
  },
})
</script>

<template>
  <!-- 没有子节点，使用 el-menu-item 渲染 -->
  <el-menu-item
    v-if="!item.children || !item.children.length"
    :index="item.index"
  >
    <el-icon v-if="item.icon">
      <Icon :icon="item.icon" />
    </el-icon>
    <span>{{ item.title }}</span>
  </el-menu-item>

  <!-- 有子节点，使用 el-sub-menu 渲染 -->
  <el-sub-menu
    v-else
    :index="item.index"
  >
    <template #title>
      <el-icon v-if="item.icon">
        <Icon :icon="item.icon" />
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <!-- 循环渲染 -->
    <MenuItem
      v-for="sub in item.children" :key="sub.index"
      :item="sub"
    />
  </el-sub-menu>
</template>

<style scoped lang="scss">
</style>
