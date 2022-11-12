<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index)  in levelList" :key="item.path" v-show="item.meta.title">
                <span v-if="item.redirect === 'noredirect' || index == levelList.length - 1" class="no-redirect">{{
                        item.meta.title
                }}</span>
                <router-link v-else :to="item.redirect || item.path">{{ item.meta.title }}</router-link>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router';

const route = useRoute()
let levelList = ref<any>(null)
watch(route, () => {
    getBreadcrumb()
}, { immediate: true })
getBreadcrumb()
function getBreadcrumb() {
    let matched: RouteLocationMatched[] = route.matched.filter(item => item.meta.title)
    const first = matched[0]
    let breadmatched: any[] = matched;
    if (first && (first.path !== '/' && first.path !== '/dashboard')) {
        breadmatched.unshift({ path: '/', meta: { title: '首页' } })
    }
    levelList.value = breadmatched
}


</script>

<style scoped>
.app-breadcrumb,
.el-breadcrumb {
    display: inline-block;
    height: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.25rem;
    margin: auto 0;
    margin-left: 1rem;
}


.app-breadcrumb .no-redirect,
.el-breadcrumb .no-redirect {
    color: #97a8be;
    cursor: text;
}
</style>