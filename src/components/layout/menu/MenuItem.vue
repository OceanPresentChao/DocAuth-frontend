<script setup lang='ts'>
const props = defineProps(['menuList'])
</script>

<template>
  <template v-for="menu in menuList" :key="menu.path">
    <template v-if="!menu.meta.hidden">
      <el-sub-menu
        v-if="!menu.redirect && menu.children && menu.children.length > 0" :key="menu.path"
        :index="menu.path"
      >
        <template #title>
          <Icon v-if="menu.meta.icon" class="icons" :icon="menu.meta.icon" />
          <span>{{ menu.meta.title }}</span>
        </template>
        <menu-item :menu-list="menu.children" />
      </el-sub-menu>
      <el-menu-item v-else style="color: #f4f4f5" :index="menu.redirect ? menu.redirect : menu.path">
        <Icon v-if="menu.meta.icon" class="icons" :icon="menu.meta.icon" />
        <template #title>
          {{ menu.meta.title }}
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<style scoped>
.icons {
  width: 24px;
  height: 18px;
  margin-right: 5px;
}
</style>
