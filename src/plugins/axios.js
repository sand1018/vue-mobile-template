import axios from 'axios'

const instance = axios.create({
  headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'token': localStorage.getItem('token') 
  },
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  // withCredentials: true
})



let requests = [] // 存储无token的请求队列
let isRefreshing = false //正在刷新token


// 从localStorage中获取token，token存的是object信息，有tokenExpireTime和token两个字段
function getToken () {
  let token = ''
  try {
    token = localStorage.getItem('token')
  } catch {
    console.error('get token from localStorage error')
  }
  return token
}

function refreshToken () {
    // instance是当前request.js中已创建的axios实例 --   token接口获取token值
    return instance.post('/login_h5_pub').then(res => res.data)
}

// 给实例添加一个setToken方法，用于登录后方便将最新token动态添加到header，同时将token保存在localStorage中
instance.setToken = (token) => {
  instance.defaults.headers['token'] = token
  window.localStorage.setItem('token', token) // 注意这里需要变成字符串后才能放到localStorage中
}

instance.interceptors.request.use((config) => {
  const token = getToken()
  // 添加请求头
  config.headers['token'] = token
  // 登录接口和刷新token接口绕过
  if (config.url.indexOf('/login_h5_pub') >= 0 || config.url.indexOf('/login') >= 0) {
    return config
  }
  if (!token) {
      // 立即刷新token
      if (!isRefreshing) {
        console.log('刷新token ing')
        isRefreshing = true
        refreshToken().then(res => {
          const { token } = res.data
          instance.setToken( token)
          isRefreshing = false
          return token
        }).then((token) => {
          console.log('刷新token成功，执行队列')
          requests.forEach(cb => cb(token))
          // 执行完成后，清空队列
          requests = []
        }).catch(res => {
          console.error('refresh token error: ', res)
        })
      }
      const retryOriginalRequest = new Promise((resolve) => {
        requests.push((token) => {
          // 因为config中的token是旧的，所以刷新token后要将新token传进来
          config.headers['token'] = token
          resolve(config)
        })
      })
      return retryOriginalRequest
    
  }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// 请求返回后拦截
instance.interceptors.response.use(response => {
  const { code } = response.data
  if (code === 1234) {
    // token过期了，直接跳转到登录页 
    window.location.href = '/'
  }
  return response
}, error => {
  console.log('catch', error)
  return Promise.reject(error)
})

export default instance