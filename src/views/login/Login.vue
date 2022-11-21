<script setup>
import { ElMessage } from 'element-plus'
import { useRenderIcon } from '@/utils/icon'
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
const ruleForm = reactive({
  username: '',
  password: '',
})
const ruleFormRef = ref()

async function onLogin() {

}
</script>

<template>
  <div>
    <h1>登录</h1>
    <el-form
      ref="ruleFormRef" :model="ruleForm" size="large"
      @keyup.enter="onLogin(ruleFormRef)"
    >
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username" clearable :input-style="{ 'user-select': 'none' }"
          placeholder="账号" :prefix-icon="useRenderIcon('carbon:user')"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password" clearable :input-style="{ 'user-select': 'none' }"
          show-password placeholder="密码" :prefix-icon="useRenderIcon('carbon:locked')"
        />
      </el-form-item>

      <el-form-item>
        <div>
          <el-checkbox>
            记住密码
          </el-checkbox>
          <el-button text @click="authStore.setCurrentPage('forget')">
            忘记密码?
          </el-button>
          <el-button text @click="authStore.setCurrentPage('register')">
            注册
          </el-button>
        </div>
        <el-button
          size="default" type="primary"
          @click="onLogin()"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
