<template>
  <div class="login-title">
    <img class="icon" src="@/assets/image/logo.png" alt="logo" />
    <h2 class="title">MaLab</h2>
  </div>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <el-form-item label="" prop="username">
      <el-input
        placeholder="请输入用户名"
        autoComplete="on"
        style="position: relative"
        v-model="ruleForm.username"
        @keyup.enter.native="submitForm(ruleFormRef)"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="" prop="password">
      <el-input
        placeholder="请输入密码"
        autoComplete="on"
        @keyup.enter.native="submitForm(ruleFormRef)"
        v-model="ruleForm.password"
        :type="passwordType"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><GoodsFilled /></el-icon>
        </template>
        <template #suffix>
          <div class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item style="width: 100%" class="btn-container">
      <div class="btn-container">
        <el-button
          :loading="loginloading"
          class="login-btn"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button
          :loading="registerloading"
          class="login-btn"
          type="primary"
          @click="registerForm(ruleFormRef)"
          >注册</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { ElNotification } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/modules/user'
  import { getTimeStateStr } from '@/utils/index'

  const router = useRouter()
  const UserStore = useUserStore()
  const ruleFormRef = ref<FormInstance>()
  const passwordType = ref('password')
  const loginloading = ref(false)
  const registerloading = ref(false)

  const rules = reactive({
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  })

  // 表单数据
  const ruleForm = reactive({
    username: '',
    password: '',
  })

  // 显示密码图标
  const showPwd = () => {
    passwordType.value = passwordType.value === 'password' ? '' : 'password'
  }

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        loginloading.value = true
        // 登录
        setTimeout(async () => {
          await UserStore.login(ruleForm)
          await router.push({
            path: '/',
          })

          loginloading.value = false
        }, 2000)
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
  const registerForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        registerloading.value = true
        // 登录
        // UserStore.login(ruleForm)
        setTimeout(async () => {
          await UserStore.register(ruleForm)
          router.push({
            path: '/',
          })
          // ElNotification({
          //   title: getTimeStateStr(),
          //   message: '欢迎来到 MaLab',
          //   type: 'success',
          //   duration: 3000,
          // })
          registerloading.value = false
        }, 1000)
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
</script>

<style lang="scss" scoped>
  @import '../index.scss';
</style>
