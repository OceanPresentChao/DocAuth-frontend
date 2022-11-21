<script setup>
import { ElMessage } from 'element-plus'
import { avatar, bg, currentWeek } from './assets'
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
const { currentPage } = storeToRefs(authStore)
</script>

<template>
  <div>
    <img :src="bg">
    <div>
      <div>
        <component :is="currentWeek" />
      </div>
      <div>
        <div>
          <avatar />
          <h2>Auth Doc</h2>
          <Login v-show="currentPage === 'login'" />
          <Forget v-show="currentPage === 'forget'" />
          <Register v-show="currentPage === 'register'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
