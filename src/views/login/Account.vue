<script setup>
import { ElMessage } from 'element-plus'
import { bg, currentWeek, logo } from './assets'
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
const { currentPage } = storeToRefs(authStore)
</script>

<template>
  <div relative overflow-hidden w-screen h-screen flex items-center>
    <img :src="bg" absolute invisible lg:visible>
    <component :is="currentWeek" absolute invisible lg:left-50 lg:visible />
    <div max-w-7xl m-auto lg:w-sm lg:m-r-20>
      <div text-center>
        <logo />
      </div>
      <h2 text-center>
        Auth Doc
      </h2>
      <div my-4>
        <Login v-show="currentPage === 'login'" />
        <Forget v-show="currentPage === 'forget'" />
        <Register v-show="currentPage === 'register'" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
