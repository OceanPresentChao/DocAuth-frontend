<script setup>
</script>

<template>
  <el-container>
    <el-aside>
      <!-- Aside content -->
      <MenuBar />
    </el-aside>
    <el-container>
      <el-header>
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
