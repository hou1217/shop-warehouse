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
        <div class="echart-box" id="chart1"></div>
        <div class="echart-box" id="chart2"></div>
        <div class="echart-box" id="chart3"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { mapActions } from 'vuex'
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
    mounted() {
      this.getChartData1();
      this.getChartData2();
      this.getChartData3();
    },
    methods: {
      ...mapActions([
        'REQUEST_API'
      ]),
      // 选择时间
      choseTime(index) {
        this.currentTimeIndex = index;
        this.getChartData1();
        this.getChartData2();
        this.getChartData3();
      },
      
      // echarts
      getChartData1(){
        this.REQUEST_API({
          api: 'getGoodsSalesNum',
          params: {}
        })
            .then((res) => {
              console.log(res);
              if(res){
                this.seriesData1 = res;
                this.initChart1();
              }
              console.warn('加载结束');
            })
            .catch((err) => {
              console.debug('列表数据异常：', err);
            });
    
      },
      getChartData2(){
        this.REQUEST_API({
          api: 'getSalesRate',
          params: {}
        })
            .then((res) => {
              console.log(res);
              if(res){
                this.seriesData2 = res
                this.initChart2();
              }
              console.warn('加载结束');
            })
            .catch((err) => {
              console.debug('列表数据异常：', err);
            });
    
      },
      getChartData3(){
        this.REQUEST_API({
          api: 'getSalesRatio',
          params: {}
        })
            .then((res) => {
              console.log(res);
              if(res){
                this.seriesData3 = res
                this.initChart3();
              }
              console.warn('加载结束');
            })
            .catch((err) => {
              console.debug('列表数据异常：', err);
            });
    
      },
      initChart1(){
        this.chart1 = echarts.init(document.getElementById("chart1"));
        const option1 = {
          title:{
            text:'销量',
            textStyle:{
              fontSize: '12',
              color: '#8d93a4',
              fontWeight: 'normal'
            },
            top: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
          
            },
            data:  ['09点', '10点', '11点', '12点', '13点']
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          series: [
            {
              name: '销量',
              type: 'line',
              // stack: 'total',
              barMaxWidth: 35,
              barGap: '10%',
              itemStyle: {
                normal: {
                  color: '#9e4518',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#fff'
                    },
                    position: 'insideTop',
                    formatter(p) {
                      return p.value > 0 ? p.value : ''
                    }
                  }
                }
              },
              data: this.seriesData1
            }
      
          ]
        }
        this.chart1.setOption(
            option1
        )
      },
      initChart2(){
        this.chart2 = echarts.init(document.getElementById("chart2"));
        const option2 = {
          title:{
            text:'动销率%',
            textStyle:{
              fontSize: '12',
              color: '#8d93a4',
              fontWeight: 'normal'
            },
            top: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
          
            },
            data:  ['09点', '10点', '11点', '12点', '13点']
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          series: [
            {
              name: '动销率%',
              type: 'line',
              // stack: 'total',
              barMaxWidth: 35,
              barGap: '10%',
              itemStyle: {
                normal: {
                  color: '#2c5b8b',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#fff'
                    },
                    position: 'insideTop',
                    formatter(p) {
                      return p.value > 0 ? p.value : ''
                    }
                  }
                }
              },
              data: this.seriesData2
            }
          ]
        }
        this.chart2.setOption(
            option2
        )
      },
      initChart3(){
        this.chart3 = echarts.init(document.getElementById("chart3"));
        const option3 = {
          title:{
            text:'库销比',
            textStyle:{
              fontSize: '12',
              color: '#8d93a4',
              fontWeight: 'normal'
            },
            top: 0
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0
          
            },
            data:  ['09点', '10点', '11点', '12点', '13点']
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          series: [
            {
              name: '库销比',
              type: 'line',
              // stack: 'total',
              barMaxWidth: 35,
              barGap: '10%',
              itemStyle: {
                normal: {
                  color: '#2c5b8b',
                  label: {
                    show: true,
                    textStyle: {
                      color: '#fff'
                    },
                    position: 'insideTop',
                    formatter(p) {
                      return p.value > 0 ? p.value : ''
                    }
                  }
                }
              },
              data: this.seriesData3
            }
          ]
        }
        this.chart3.setOption(
            option3
        )
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
      position fixed
      top 0
      left 0
      z-index 1
      background #ffffff
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
      padding 108px 30px 0
      
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
        }
      }
    }
  }
</style>
