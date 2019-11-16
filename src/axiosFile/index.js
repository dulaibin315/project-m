import axios from 'axios'
import JSONBIGINT from 'json-bigint'
import store from '@/store'
import router from '@/router'

// 创建一个axios实例，如果对不同的服务器请求就不会有影响
const myAxios = axios.create({
  // 配置基准地址
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 配置最大安全数值
  transformResponse: [(res) => {
    try {
      return JSONBIGINT.parse(res)
    } catch (e) {
      return res
    }
  }]

})

// 请求拦截器
myAxios.interceptors.request.use((config) => {
  if (store.state.myToken) {
    config.headers.Authorization = `Bearer ${store.state.myToken.token}`
    return config
  }
  return config
}, err => Promise.reject(err))

// 响应拦截器
myAxios.interceptors.response.use(res => {
  try {
    return res.data.data
  } catch (e) {
    return res
  }
}, async err => {
  // token失效
  if (err.status === 401) {
    try {
      const msg = await axios({
        headers: {
          Authorization: `Bearer ${store.state.myToken.refresh_token}`
        },
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'put'
      })
      // 修改state中的token
      store.commit('setUser', {
        token: msg.token,
        refresh_token: msg.refresh_token
      })
      return msg
    } catch (e) {}
  }
  // token和refresh_token都失效
  if (!store.state.myToken && router.currentRoute.path !== '/login') {
    router.push({
      path: '/login',
      query: {
        backURL: router.currentRoute.path
      }
    })
    return false
  }
  return Promise.reject(err)
})

// 请求的方法

export default (url, method, data) => {
  return myAxios({
    url,
    method,
    [method === 'get' ? 'params' : 'data']: data
  })
}
