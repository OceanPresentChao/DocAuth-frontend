<script setup lang='ts'>
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
const router = useRouter()

function handleCommand(command: string) {
  if (command === 'logout')
    logOut()
  else if (command === 'setting')
    gotoUserDetail()
}
// 退出登录
async function logOut() {
  ElMessageBox.confirm(
    '你确定要退出登录吗？',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '退出成功！',
      })
      authStore.logOut()
    })
}

function gotoUserDetail() {
  router.push({
    path: '/user',
  })
}
</script>

<template>
  <div class="header-right">
    <el-dropdown @command="handleCommand">
      <el-avatar shape="circle" size="large" fit="cover" :src="userInfo.avatar" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="setting">
            设置
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.header-right {
    display: flex;
}

.userimg {
    height: 42px;
    width: 42px;
    border-radius: 50%;
}
</style>
