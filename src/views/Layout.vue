<template>
  <div class="container">
    <!-- 头部 -->
    <van-nav-bar fixed right-text="按钮" title="标题" van-icon />
    <!-- 中间部分 -->
    <div class="my_wrapper">
      <router-view></router-view>
    </div>
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

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center
  justify-content: space-between;
  position: relative;
  .my_wrapper {
    flex: 1;
    // height: 575px;
    width: 100%;
    // height: 100%;
    // position: relative;
    // top: 40px;
    // bottom: 40px;
    position: static;
    overflow: auto;
    // padding-top: 46px;
    // padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0;
    }
  }
}

.van-tabbar--fixed {
  position: relative;
}
.van-nav-bar {
  height: 40px;
  // flex: 1;
}
.van-tabbar {
  height: 40px;
  // flex: 1;
  position: static;
}
.van-nav-bar--fixed {
  position: static;
}
</style>
