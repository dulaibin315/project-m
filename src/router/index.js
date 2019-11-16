import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {
  getUser
} from '@/untils/getData.js'

Vue.use(VueRouter)
const Home = () => import('@/views/home')
const Search = () => import('@/views/search')
const User = () => import('@/views/user')
const Login = () => import('@/views/user/login.vue')
const Question = () => import('@/views/question')
const LayOut = () => import('@/views/Layout')
const Video = () => import('@/views/video')
const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  component: LayOut,
  children: [{
    path: '/home',
    component: Home
  }, {
    path: '/question',
    component: Question
  }, {
    path: '/search',
    component: Search
  }, {
    path: '/user',
    component: User
  }, {
    path: '/video',
    component: Video
  }, {
    path: '/login',
    component: Login
  }]
}
]

const router = new VueRouter({
  routes
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断vuex中的token不存在且跳转路径是‘/user’开头的
  if (!getUser() && to.path.startsWith('/user')) {
    store.commit('setUser', {})
    return next({
      // 拦截至'/login'页面
      path: '/login',
      // 跳转的时候携带着回跳的路径
      query: {
        backURL: to.path
      }
    })
  }
  next()
})
export default router
