<template>
  <div class="container">
    <van-skeleton :row="3" avatar title />
    <van-skeleton :row="3" avatar title />
    <van-skeleton :row="3" avatar title />
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.van-skeleton {
  margin-top: 20px;
}
</style>
