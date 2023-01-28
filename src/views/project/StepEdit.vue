<script setup lang="ts">
import type { Quill } from '@vueup/vue-quill'
import { QuillEditor } from '@vueup/vue-quill'
import type { ITask } from './type'
import { useAuthStore } from '@/store/auth'
import { requestSubmitStep, requestUserDuty } from '@/api'
const quill = ref<Quill>()
const editorRef = ref<typeof QuillEditor>()
const editorContent = ref('')
const authStore = useAuthStore()
const route = useRoute()
const stepContext = ref<{
  user: Record<string, any>
  task: number
  duty: number
}>({
  user: {},
  task: -1,
  duty: -1,
})
const taskInfo = inject<ITask>('taskInfo')

getUserDuty()

function handleReady(q: Quill) {
  quill.value = q
}

async function getUserDuty() {
  const userid = authStore.userInfo.id
  const taskid = Number(route.params.id)
  const res = await requestUserDuty({ user: userid, task: taskid })
  Object.assign(stepContext.value, res.data.data.results[0])
}

function submitStep() {
  ElMessageBox.confirm('确认提交吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      const res = await requestSubmitStep({
        task: stepContext.value.task,
      }, {
        user: stepContext.value.user.id,
        content: editorContent.value,
      })
      ElMessage({
        type: 'success',
        message: '提交成功',
      })
      window.location.reload()
    }
    catch (error) {

    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '已取消提交',
    })
  })
}
</script>

<template>
  <div>
    <div v-if="stepContext.duty === taskInfo?.step">
      <QuillEditor
        ref="editorRef"
        v-model:content="editorContent"
        theme="snow"
        content-type="html"
        placeholder="请输入内容..."
        @ready="handleReady"
      />
      <div>
        <div ml-auto mr-10 my-5 style="width: fit-content;">
          <el-button v-if="stepContext.duty > 1" type="danger" size="large" mx-2 text-lg>
            打回
          </el-button>
          <el-button type="primary" size="large" mx-2 text-lg @click="submitStep">
            提交
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
