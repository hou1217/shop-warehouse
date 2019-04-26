<template>
  <div class="shop-data">
    <HeaderTitle :title="'分类数据'"/>
    <div class="content">
      <!-- 小标题 -->
      <SmallTitle 
        :title="'分类数据'"/>
      <!-- 数据盒子 -->
      <DataBox :datas="datas"/>
      <!-- 小标题 -->
      <SmallTitle 
        :title="'数据分析'"
        :hasRightImg="true"/>
      <div class="time-box">
        <div class="time-box__hd">时间</div>
        <div class="time-box__bd">
          <div class="time"
            :class="{active: currentTimeIndex === timeIndex}"
            v-for="(time, timeIndex) in timeList"
            :key="timeIndex" @click="choseTime(timeIndex)">
            {{time.label}}
          </div>
        </div>
      </div>
      <div class="echarts-box">
        <!-- <div class="time-box__hd">分类销量</div> -->
        <div class="echart-box" id="chart1"></div>
        <!-- <div class="time-box__hd">时段销量</div> -->
        <div class="echart-box" id="chart2" v-if="isToday"></div>
        <!-- <div class="time-box__hd">分类毛利</div> -->
        <div class="echart-box" id="chart3"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { mapActions } from 'vuex'
import HeaderTitle from '@/components/HeaderTitle'
import SmallTitle from '@/components/SmallTitle'
import DataBox from '@/components/DataBox'
export default {
  components:{
    HeaderTitle,
    SmallTitle,
    DataBox
  },
  data(){
    return{
      currentTimeIndex: 0,
      kind: 0,
      datas:[
        {
          num:8,
          character:"商品分类"
        },
        {
          num:1,
          character:"新增分类"
        },
      ],
      chart1:null,
      chart2:null,
      chart3:null,
      seriesData1:[],
      seriesData2:[],
      seriesData3:[],

      timeList: [
        
        {
          label: '今日',
          value: 'today'
        },
        {
          label: '本周',
          value: 'week'
        },
        {
          label: '本月',
          value: 'month'
        },
        {
          label: '本季度',
          value: 'quarter'
        },
        {
          label: '本年',
          value: 'year'
        }
      ],
      isToday:true,
      data:{}
    }
  },
  created(){
    this.getShopData();
  },
  mounted(){
    this.getChartData1();
    this.getChartData2();
    this.getChartData3();
  },
  methods:{
    ...mapActions([
      'REQUEST_API'
    ]),
    choseTime(index){
      this.currentTimeIndex = index;
      this.getShopData();
      this.kind = index;
      if(index === 0){
        this.isToday = true
        this.getChartData2();
      }else{
        this.isToday = false
      }
      this.getChartData1();
      this.getChartData3();
    },
    getChartData1(){
      this.REQUEST_API({
        api: 'getClassifiedNums',
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
        api: 'getSectionSales',
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
        api: 'getClassifiedProfit',
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
            text:'分类销量',
            textStyle:{
              fontSize: '12',
              color: '#8d93a4',
              fontWeight: 'normal'
            },
            top: 0
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b} <br/> {d}%"
          },
        
          // legend: {
          //   orient: 'horizontal',
          //   right: 70,
          //   top: 30,
          //   textStyle: {
          //     color: '#90979c'
          //   },
          //   data: ['美妆护理', '面包甜点', '特价套餐','休闲零食', '湃客咖啡', '精选饮料','冷藏乳饮', '美味鲜食']
          // },
          color:['#9e4518', '#fdb92b','#6197cd','#74a84b','#eb7739','#4b6fbc','#a7a0a0','#2c5b8b'],
          
          series: [
            {
              name:'分类销量',
              type: 'pie',
              
              startAngle: 0,
              // avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  position: 'outside',
                  formatter: "{b}\n{d}%",
                  
                  textStyle: {
                    fontSize: '12',
                    fontWeight: 'normal'
                  }
                },
                emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '14',
                      // fontWeight: 'bold'
                  }
                }
              },
              // itemStyle:{
              //   normal:{
              //   }
              // },
              data:this.seriesData1
              
            }
          ]
        
        };
      
      
      this.chart1.setOption(
        option1
      );
    },
    initChart2(){
      this.chart2 = echarts.init(document.getElementById("chart2"));
      const option2 = {
        title:{
          text:'时段销量',
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
            name: '美妆护理',
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
            data: this.seriesData2[0]
          },
          {
            name: '面包甜点',
            type: 'line',
            // stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: '#fdb92b',
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
            data: this.seriesData2[1]
          },
          {
            name: '特价套餐',
            type: 'line',
            // stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: '#6197cd',
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
            data: this.seriesData2[2]
          },
          {
            name: '休闲零食',
            type: 'line',
            // stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: '#74a84b',
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
            data: this.seriesData2[3]
          },
          {
            name: '湃客咖啡',
            type: 'line',
            // stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: '#eb7739',
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
            data: this.seriesData2[4]
          },
          {
            name: '精选饮料',
            type: 'line',
            // stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: '#4b6fbc',
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
            data: this.seriesData2[5]
          },
          {
            name: '冷藏乳饮',
            type: 'line',
            // stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: '#a7a0a0',
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
            data: this.seriesData2[6]
          },
          {
            name: '美味鲜食',
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
            data: this.seriesData2[7]
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
          text:'分类毛利',
          textStyle:{
            fontSize: '12',
            color: '#8d93a4',
            fontWeight: 'normal'
          },
          top: 0
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} <br/> {d}%"
        },
        color:['#9e4518', '#fdb92b','#6197cd','#74a84b','#eb7739','#4b6fbc','#a7a0a0','#2c5b8b'],
        series: [
          {
            name:'分类毛利',
            type: 'pie',
            
            startAngle: 0,
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'outside',
                formatter: "{b}\n{d}%",
                
                textStyle: {
                    fontSize: '12',
                    fontWeight: 'normal'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                    fontSize: '14',
                    // fontWeight: 'bold'
                }
              }
            },
            // itemStyle:{
            //   normal:{
            //   }
            // },
            data:this.seriesData3
            
          }
        ]
      }
      this.chart3.setOption(
        option3
      )
    },
    getShopData(){
      

      this.REQUEST_API({
        api: 'getShopData',
        params: {
          kind:this.kind
        }
      })
      .then((res) => {
        console.log(res);
        this.data = res;     
        console.warn('加载结束');
      })
      .catch((err) => {
        console.debug('列表数据异常：', err);
      });
    }
  }
} 
</script>
<style lang="stylus" scoped>
>>> img{
  width 100%
  height 100%
}
.shop-data{
  .select-btn{
    // border-top 1px solid rgba(238,238,238,0.6)
    background-color #fff
    
    box-sizing border-box
    // z-index 1
    padding 20px 33px
    width 100% 
    display flex
    justify-content space-between
    li{
      &.active{
        color #fff
        background: #262626;   
      }
      box-sizing border-box
      // margin-top 24px
      width 148px
      height 56px
      line-height 56px
      background: #F4F4F4;
      border-radius: 8px;
      font-size: 26px;
    }
  }  
  .content{
    padding-top 68px
    .time-box {
      width 100%
      margin 26px 0 16px 0
      padding 0 30px
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
          margin 0 20px 24px 0

          &.active {
            background #262626
            color #FFFFFF
          }
        }
      }
    }
    .title{
      background: #F4F4F4;
      height 44px
      line-height 44px
      text-align left 
      padding-left 20px
    }
    
  }
  .echarts-box {
    width 100%

    .echart-box {
      width 690px
      height 538px
      margin 20px auto
      
      // background rgba(253,14,14,0.11)
    }
  }
}
</style>


