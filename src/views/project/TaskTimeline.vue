<script setup lang="ts">
import type { Ref } from 'vue'
import type{ IRecord, ITask } from './type'
import { requestTaskRecord } from '@/api'
import { useTaskStore } from '@/store/task'
const taskInfo = inject<Ref<ITask>>('taskInfo')
const taskStore = useTaskStore()
const list = ref<{
  listLoading: boolean
  data: IRecord[]
  total: number
  totalPage: number
  pageSize: number
}>({
  listLoading: false,
  data: [],
  total: 0,
  totalPage: 0,
  pageSize: 0,
})
const listQuery = ref({
  user: undefined as number | undefined,
  type: 0,
  status: 'a',
  limit: 10,
  page: 1,
})

watch(
  () => taskInfo!.value.id,
  () => {
    getTaskRecord()
  })

async function getTaskRecord() {
  list.value.listLoading = true
  const res = await requestTaskRecord({
    user: listQuery.value.user === null ? undefined : listQuery.value.user,
    type: listQuery.value.type === 0 ? undefined : listQuery.value.type,
    status: listQuery.value.status === 'a' ? undefined : listQuery.value.status,
    page: listQuery.value.page,
    page_size: listQuery.value.limit,
    task: taskInfo!.value.id,
  })
  list.value.data = res.data.data.results
  list.value.listLoading = false
  list.value.total = res.data.data.count
  list.value.totalPage = Math.floor(list.value.total / listQuery.value.limit) + 1
  list.value.pageSize = listQuery.value.limit
}

function search() {
  listQuery.value.page = 1
  getTaskRecord()
}

function handleSizeChange(val: number) {
  listQuery.value.page = 1
  listQuery.value.limit = val
  getTaskRecord()
}

function handleCurrentChange(val: number) {
  listQuery.value.page = val
  getTaskRecord()
}
</script>

<template>
  <div>
    <el-card shadow="never" my-8>
      <div flex my-4>
        <Icon icon="carbon:search" />
        <span>筛选搜索</span>
        <el-button ml-auto type="primary" size="default" @click="search">
          查询结果
        </el-button>
      </div>
      <div my-2>
        <el-form :inline="true" :model="listQuery" size="default" label-width="140px">
          <el-form-item label="用户id">
            <el-input-number
              v-model="listQuery.user"
              style="width: 203px"
              placeholder="用户id"
              :min="1"
              controls-position="right"
              @keydown.enter="search"
            />
          </el-form-item>
          <el-form-item label="记录分类：">
            <el-select v-model="listQuery.type" placeholder="Select" style="width: 240px">
              <el-option
                v-for="(item) in taskStore.taskStep" :key="item.id" :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="记录状态：">
            <el-select v-model="listQuery.status" placeholder="Select" style="width: 240px">
              <el-option
                v-for="item in taskStore.recordStatus" :key="item.name" :label="item.name"
                :value="item.name"
              />
              <el-option key="a" label="ALL" value="a" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-timeline>
      <el-timeline-item
        v-for="r in list.data"
        :key="r.id"
        :timestamp="r.addTime" placement="top"
      >
        <el-card>
          <div flex items-center>
            <div mx-2>
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <p>
                {{ r.user }}
              </p>
            </div>
            <div>
              <el-tag
                :type="taskStore.taskStep[r.type].style"
                effect="plain"
                mx-1
              >
                {{ taskStore.taskStep[r.type].name }}
              </el-tag>
              <el-tag
                :type="taskStore.recordStatus[r.status].style"
                effect="dark"
                round
                mx-1
              >
                {{ taskStore.recordStatus[r.status].name }}
              </el-tag>
            </div>
            <div text-center flex-1 text-base>
              <p>{{ r.content }}</p>
            </div>
            <div ml-auto>
              <el-button style="min-width: 12rem;" text-base>
                {{ r.name }}
              </el-button>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-pagination
      v-model:current-page="listQuery.page" background layout="total, sizes,prev, pager, next,jumper"
      :page-size="listQuery.limit" :page-sizes="[5, 10, 15]" :total="list.total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>

</style>
