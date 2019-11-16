<template>
  <div class="container">
    <div class="page-login">
      <van-cell-group>
        <van-field
          :error-message="mobileData"
          @blur="myMobile"
          label="手机号"
          placeholder="请输入手机号"
          v-model="myMsg.mobile"
        />
        <van-field
          :error-message="codeData"
          @blur="myCode"
          label="验证码"
          placeholder="请输入验证码"
          v-model="myMsg.code"
        >
          <van-button class="p5" size="mini" slot="button" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="btn_box">
        <van-button @click="login" block round type="info">登 录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
import { mapMutations } from 'vuex'
import router from '@/router'
export default {
  data () {
    return {
      // 获取输入的手机号、验证码
      myMsg: {
        mobile: '15700000000',
        code: '246810'
      },
      // 设置错误提示信息
      mobileData: '',
      codeData: ''
    }
  },
  methods: {
    // 校验手机号
    myMobile () {
      if (!this.myMsg.mobile) {
        this.mobileData = '手机号不能为空'
        return false
      } else if (!/^1[3-9]\d{9}$/.test(this.myMsg.mobile)) {
        this.mobileData = '请输入正确格式的手机号'
        return false
      }
      this.mobileData = ''
    },
    // 校验验证码
    myCode () {
      if (!this.myMsg.code) {
        this.codeData = '验证码不能为空'
        return false
      } else if (!/^\d{6}$/.test(this.myMsg.code)) {
        this.codeData = '请输入六位的验证码'
        return false
      }
      this.codeData = ''
    },
    // 全局校验
    async login () {
      this.myMobile()
      this.myCode()
      if (this.mobileData || this.codeData) {
        return false
      }
      try {
        // 发登录请求
        const data = await login(this.myMsg)
        // 修改store中的myToken
        this.setUser(data)
        // 判断是否有回跳
        if (router.currentRoute.query.backURL) {
          router.push(router.currentRoute.query.backURL)
        } else {
          router.push('/user')
        }
      } catch (e) {
        this.$toast.fail('手机号或验证码错误')
      }
    },
    ...mapMutations(['setUser'])
  }
}
</script>

<style scoped lang='less'>
.p5 {
  padding: 0 5px;
}
.btn_box {
  padding: 10px;
  .van-button {
    height: 32px;
    line-height: 30px;
  }
}
</style>
