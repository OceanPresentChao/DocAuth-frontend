import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import NProgress from 'nprogress'
import { useAuthStore } from '@/store/auth'
// 创建axios实例
const service = axios.create({
  timeout: 15000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.getToken()
  if (token)
    config.headers.Authorization = token // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, (error) => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  (response) => {
    // code为非200是抛错 可结合自己业务进行修改
    const res = response.data || {}
    if (res.code !== 200) {
      // 401:未登录;
      if (res.code === 401) {
        ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).finally(() => {
          const router = useRouter()
          router.replace({ path: '/login' })
        })
      }
      else {
        ElMessage({
          message: res.message,
          type: 'error',
          duration: 3 * 1000,
        })
      }
      return Promise.reject(new Error(res.message))
    }
    else {
      return res
    }
  },
  (error) => {
    console.error(`err${error}`)// for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 3 * 1000,
    })
    return Promise.reject(error)
  },
)

// nprogress进度条
axios.interceptors.request.use(
  (config) => {
    NProgress.start() // 设置加载进度条(开始..)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
// axios响应拦截器
axios.interceptors.response.use(
  (response) => {
    NProgress.done() // 设置加载进度条(结束..)
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
