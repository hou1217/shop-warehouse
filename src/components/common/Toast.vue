<template>
  <!-- toast弹框 -->
  <div class="toast" v-if="toastVisible">
    <div class="icon" v-if="toastData.icon">
      <img :src="toastData.icon">
    </div>
    <div class="text">{{toastData.msg}}</div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  props:{
    toastVisible:{
      type: Boolean,
      default:false
    },
    toastData: {
      type: Object,
      default:{
        icon: null,
        msg: ''
      }
      
    },
  },
  data(){
    return{
      
    }
  },
  watch:{
    'toastVisible':{
      handler(val){
        if(val){
          setTimeout(()=>{
            this.$parent.toastVisible = false;
          },2000)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.toast {
  display flex
  position fixed
  padding 13px 30px
  align-items center
  bottom 244px
  left 50%
  background rgba(0,0,0,0.8)
  border-radius 8px
  z-index 1000
  -webkit-transform: translate(-50%, 0)
  -moz-transform: translate(-50%, 0)
  -ms-transform: translate(-50%, 0)
  -o-transform: translate(-50%, 0)
  transform: translate(-50%, 0)
  
  .icon {
    width 62px
    height 62px
    margin-right 6px
    
    img {
      width 100%
      height 100%
      object-fit cover
    }
  }
  
  .text {
    font-family PingFangSC-Regular
    font-size 32px
    color #FFFFFF
  }
}
</style>

