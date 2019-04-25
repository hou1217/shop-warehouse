<template>
  <div class="navbar-left">
    <ul>
      <li v-for="(item,index) in categories" 
      @click="changeIndex(index)"
      :key="item.id" 
      :class="isActive === index?'active':''">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isActive: this.$route.params.type-1,
      categories:[
        {
          id:1,
          name:'店内活动'
        },
        {
          id:2,
          name:'为你优选'
        },
        {
          id:3,
          name:'单品优惠'
        },
        {
          id:4,
          name:'满额促销'
        },
        {
          id:5,
          name:'打包价'
        },
        {
          id:6,
          name:'特价套餐'
        },
        {
          id:7,
          name:'湃客咖啡'
        },
        {
          id:8,
          name:'全家味道'
        }
      ]
    }
  },
  methods:{
    changeIndex(index){
      this.isActive = index;
      // this.$route.params.type = index+1;
      this.$router.push({ name: 'category', params: { type:(index+1) } }) 
      console.log(this.$route.params);
    }
  }
}
</script>
<style lang="stylus" scoped>
.navbar-left{
  background-color #f6f6f6
  width 160px
  height 100%
  position absolute
  left 0
  top 0
  z-index 1
  ul{
    li{
      height 92px
      line-height 92px
      background-color #f6f6f6
      font-size: 28px;
      color: #575C68; 
      position relative
      &.active{
        background-color #ffffff
        color #262626
        font-weight bold
        &:before{
          content: '';
          width 8px
          height 36px
          background-color #F2BF00
          position: absolute;
          top: 50%;
          margin-top -18px
          left: 0;  
        }
      }
    }
  }  
}

</style>


