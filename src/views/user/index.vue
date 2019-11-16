<template>
  <div class="container">User</div>
</template>

<script>
import myAxios from '@/axiosFile'
export default {
  created () {
    myAxios('/app/v1_0/channels', 'get')
  }
}
</script>

<style scoped lang='less'></style>
