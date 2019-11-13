import axios from 'axios'
import JSONBIGINT from 'json-bigint'
import store from '@/store'

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
}, err => Promise.reject(err))

// 请求的方法

export default (url, method, data) => {
  myAxios({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
