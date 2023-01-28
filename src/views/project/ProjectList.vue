<script setup lang="ts">
import { ComputedRef, Ref } from 'vue'
import type { IProject } from './type'
import { useRenderIcon } from '@/utils/icon'
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
const queryText = ref('')
const sortType = ref('desc')
const projectList = ref<IProject[]>([{
  name: '项目1',
  id: 1,
  desc: '项目1描述',
  addTime: '2021-01-01',
  status: '进行中',
}])
const filterProjectList = computed<IProject[]>(() => {
  return projectList.value.sort((a, b) => {
    if (sortType.value === 'desc')
      return a.id - b.id
    else
      return b.id - a.id
  })
})

function getProjectList(params: {
  id: number
}) {

}

function handleCreate() {

}
</script>

<template>
  <div>
    <div flex mx-10 gap-3>
      <el-input v-model="queryText" placeholder="查找您的项目..." size="default" clearable>
        <template #prepend>
          <el-button :icon="useRenderIcon('carbon:search')" />
        </template>
      </el-input>
      <el-select v-model="sortType" placeholder="排序">
        <el-option label="降序" value="desc" />
        <el-option label="升序" value="asc" />
      </el-select>
      <el-button type="success" size="default" @click="handleCreate">
        创建项目
      </el-button>
    </div>
    <div>
      <div v-for="(p, idx) in filterProjectList" :key="p.id">
        <el-divider>
          <Icon v-if="idx !== 0" icon="carbon:star" />
        </el-divider>
        <div flex items-center my-3>
          <div flex-1 text-left pl-10>
            <p text-xl>
              <router-link to="/">
                {{ p.name }}
              </router-link>
            </p>
            <p text-base>
              {{ p.desc }}
            </p>
            <span>
              创建时间: {{ p.addTime }}
            </span>
            <el-tag
              type="success"
              mx-1
              effect="dark"
              round
            >
              {{ p.status }}
            </el-tag>
          </div>
          <div ml-auto mr-10 flex-none>
            <el-button type="primary" size="large">
              <router-link to="/" text-lg>
                查看
              </router-link>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
