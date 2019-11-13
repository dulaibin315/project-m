<template>
  <div class="container">
    <!-- 头部 -->
    <van-nav-bar right-text="按钮" title="标题" van-icon />
    <!-- 中间部分 -->
    <router-view></router-view>
    <!-- 底部 -->
    <van-tabbar route v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang='less'></style>
