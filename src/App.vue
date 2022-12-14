<script setup>
import Layout from '@/components/layout/index.vue'
const route = useRoute()
</script>

<template>
  <Account v-if="route.name === 'login'" />
  <Error404 v-else-if="route.name === '404'" />
  <Layout v-else />
</template>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
