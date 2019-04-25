<template>
  <div class="warehouse-report">
    <HeaderTitle :title="'总仓报表'"/>
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
      <!-- 时间选择器 -->
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
        <div class="echart-box" id="chart2"></div>
        <!-- <div class="time-box__hd">分类毛利</div> -->
        <div class="echart-box" id="chart3"></div>
      </div>

      </div>
      <!-- 最佳伴侣 -->
      <SmallTitle 
        :title="'最佳伴侣'"/>
      <div class="best-mate">
        <div class="mate" v-for="(item,index) in items" :key="index">
          <div class="prop">{{item.props}}%</div>
          <div class="goods">
            <div class="goods-img">
              <img src="@/assets/images/demo2.png" alt="">
            </div>
            <div>
              {{item.name1}}
            </div>
          </div>
          
          <div class="goods">
            <div class="goods-img">
              <img src="@/assets/images/demo2.png" alt="">
            </div>
            <div>
              {{item.name2}}
            </div>
          </div>
        </div>
      </div>
      <!-- 查看更多 -->
      <div 
        class="read-more"
        @click="getMateData()"
        style="margin-bottom:30px">
        查看更多
        <div class="down-img">
          <img src="@/assets/images/shop_drop_down_b@2x.png" alt="">
        </div>
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
      datas:[
        {
          num:15,
          character:"商品分类"
        },
        {
          num:2,
          character:"新增分类"
        },
      ],
      chart1:null,
      seriesData:[],
      chart2:null,
      chart3:null,
      currentTimeIndex: 0,
      timeList: [
        
        {
          label: '今日',
          value: 'today'
        },
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
          value: 'quarter'
        },
        {
          label: '近一年',
          value: 'year'
        }
      ],
      items:[
        
      ],
    }
  },
  created(){
    this.getMateData();
  },
  mounted(){
    this.getChartData();

  },
  methods:{
    ...mapActions([
      'REQUEST_API'
    ]),
    choseTime(index){
      this.currentTimeIndex = index;
      
    },
    getChartData(){
      this.seriesData1 = [
        {"name":"美妆护理","value":5},
        {"name":"面包甜点","value":20},
        {"name":"特价套餐","value":10},
        {"name":"休闲零食","value":11},
        {"name":"湃客咖啡","value":17},
        {"name":"精选饮料","value":3},
        {"name":"冷藏乳饮","value":8},
        {"name":"美味鲜食","value":26},
      ]
      this.seriesData2 = [
        {"name":"美妆护理","value":5},
        {"name":"面包甜点","value":20},
        {"name":"特价套餐","value":10},
        {"name":"休闲零食","value":11},
        {"name":"湃客咖啡","value":17},
        {"name":"精选饮料","value":3},
        {"name":"冷藏乳饮","value":8},
        {"name":"美味鲜食","value":26},
      ]
      this.seriesData3 = [
        {"name":"美妆护理","value":15},
        {"name":"面包甜点","value":20},
        {"name":"特价套餐","value":15},
        {"name":"休闲零食","value":7},
        {"name":"湃客咖啡","value":33},
        {"name":"精选饮料","value":2},
        {"name":"冷藏乳饮","value":6},
        {"name":"美味鲜食","value":2},
      ]
      this.initChart();
    },
    initChart(){
      this.chart1 = echarts.init(document.getElementById("chart1"));
      this.chart2 = echarts.init(document.getElementById("chart2"));
      this.chart3 = echarts.init(document.getElementById("chart3"));
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
            data: [2,2,3,4,1]
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
            data: [7,8,8,8,12]
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
            data: [2,2,1,1,1]
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
            data: [4,4,3,2,3]
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
            data: [5,5,5,4,5]
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
            data: [3,4,3,4,2]
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
            data: [2,4,5,2,6]
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
            data: [1,1,1,1,1]
          }
        ]
      }
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
      this.chart1.setOption(
        option1
      );
      this.chart2.setOption(
        option2
      )
      this.chart3.setOption(
        option3
      )
    },
    getMateData(){
      this.REQUEST_API({
        api: 'getMateList',
        params: {}
      })
      .then((res) => {
        console.log(res);
        if(res  && res.cards.length > 0){          
          this.items = [].concat(this.items,res.cards);     
        }
        console.warn('加载结束');
      })
      .catch((err) => {
        console.debug('列表数据异常：', err);
      });
    },
  }
}
</script>

<style lang="stylus" scoped src="./WarehouseReport.styl"></style>

