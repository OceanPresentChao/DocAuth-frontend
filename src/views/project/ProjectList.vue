<script setup lang="ts">
import type { IProject } from './type'
import { useRenderIcon } from '@/utils/icon'
import { useAuthStore } from '@/store/auth'
import { requestProjectList } from '@/api'
import { useTaskStore } from '@/store/task'
const authStore = useAuthStore()
const taskStore = useTaskStore()
const { userInfo } = storeToRefs(authStore)
const queryText = ref('')
const sortType = ref('desc')
const projectList = ref<IProject[]>([])
const filterProjectList = computed<IProject[]>(() => {
  return projectList.value.sort((a, b) => {
    if (sortType.value === 'desc')
      return a.id - b.id
    else
      return b.id - a.id
  })
})

getProjectList()

async function getProjectList() {
  const res = await requestProjectList({ userId: userInfo.value.id })
  const list = res.data.data.map((v: any) => {
    return {
      name: v.project__name,
      id: v.project__id,
      desc: v.project__desc,
      addTime: v.project__addTime,
      status: v.project__status,
    }
  })
  projectList.value = list
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
      <router-link to="/project/create">
        <el-button type="success">
          创建项目
        </el-button>
      </router-link>
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
              {{ taskStore.taskStatus[p.status as 'r'].name }}
            </el-tag>
          </div>
          <div ml-auto mr-10 flex-none>
            <el-button type="primary" size="large">
              <router-link :to="`/project/view?projectId=${p.id}`" text-lg>
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
