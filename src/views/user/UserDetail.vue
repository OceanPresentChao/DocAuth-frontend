<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { UserFilled } from '@element-plus/icons-vue'
import { useAuthStore } from '@/store/auth'
import { requestModifyUser } from '@/api'
import * as validator from '@/views/login/rule'
import { useRenderIcon } from '@/utils/icon'
const authStore = useAuthStore()
const { userInfo } = storeToRefs(authStore)
const ruleFormRef = ref<FormInstance>()

const ruleForm = ref(Object.assign({ password: '', hasPassword: false }, userInfo.value))
const rules = reactive({
  username: [{ validator: validator.validateUsername, trigger: 'blur' }],
  password: [{ validator: validator.validatePassword, trigger: 'blur' }],
  phone: [{ validator: validator.validatePhone, trigger: 'blur' }],
})

function submitForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      try {
        const data = await requestModifyUser(ruleForm.value)
        ElMessage({
          type: 'success',
          message: '注册成功',
        })
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
    <el-avatar :size="100" fit="cover" :src="userInfo.avatar" />
    <el-form
      ref="ruleFormRef"
      style="margin:3rem 10%;"
      status-icon
      label-width="120px"
      :rules="rules" :model="ruleForm" size="large"
      @keyup.enter="submitForm(ruleFormRef)"
    >
      <el-form-item prop="name" label="昵称">
        <el-input
          v-model="ruleForm.name" disabled
          placeholder="昵称" :prefix-icon="useRenderIcon('carbon:user')"
        />
      </el-form-item>
      <el-form-item prop="username" label="用户名">
        <el-input
          v-model="ruleForm.username" clearable :input-style="{ 'user-select': 'none' }"
          placeholder="用户名" :prefix-icon="useRenderIcon('carbon:user')"
        />
      </el-form-item>
      <el-form-item label="修改密码" prop="hasPassword">
        <el-switch v-model="ruleForm.hasPassword" />
      </el-form-item>
      <el-form-item v-if="ruleForm.hasPassword" prop="password" label="密码">
        <el-input
          v-model="ruleForm.password"
          type="password" clearable :input-style="{ 'user-select': 'none' }"
          show-password placeholder="密码" :prefix-icon="useRenderIcon('carbon:locked')"
        />
      </el-form-item>

      <el-form-item prop="phone" label="电话">
        <el-input
          v-model="ruleForm.phone" clearable :input-style="{ 'user-select': 'none' }"
          placeholder="电话" :prefix-icon="useRenderIcon('carbon:phone')"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" m-auto size="large" @click="submitForm(ruleFormRef)">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>
