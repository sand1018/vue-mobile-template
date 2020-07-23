import axios from 'axios'


axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.timeout=5000;
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';


// let instance = axios.create({
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'token': localStorage.getItem('token')
//   },
//   baseURL: process.env.VUE_APP_BASE_API,
//   timeout: 10000,
//   // withCredentials: true
// })

function refreshToken() {
  // instance是当前request.js中已创建的axios实例 --   token接口获取token值
  return axios.post('5f19274f7913d6981f527784')
}


let requests = [] // 存储无token的请求队列
let isRefreshing = false //正在刷新token


// 从localStorage中获取token，token存的是object信息，有tokenExpireTime和token两个字段
function getToken() {
  let token = ''
  try {
    token = localStorage.getItem('token')
  } catch {
    console.error('get token from localStorage error')
  }
  return token
}


// 给实例添加一个setToken方法，用于登录后方便将最新token动态添加到header，同时将token保存在localStorage中
axios.setToken = (token) => {
  axios.defaults.headers['token'] = token
  window.localStorage.setItem('token', token) // 注意这里需要变成字符串后才能放到localStorage中
}

axios.interceptors.request.use((config) => {
  const token = getToken()
  // 添加请求头
  config.headers['token'] = token
  // 登录接口和刷新token接口绕过
  if (config.url.indexOf('5f19274f7913d6981f527784') >= 0 || config.url.indexOf('/login') >= 0) {
    return config
  }
  if (!token) {
    // 立即刷新token
    if (!isRefreshing) {
      console.log('刷新token ing')
      isRefreshing = true
      refreshToken().then(res => {
        console.log(123456)
        const {
          token
        } = res.data
        axios.setToken(token)
        console.log('刷新token成功，执行队列')
        requests.forEach(cb => cb(token))
        // 执行完成后，清空队列
        requests = []
        // return  instance(config)
      }).catch(res => {
        console.error('refresh token error: ', res)
      }).finally(() => {
        isRefreshing = false
      })
    }
    requests.push((token) => {
      // 因为config中的token是旧的，所以刷新token后要将新token传进来
      config.headers['token'] = token
      axios(config)
    })
  }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// 请求返回后拦截
axios.interceptors.response.use(response => {
  const {
    code
  } = response.data
  if (code === 401) {
    // token过期了，直接跳转到登录页 
    window.location.href = '/'
  }
  return response
}, error => {
  console.log('catch', error)
  return Promise.reject(error)
})

export default axios
