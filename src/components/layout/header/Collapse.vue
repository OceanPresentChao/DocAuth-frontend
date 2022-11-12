<script setup lang='ts'>
import { useMenuStore } from '@/store/menu'
const menuStore = useMenuStore()
const { isCollapse } = storeToRefs(menuStore)

function toggleCollapse() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <span class="icons" @click="toggleCollapse">
    <Icon icon="ep:expand" :rotate="isCollapse ? 0 : 2" />
  </span>
</template>

<style scoped>
.icons {
    display: flex;
    align-items: center;
    font-size: 22px;
    color: #303133;
    cursor: pointer;
    margin-right: 15px;
}
</style>
