<script setup>
import { ElMessage } from 'element-plus'
import { useRenderIcon } from '@/utils/icon'
import { useAuthStore } from '@/store/auth'
const authStore = useAuthStore()
const ruleForm = reactive({
  username: '',
  password: '',
  repassword: '',
  phone: '',
})
const ruleFormRef = ref()

async function onRegister() {

}
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef" :model="ruleForm" size="large"
      @keyup.enter="onRegister(ruleFormRef)"
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

      <el-form-item prop="repassword">
        <el-input
          v-model="ruleForm.repassword" clearable :input-style="{ 'user-select': 'none' }"
          show-password placeholder="重复密码" :prefix-icon="useRenderIcon('carbon:locked')"
        />
      </el-form-item>

      <el-form-item prop="phone">
        <el-input
          v-model="ruleForm.phone" clearable :input-style="{ 'user-select': 'none' }"
          show-password placeholder="电话" :prefix-icon="useRenderIcon('carbon:locked')"
        />
      </el-form-item>

      <el-form-item>
        <div flex justify-evenly m-auto>
          <el-button text @click="authStore.setCurrentPage('login')">
            已有账号？登录
          </el-button>
          <el-button
            size="default" type="primary"
            @click="onRegister()"
          >
            注册
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
