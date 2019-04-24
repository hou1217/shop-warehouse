<template>
  <ul class="floating-boxes">
    <router-link
      v-for="(item,index) in btns"
      :key="index"
      :to="{name:item.name,params:{type:1}}"
      tag="li">
      <a>
        <div 
          class="img-box"
          >
          <img :src="item.url" alt="">
        </div>
      </a>
    </router-link>

    <!-- <div 
      class="img-box"
      v-for="(item,index) in btns"
      @click="handleClick(item)"
      :key="index">
      <img :src="item.url" alt="">
    </div> -->

    <!-- <div class="img-box">
      <img src="@/assets/images/shop_suspension_order@2x.png" alt="">
    </div>
    <div class="img-box">
      <img src="@/assets/images/shop_suspension_stock@2x.png" alt="">
    </div> -->
  </ul>
</template>
<script>
export default {
  props:{
    btns:{
      type: Array,
      default: () => [
        {
          type:'purchaseOrder',
          url:require('@/assets/images/shop_suspension_warehouse@2x.png')
        },
        {
          type:'order',
          url:require('@/assets/images/shop_suspension_order@2x.png')
        },
        {
          type:'purchase',
          name:'general',
          url:require('@/assets/images/shop_suspension_stock@2x.png')
        },
      ]
    }
  },
  data(){
    return{
      
    }
  },
  methods:{
    
  }
}
</script>
<style lang="stylus" scoped>
.floating-boxes{
  position fixed
  bottom 40px
  right 24px
  z-index 1
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


