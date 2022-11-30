<script setup>
import * as validator from './rule'
import { useRenderIcon } from '@/utils/icon'
import { useAuthStore } from '@/store/auth'
import { requestModifyUser } from '@/api/user'
const authStore = useAuthStore()
const ruleFormRef = ref()
const ruleForm = ref({
  username: '',
  phone: '',
  password: '',
  repassword: '',
})

const rules = reactive({
  username: [{ validator: validator.validateUsername, trigger: 'blur' }],
  password: [{ validator: validator.validatePassword, trigger: 'blur' }],
  repassword: [{ validator: validateRePassword, trigger: 'blur' }],
  phone: [{ validator: validator.validatePhone, trigger: 'blur' }],
})

function validateRePassword(rule, value, callback) {
  if (value === '')
    callback(new Error('请重复密码'))

  else if (value !== ruleForm.value.password)
    callback(new Error('两次输入的密码不一致'))

  else
    callback()
}

function submitForm(formEl) {
  if (!formEl)
    return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const data = await requestModifyUser(ruleForm.value)
        ElMessage({
          type: 'success',
          message: '修改密码成功',
        })
        authStore.setCurrentPage('login')
        ruleForm.value = {
          username: '',
          password: '',
          repassword: '',
          phone: '',
        }
      }
      catch (error) {

      }
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

      <el-form-item prop="phone">
        <el-input
          v-model="ruleForm.username" clearable :input-style="{ 'user-select': 'none' }"
          placeholder="电话" :prefix-icon="useRenderIcon('carbon:user')"
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
          v-model="ruleForm.password" clearable :input-style="{ 'user-select': 'none' }"
          show-password placeholder="重复密码" :prefix-icon="useRenderIcon('carbon:locked')"
        />
      </el-form-item>

      <el-form-item>
        <div flex justify-evenly m-auto>
          <div>
            <el-button text @click="authStore.setCurrentPage('login')">
              已有账号？登录
            </el-button>
            <el-button text @click="authStore.setCurrentPage('register')">
              注册
            </el-button>
          </div>
          <el-button
            size="default" type="primary"
            @click="submitForm(ruleFormRef)"
          >
            提交
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
