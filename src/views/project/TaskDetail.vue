<script setup lang="ts">
import { Fragment } from 'vue'
import { useRenderIcon } from '@/utils/icon'
const taskInfo = ref({
  name: 'task1',
  desc: 'desc11111',
  status: '进行中',
  step: 1,
  startTime: '2002-3-9',
  deadLine: '2008-8-9',
  project: '项目1',
})

const recordInfo = {
  name: 'record1',
  desc: 'desc11111',
  status: '进行中',
  step: 2,
  startTime: '2002-3-9',
  deadLine: '2008-8-9',
  project: '项目1',
}

const route = useRoute()

const steps = computed(() => {
  return [
    {
      title: '编辑',
      icon: useRenderIcon('carbon:edit'),
      link: `/task/${route.params.id}/edit`,
    },
    {
      title: '审阅',
      icon: useRenderIcon('carbon:view'),
      link: `/task/${route.params.id}/review`,
    },
    {
      title: '批阅',
      icon: useRenderIcon('carbon:checkbox-checked'),
      link: `/task/${route.params.id}/judge`,
    },
    {
      title: '汇签',
      icon: useRenderIcon('carbon:task-complete'),
      link: `/task/${route.params.id}/compile`,
    },
  ]
})

watch(route, (val) => {
  taskInfo.value.name = `task${val.params.id}`
}, { immediate: true })
</script>

<template>
  <div>
    <el-descriptions
      :title="`${taskInfo.name}任务详情`"
      direction="vertical"
      :column="4"
      size="large"
      border
    >
      <el-descriptions-item label="Name" :span="3">
        {{ taskInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item label="Status">
        <el-tag size="small">
          {{ taskInfo.status }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Description" :span="4">
        {{ taskInfo.desc }}
      </el-descriptions-item>
      <el-descriptions-item label="Start Time" :span="2">
        {{ taskInfo.startTime }}
      </el-descriptions-item>
      <el-descriptions-item label="Deadline" :span="2">
        {{ taskInfo.deadLine }}
      </el-descriptions-item>
    </el-descriptions>
    <el-row :gutter="24" justify="center" my-8>
      <el-col :span="20">
        <el-steps :active="taskInfo.step" finish-status="success" align-center process-status="finish">
          <el-step v-for="v in steps" :key="v.title" :icon="v.icon">
            <template #title>
              <router-link :to="v.link">
                {{ v.title }}
              </router-link>
            </template>
          </el-step>
        </el-steps>
      </el-col>
      <el-col :span="4">
        <router-link to="/task/6/timeline">
          <el-button type="primary" icon="el-icon-arrow-right" size="large">
            TimeLine
          </el-button>
        </router-link>
      </el-col>
    </el-row>
    <router-view />
  </div>
</template>

<style scoped>

</style>
