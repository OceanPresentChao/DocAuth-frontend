<script setup lang="ts">
import type { IProject } from './type'
import { useRenderIcon } from '@/utils/icon'
import { useAuthStore } from '@/store/auth'
import { requestCreateProject, requestProjectList } from '@/api'
import { useTaskStore } from '@/store/task'
const authStore = useAuthStore()
const taskStore = useTaskStore()
const { userInfo } = storeToRefs(authStore)
const queryText = ref('')
const sortType = ref('desc')
const projectList = ref<IProject[]>([])
const filterProjectList = computed<IProject[]>(() => {
  return projectList.value.filter((v) => {
    return v.name.includes(queryText.value)
  }).sort((a, b) => {
    if (sortType.value === 'desc')
      return a.id - b.id
    else
      return b.id - a.id
  })
})
const dialogVisible = ref(false)
const projectForm = ref({
  name: '',
  desc: '',
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

async function handleSubmit() {
  const res = await requestCreateProject({}, {
    name: projectForm.value.name,
    desc: projectForm.value.desc,
    user: userInfo.value.id,
  })
  if (res.data.code === 200) {
    console.log(res)
    dialogVisible.value = false
    ElMessage.success('创建成功')
    getProjectList()
  }
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
      <el-button type="success" @click="dialogVisible = true">
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
              {{ taskStore.taskStatus[p.status as 'r'].name }}
            </el-tag>
          </div>
          <div ml-auto mr-10 flex-none>
            <el-button v-if="p.status !== 'w'" type="primary" size="large">
              <router-link :to="`/project/view?projectId=${p.id}`" text-lg>
                查看
              </router-link>
            </el-button>
            <el-button v-else type="primary" size="large">
              <router-link :to="`/project/create?projectId=${p.id}`" text-lg>
                分配
              </router-link>
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <!-- 项目基本信息对话框 -->
      <el-dialog v-model="dialogVisible" title="项目基本信息" width="40%" style="text-align: center;" >
        <el-form>
          <el-form-item label="项目名">
            <el-input v-model="projectForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="项目概述">
            <el-input v-model="projectForm.desc" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">
              取 消
            </el-button>
            <el-button type="success" @click="handleSubmit()">
              确 定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>

</style>
