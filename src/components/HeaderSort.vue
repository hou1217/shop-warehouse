<template>
  <div class="navbar">
    <div class="comprehensive item">
      综合
      <img src="@/assets/images/shop_arrow_down@2x.png" alt="">
    </div>
    <div class="sales item">
      销量
      <img src="@/assets/images/shop_balance@2x.png" alt="">
    </div>
    
  </div>
</template>
<script>
  export default {
    props:{
      title:{
        type:String,
        default:'设置'
      }
    },
    methods:{
      clickSearch(){
        this.$emit('clickSearch');
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .navbar {
    width 100%
    height 62px
    background #ffffff
    display flex
    align-items center
    padding 0 32px
    border-top 1px solid rgba(238,238,238,0.6)
    border-bottom 1px solid rgba(238,238,238,0.6)
    img{
      width 24px
      height 24px
      vertical-align text-top
    }  
    .item{
      font-size: 26px;
      color: #8D93A4;
      line-height 62px 
      margin-right 60px
    }
   
  }
</style>


