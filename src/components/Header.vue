<template>
  <div class="header">
    <ul>
      <li class="">
        综合
        <img src="@/assets/images/shop_arrow_down@2x.png" alt="">
      </li>
      <li class="">
        销量
      </li>
      <li class="">
        价格
        <img src="@/assets/images/shop_balance@2x.png" alt="">
      </li>
      <li class="active">
        分类
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.header{
  width 100%
  height 62px
  padding 0 32px
  border-bottom 1px solid rgba(238,238,238,0.6)
  ul{
    
    height 100%
    display flex
    justify-content flex-start
    align-items center
    
    li{
      &.active{
        color: #262626; 
      }
      
      img{
        width 24px
        height 24px
        vertical-align text-top
      }  
      
      font-size: 26px;
      color: #8D93A4;
      margin-right 60px
    }
      
  }
    
}  

</style>
