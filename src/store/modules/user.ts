import { login, register } from '@/api/user'
import { defineStore } from 'pinia'
import { ElMessage, ElNotification } from 'element-plus'
import { debugWarn } from 'element-plus/es/utils'
import { getTimeStateStr } from '@/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
export const useUserStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'userState',
  // state: 返回对象的函数
  state: () => ({
    // 登录token
    token: null,
    // 登录用户信息
    userInfo: {},
    // 角色
    roles: localStorage.roles ? JSON.parse(localStorage.roles) : [],
    pv: 0,
  }),
  getters: {},
  // 可以同步 也可以异步
  actions: {
    // 登录
    login(userInfo) {
      const { username, password } = userInfo

      login(userInfo).then((res) => {
        console.log(res)
        if (res.data.status === 0) {
          return new Promise((resolve, reject) => {
            this.token = username
            this.userInfo = userInfo

            ElNotification({
              title: getTimeStateStr(),
              message: '欢迎来到 MaLab',
              type: 'success',
              duration: 3000,
            })
          })
        } else {
          // debugger
          ElMessage({
            message: res.data.message,
            type: 'error',
            duration: 3000,
          })
        }
      })
    },
    // 获取用户授权角色信息，实际应用中 可以通过token通过请求接口在这里获取用户信息
    getRoles() {
      return new Promise((resolve, reject) => {
        // 获取权限列表 默认就是超级管理员，因为没有进行接口请求 写死
        this.roles = ['admin']
        localStorage.roles = JSON.stringify(this.roles)
        resolve(this.roles)
      })
    },
    // 获取用户信息 ，如实际应用中 可以通过token通过请求接口在这里获取用户信息
    getInfo(roles) {
      return new Promise((resolve, reject) => {
        this.roles = roles
        resolve(roles)
      })
    },
    register(userInfo) {
      register(userInfo).then((res) => {
        console.log(res)
      })
    },
    // 退出
    logout() {
      return new Promise((resolve, reject) => {
        this.token = null
        this.userInfo = {}
        this.roles = []
        resolve(null)
      })
    },
    getPV() {
      return this.pv
    },
    setPV(pv) {
      this.pv = pv
    },
  },
  // 进行持久化存储
  persist: {
    // 本地存储的名称
    key: 'userState',
    //保存的位置
    storage: window.localStorage, //localstorage
  },
})
