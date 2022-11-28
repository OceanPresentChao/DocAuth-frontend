<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
</script>

<template>
  <div>
    {{ userInfo }}
  </div>
</template>

<style scoped>
</style>
