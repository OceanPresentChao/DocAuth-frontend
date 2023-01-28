<script setup lang="ts">
import type { ITask } from './type'
import { requestTaskDetail } from '@/api'
import { useRenderIcon } from '@/utils/icon'
import { useTaskStore } from '@/store/task'

const taskInfo = ref<ITask>({
  id: 1,
  phase: 1,
  project: '',
  name: '',
  desc: '',
  status: 's',
  step: 1,
  members: [],
  addTime: '',
  startTime: '',
  deadLine: '',
})
const taskStore = useTaskStore()
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
getTaskInfo(route.params.id as string)

provide('taskInfo', taskInfo)

async function getTaskInfo(id: string) {
  const res = await requestTaskDetail({ id })
  const task = res.data.data
  taskInfo.value = task
}
</script>

<template>
  <div>
    <el-descriptions
      :title="`任务${taskInfo.name}详情`"
      direction="vertical"
      :column="4"
      size="large"
      border
    >
      <el-descriptions-item label="Id" :span="1">
        {{ taskInfo.id }}
      </el-descriptions-item>
      <el-descriptions-item label="Name" :span="2">
        {{ taskInfo.name }}
      </el-descriptions-item>
      <el-descriptions-item label="Project" :span="1">
        {{ taskInfo.project }}
      </el-descriptions-item>
      <el-descriptions-item label="Members" :span="4">
        <div flex justify-around>
          <div
            v-for="v in taskInfo.members"
            :key="v.id"
            text-center
          >
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <p>
              {{ v.username }}
            </p>
            <el-tag
              :type="taskStore.taskStep[v.duty].style"
              effect="dark"
              round
            >
              {{ taskStore.taskStep[v.duty].name }}
            </el-tag>
          </div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label="Description" :span="4">
        {{ taskInfo.desc }}
      </el-descriptions-item>
      <el-descriptions-item label="Step" :span="1">
        <el-tag
          size="small"
          :type="taskStore.taskStep[taskInfo.step].style"
        >
          {{ taskStore.taskStep[taskInfo.step].name }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Status" :span="1">
        <el-tag
          size="small"
          :type="taskStore.taskStatus[taskInfo.status].style"
        >
          {{ taskStore.taskStatus[taskInfo.status].name }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Start Time" :span="1">
        {{ taskInfo.startTime }}
      </el-descriptions-item>
      <el-descriptions-item label="Deadline" :span="1">
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
