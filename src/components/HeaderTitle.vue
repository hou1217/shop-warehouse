<template>
  <div class="navbar">
    <div class="back-btn" @click="goBack()">
      <img src="@/assets/images/navi_back_w@2x.png">
    </div>
    <div class="title">{{title}}</div>
    <div class="search-btn" @click="clickSearch" v-if="hasSearch">
      <img src="@/assets/images/shop_search@2x.png">
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      title:{
        type:String,
        default:'设置'
      },
      name:{
        type: String
      },
      hasSearch:{
        type: Boolean,
        default: false
      }
    },
    methods:{
      goBack(){
        if(!this.name){
          this.$router.go(-1);
        }else{
          this.$router.push({name:this.name,params:{type:1}});
        }
      },
      clickSearch(){
        this.$emit('clickSearch');
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .navbar {
    width 100%
    height 68px
    position fixed
    top 0
    z-index 99
    background #ffffff
    display flex
    align-items center

    .back-btn {
      float left
      margin-left 16px
      margin-right -16px
      width 44px
      height 44px
      position relative

      &::before {
        content ''
        position absolute
        top 0
        right 0
        bottom 0
        left 0
      }

      img {
        width 100%
        height 100%
        object-fit cover
      }
    }

    .title {
      text-align left
      width 76.7%
      height 68px
      line-height 68px
      margin 0 auto
      font-family PingFangSC-Regular
      font-size 28px
      color #262626
      // text-align center
    }

    .search-btn {
      margin-right 18px
      width 44px
      height 44px
      img{
        width 100%
        height 100%
      }
      

      
    }
  }
</style>


