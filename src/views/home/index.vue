<template>
  <div class="container">
    <!-- 头部频道部分 -->
    <van-tabs swipeable v-model="channelINdex">
      <van-tab :key="item1.id" :title="item1.name" v-for="item1 in list">
        <div class="scroll_wrapper">
          <!-- 内容列表部分 -->
          <van-pull-refresh
            :success-text="refreshText"
            @refresh="myRefresh"
            v-model="item1.refrashStatus"
          >
            <van-list
              :finished="item1.finished"
              :finished-text="finishedText"
              @load="onLoad"
              v-model="item1.upLoading"
            >
              <van-cell-group>
                <van-cell :key="item.id" v-for="item in item1.articles">
                  <div class="article_item">
                    <h3 class="van-ellipsis">{{item.title}}</h3>
                    <!-- <div class="img_box" v-if="item.cover.type === 3">
                      <van-image :src="item.cover.images[0]" class="w33" fit="cover" />
                      <van-image :src="item.cover.images[1]" class="w33" fit="cover" />
                      <van-image :src="item.cover.images[2]" class="w33" fit="cover" />
                    </div>-->
                    <!-- <div class="img_box" v-if="item.cover.type === 1">
                      <van-image :src="item.cover.images[0]" class="w100" fit="cover" />
                    </div>-->
                    <div class="info_box">
                      <span>{{item.aut_name}}</span>
                      <span>{{item.comm_count}} 评论</span>
                      <span>{{item.pubdate}}</span>
                      <span class="close">
                        <van-icon name="cross"></van-icon>
                      </span>
                    </div>
                  </div>
                </van-cell>
              </van-cell-group>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
    <span class="bar_btn" slot="nav-right">
      <van-icon name="wap-nav"></van-icon>
    </span>

    <!-- <div class="article_item">
      <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
      <div class="img_box">
        <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <div class="info_box">
        <span>你像一阵风</span>
        <span>8评论</span>
        <span>10分钟前</span>
        <span class="close">
          <van-icon name="cross"></van-icon>
        </span>
      </div>
    </div>-->
  </div>
</template>

<script>
import { channel } from '@/api/channel.js'
import { artData } from '@/api/article.js'
export default {
  // 页面加载的时候拿频道信息
  async created () {
    const data = await channel()
    // 将频道信息给页面上的list数值进行渲染
    this.list = data.channels
    this.list = this.list.map(item => {
      // 往每一个频道里面都塞入信息
      return {
        // 频道id
        id: item.id,
        // 频道的名字
        name: item.name,
        // 每个频道的文章详情
        articles: [],
        upLoading: false,
        downLoading: false,
        // 是否结束下拉刷新的状态
        refrashStatus: false,
        finished: false,
        timestamp: Date.now()
      }
    })
  },
  data () {
    return {
      // active: 0,
      loading: '',
      // 定义频道信息
      list: [],
      finished: false,
      finishedText: '',
      // 当前频道在数组中的索引
      channelINdex: 0,
      refreshText: ''
    }
  },
  methods: {
    // 上拉加载的功能
    async onLoad () {
      // console.log(111)
      // window.setTimeout(() => {
      //   for (var i = this.articles.length; i < this.articles.length + 20; i++) {
      //     this.articles.push(i)
      //   }
      // }, 1000)
      // this.upLoading = false
      // 获取到当前的频道
      let channelObj = this.hh
      // 获取当前频道的id
      let channelId = channelObj.id
      // 频道刚进去的时候获取当前的时间戳
      let timestamp = channelObj.timestamp
      // 向后台发获取文章列表的请求
      const msg = await artData(channelId, timestamp)
      channelObj.articles.push(...msg.results)
      channelObj.upLoading = false
      // 更新当前频道的时间戳
      channelObj.pre_timestamp = msg.pre_timestamp
    },
    // 下拉刷新的功能
    async myRefresh () {
      // console.log('刷新')
      let channelObj = this.hh
      let channelId = channelObj.id
      let timestamp = channelObj.pre_timestamp
      try {
        // 向后台发获取文章列表的请求
        const refreshMsg = await artData(channelId, timestamp)
        // 将新拉取到的数据放到当前频道的文章数组的最前面
        channelObj.articles.unshift(...refreshMsg.results)
        // 更新当前频道的时间戳
        channelObj.pre_timestamp = refreshMsg.pre_timestamp
        this.refreshText = '刷新成功'
        // 停止刷新状态
        channelObj.refrashStatus = false
      } catch (e) {
        this.refreshText = '刷新失败'
        channelObj.refrashStatus = false
      }
    }
  },
  computed: {
    hh () {
      return this.list[this.channelINdex]
    }
  }
}
</script>
<style scoped lang='less'>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll_wrapper {
      height: 100%;
      // overflow-y: auto;
    }
  }
}
// 按钮
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
// 文章列表
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
.van-pull-refresh {
  height: 100%;
  overflow: auto;
}
</style>
