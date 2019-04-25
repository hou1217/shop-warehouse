<template>
  <div class="container container_no-stocked">
    <!-- todo 替换为通用组件 -->
    <div class="hd">
      <div class="back-btn" @click="$router.go(-1)">
        <img src="@/assets/images/h5_arrow_back@2x.png">
      </div>
      <div class="text">{{goodName}}</div>
      <div class="report-icon">
        <img src="@/assets/images/shop_analysis@2x.png">
      </div>
    </div>
    <div class="bd">
      <div class="title">数据分析</div>
      <div class="time-box">
        <div class="time-box__hd">时间</div>
        <div class="time-box__bd">
          <div class="time"
               :class="{active: timeIndex === currentTimeIndex}"
               v-for="(time, timeIndex) in timeList"
               :key="timeIndex" @click="choseTime(timeIndex)">
            {{time.label}}
          </div>
        </div>
      </div>
      <div class="echarts-box">
        <div class="echart-box"></div>
        <div class="echart-box"></div>
        <div class="echart-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "noStockedGoodsReport",
    data() {
      return {
        goodName: '商品名称',
        timeList: [
          {
            label: '近一周',
            value: 'week'
          },
          {
            label: '近一个月',
            value: 'month'
          },
          {
            label: '近三个月',
            value: 'threeMonth'
          },
          {
            label: '近一年',
            value: 'year'
          }
        ],
        currentTimeIndex: 0
      }
    },
    methods: {
      // 选择时间
      choseTime(index) {
        this.currentTimeIndex = index;
      },
    }
  }
</script>

<style scoped lang="stylus">
  .container_no-stocked {
    width 100%
    height auto
    background #ffffff
    
    .hd {
      width 100%
      height 68px
      display flex
      align-items center
      position relative
      border-bottom 1px solid rgba(238,238,238,0.6)
      
      .back-btn {
        width 44px
        height 44px
        margin 0 6px 0 0
        
        img {
          width 100%
          height 100%
        }
      }
      
      .text {
        font-family PingFangSC-Medium
        font-size 28px
        color #262626
        text-align center
        height 40px
        line-height 40px
      }
      
      .report-icon {
        width 44px
        height 44px
        position absolute
        right 18px
        
        img {
          width 100%
          height 100%
        }
      }
    }
    
    .bd {
      width 100%
      height auto
      padding 40px 30px 0
      
      .title {
        width 100%
        height 42px
        line-height 42px
        font-family PingFangSC-Medium
        font-size 30px
        color #262626
        text-align left
        margin 0 0 20px 0
      }
      
      .time-box {
        width 100%
        height auto
        margin 0 0 40px 0
  
        .time-box__hd {
          width 100%
          height 33px
          line-height 33px
          margin 0 0 10px 0
          font-family PingFangSC-Regular
          font-size 24px
          color #8D93A4
          text-align justify
        }
        
        .time-box__bd {
          width 100%
          display flex
          flex-wrap wrap
          
          .time {
            width 148px
            height 56px
            border-radius 8px
            background #F4F4F4
            line-height 56px
            text-align center
            font-family PingFangSC-Regular
            font-size 26px
            color #575C68
            margin 0 20px 0 0
            
            &.active {
              background #262626
              color #FFFFFF
            }
          }
        }
      }
      
      .echarts-box {
        width 100%
        
        .echart-box {
          width 690px
          height 538px
          margin 0 0 40px 0
          background rgba(253,14,14,0.11)
        }
      }
    }
  }
</style>
