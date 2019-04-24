<template>
  <div class="navbar-top">
    <ul>
      <li v-for="(item,index) in categories" 
        @click="changeIndex(index)"
        :key="item.id" 
        :class="{active:isActive === index,pot:item.need}">
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
          name:'全部'
        },
        {
          id:2,
          name:'特价套餐',
          need: true
        },
        {
          id:3,
          name:'湃客咖啡'
        },
        {
          id:4,
          name:'冷藏乳饮'
        }
      ]
    }
  },
  methods:{
    changeIndex(index){
      this.isActive = index;
      // this.$route.params.type = index+1;
      this.$router.push({params: { type:(index+1) } }) 
      console.log(this.$route.params);
    }
  }
}
</script>
<style lang="stylus" scoped>
.navbar-top{
  background-color #fff
  position fixed
  top 130px
  z-index 1
  width 100%
  height 68px
  padding 0 24px
  border-bottom 1px solid rgba(238,238,238,0.6)
  // position absolute
  // left 0
  // top 0
  ul{
    height 100%
    display flex
    align-items center
    li{
      height 42px
      line-height 42px
      padding 0 24px
      background-color #fff
      font-size: 26px;
      color: #8D93A4; 
      position relative
      &.pot{
        &:after{
          content ''
          width 14px
          height 14px
          border-radius 50%
          background-color #F2604D
          position: absolute;
          top: 0px;
          right: 0px;   
          // margin-top -18px
        }
      }
      &.active{
        background-color: #ADB1BE;
        border-radius: 21px;
        color #fff
        // &:before{
        //   content: '';
        //   width 8px
        //   height 36px
        //   background-color #F2BF00
        //   position: absolute;
        //   top: 50%;
        //   margin-top -18px
        //   left: 0;  
        // }
      }
    }
  }  
  
}

</style>


