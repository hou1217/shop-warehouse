<template>
  <div class="box">  
    <div class="title">{{title}}</div>
    <div class="right-text">{{rightText}}</div>
    <div class="right-img" v-if="hasRightImg">
      <img src="@/assets/images/shop_report@2x.png">
    </div>
    <div class="next-btn" v-if="hasNextBtn">
      <img src="@/assets/images/arrow_enter_g@2x.png">
    </div>
  </div>
</template>
<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    },
    rightText:{
      type:String,
      default:''
    },
    hasRightImg:{
      type:Boolean,
      default:false
    },
    hasNextBtn:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style lang="stylus" scoped>
>>> img {
  width 100%
  height 100%
}
.box{
  position: relative;
  z-index: 1;
  width 100%
  height 48px
  line-height 48px
  background #F4F4F4
  padding 0 18px 0 30px
  .title{
    font-size 24px
    color #575C68
    text-align left
  }
  .right-text {
    font-size 24px
    color #8D93A4
    position absolute
    top 0
    right 58px
  }
  .right-img{
    width 32px
    height 32px
    position absolute
    top 50%
    margin-top -16px
    right 58px  
  }
  .next-btn{
    width 40px
    height 40px
    position absolute
    top 50%
    margin-top -20px
    right 18px  
  }
}
</style>

