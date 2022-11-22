<script setup>
import * as validator from './rule'
import { useRenderIcon } from '@/utils/icon'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()

const ruleFormRef = ref()

const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  username: [{ validator: validator.validateUsername, trigger: 'blur' }],
  password: [{ trigger: 'blur' }],
})

function submitForm(formEl) {
  if (!formEl)
    return
  formEl.validate((valid) => {
    if (valid) {
      ElMessage({
        type: 'success',
        message: '登录成功',
      })
    }
    return valid
  })
}
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      status-icon
      :rules="rules" :model="ruleForm" size="large"
      @keyup.enter="submitForm(ruleFormRef)"
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
        <div flex justify-evenly m-auto>
          <div>
            <el-checkbox>
              记住密码
            </el-checkbox>
            <el-button text @click="authStore.setCurrentPage('forget')">
              忘记密码?
            </el-button>
          </div>
          <div>
            <el-button text @click="authStore.setCurrentPage('register')">
              注册
            </el-button>
            <el-button
              size="default" type="primary"
              @click="submitForm(ruleFormRef)"
            >
              登录
            </el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
