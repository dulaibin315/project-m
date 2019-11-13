import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Home = () => import('@/views/home')
const Search = () => import('@/views/search')
const User = () => import('@/views/user')
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
  }]
}
]

const router = new VueRouter({
  routes
})

export default router
