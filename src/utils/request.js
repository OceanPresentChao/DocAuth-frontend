import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import NProgress from 'nprogress'
import { useAuthStore } from '@/store/auth'
import { router } from '@/router'
// 创建axios实例
const service = axios.create({
  timeout: 15000, // 请求超时时间
})

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
  // 处理被取消的请求
  if (axios.isCancel(error))
    return console.error(`请求的重复请求：${error.message}`)
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302: message = '接口重定向了！'; break
      case 400: message = '参数不正确！'; break
      case 403: {
        message = '您未登录，或者登录已经超时，请先登录！'
        ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).finally(() => {
          router.replace({ path: '/login' })
        })
        break
      }
      case 404:{
        message = `请求地址出错: ${error.response.config.url}`
        router.replace({ path: '/404' })
        break // 在正确域名下
      }
      case 408: message = '请求超时！'; break
      case 409: message = '系统已存在相同数据！'; break
      case 500: message = '服务器内部错误！'; break
      case 501: message = '服务未实现！'; break
      case 502: message = '网关错误！'; break
      case 503: message = '服务不可用！'; break
      case 504: message = '服务暂时无法访问，请稍后再试！'; break
      case 505: message = 'HTTP版本不受支持！'; break
      default: message = '异常问题，请联系管理员！'; break
    }
    if (error.message.includes('timeout'))
      message = '网络请求超时！'
    if (error.message.includes('Network'))
      message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  }

  ElMessage({
    type: 'error',
    message,
  })
}

// request拦截器
service.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.getToken()
  if (token)
    config.headers.Authorization = `Bearer ${token.access}` // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, (error) => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  res => res,
  (error) => {
    httpErrorStatusHandle(error) // 处理错误状态码
    return Promise.reject(error) // 错误继续返回给到具体页面
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
