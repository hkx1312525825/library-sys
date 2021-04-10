import { Spin, Message } from 'view-design'
import axios from 'axios'
import { baseURL } from '@/config'
import store from '@/store'
// import router from '@/router'

// timeout、loading、hideError
class HttpRequest {
  constructor () {
    this.queue = []
    this.cancelToken = []
    this.responseStatus = ''
  }

  getInsideConfig (options) {
    const config = {
      baseURL, // : localStorage.baseURL || baseURL,
      timeout: options.timeout || 15000,
      headers: {
        'X-Requested-With': XMLHttpRequest
      }
    }
    console.log(store.state.token)
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    return Object.assign(config, options)
  }

  destroy (url) {
    this.queue.splice(
      this.queue.findIndex(item => item === url),
      1
    )
    this.cancelToken.splice(
      this.cancelToken.findIndex(item => item.url === url),
      1
    )
    if (!this.queue.length) {
      setTimeout(() => {
        Spin.hide()
      }, 200)
    }
  }

  interceptors (instance, { url, loading = true, hideError = false }) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (loading && !this.queue.length) {
          Spin.show()
        }
        loading && this.queue.push(url)
        const source = axios.CancelToken.source()
        this.cancelToken.push({
          url,
          cancel: source.cancel
        })
        config.cancelToken = source.token
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      ({ data, status, headers }) => {
        this.destroy(url)
        // 请求成功处理（包括后台异常）
        if (status === 200 || status === 201) {
          // if (url === 'users?action=login' || url === 'managers?action=login') {
          return data
          // }
        } else {
          return Promise.reject(data.detail || '数据异常，请联系管理员')
        }
      },
      error => {
        this.destroy(url)
        // if (this.responseStatus === 401) return
        // 请求出错处理
        let message = error.response.data.detail
        if (error.status !== 200 || error.status !== 201) {
          // if (error.response.status === 401) {
          //   // 退出登录
          //   if (url !== '/login' && url !== '/current-user') {
          //     store.commit('setCurrentUser', null)
          //     store.commit('setAuthorization', '')
          //     this.responseStatus = 401
          //     this.cancelToken.forEach(item => item.cancel())
          //     setTimeout(() => {
          //       router.replace({
          //         name: 'Login'
          //       })
          //       this.responseStatus = ''
          //     }, 200)
          //   }
          // }
          message = error.response.data.detail
        } else {
          message = message || '请求超时，请检查网络连接'
        }
        message = message || '数据异常，请联系管理员'
        console.log(message)
        // message = message === 'Bad credentials' ? '用户名或密码错误' : message
        hideError || Message.error(message)
        return Promise.reject(message)
      }
    )
  }

  request (options) {
    const instance = axios.create()
    options = this.getInsideConfig(options)
    this.interceptors(instance, options)
    return instance(options)
  }

  all (requests) {
    return axios.all(requests)
  }

  spread (callback) {
    return axios.spread(callback)
  }

  cancel (url) {
    const cancelToken = this.cancelToken.find(item => item.url === url)
    cancelToken && cancelToken.cancel()
  }
}

export default new HttpRequest()
