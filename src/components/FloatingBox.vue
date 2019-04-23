<template>
  <div class="floating-boxes">
    <div class="img-box">
      <img src="@/assets/images/shop_suspension_warehouse@2x.png" alt="">
    </div>
    <div class="img-box">
      <img src="@/assets/images/shop_suspension_order@2x.png" alt="">
    </div>
    <div class="img-box">
      <img src="@/assets/images/shop_suspension_stock@2x.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      
    }
  }
}
</script>
<style lang="stylus" scoped>
.floating-boxes{
  position fixed
  bottom 40px
  right 24px
  .img-box{
    margin-top 24px
    width  76px
    height 76px
    img{
      width 100%
      height 100%
    }
  }
}
</style>


