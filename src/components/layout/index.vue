<script setup>
import { useMenuStore } from '@/store/menu'
const menuStore = useMenuStore()
const { isCollapse } = storeToRefs(menuStore)
</script>

<template>
  <el-container>
    <el-aside
      style="height: 100vh;position: fixed;"
      :style="{ width: isCollapse ? '5%' : '10%' }"
    >
      <!-- Aside content -->
      <MenuBar />
    </el-aside>
    <el-container
      :style="{ marginLeft: isCollapse ? '5%' : '10%' }"
      style="transition: all .5s;"
    >
      <el-header style="height:fit-content;">
        <!-- Header content -->
        <Header />
        <Tabs />
      </el-header>


      <el-main>
        <!-- Main content -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>

      </el-main>

    </el-container>
  </el-container>
</template>

<style scoped>

</style>
