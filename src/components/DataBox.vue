<template>
  <div class="box-bd">
    <div 
      class="data-box" 
      >
      <div 
        class="data" 
        v-for="(data,index) in datas" 
        :key="index">
        <div class="num" :class="{last:data.small}">{{data.num}}</div>
        <div class="character" :class="{last:data.small}">{{data.character}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    datas:{
      type: Array,
      default: () =>[]
    }
  }
}
</script>

<style lang="stylus" scoped>
.box-bd{
  .data-box {
    width 100%
    // height auto
    display flex
    align-items center
    justify-content center
    flex-wrap wrap
    .data {
      position relative
      width 50%
      height 166px
      display flex
      flex-direction column
      // flex-wrap wrap
      align-items center
      justify-content center
      // flex 1
      &:nth-of-type(odd){
        &:after{
          content ''
          position absolute
          right 0
          width 1px
          height 40px
          background #EEEEEE
        }
        
      }

      .num {
        width 100%
        height 50px
        line-height 50px
        text-align center
        margin 0 0 2px 0
        font-family SFUIDisplay-Regular
        font-size 42px
        color #262626

        &.hasIcon {
          font-size 0
          display flex
          justify-content center
          align-items center

          .icon {
            font-family: PingFangSC-Regular
            font-size: 26px
            color: #262626
            height 37px
            line-height 37px
            margin-top 10px
          }

          .money {
            height 50px
            line-height 50px
            font-family SFUIDisplay-Regular
            font-size 42px
            color #262626
          }
        }

        &.last {
          height 40px
          line-height 40px
          font-size 34px

          &.hasIcon {
            font-size 0
            display flex
            justify-content center
            align-items center

            .icon {
              font-family SFUIDisplay-Regular
              font-size 22px
              color #262626
              height 30px
              line-height 30px
              margin 0
            }

            .money {
              height 40px
              line-height 40px
              font-family SFUIDisplay-Regular
              font-size 34px
              color #262626
            }
          }
        }
      }

      .character {
        width 100%
        height 30px
        line-height 30px
        font-family PingFangSC-Regular
        font-size 22px
        color #575C68
        text-align center

        &.last {
          font-size 20px
        }
      }
    }

    
  }  
}
</style>

