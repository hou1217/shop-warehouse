<template>
  <div class="container container_stocked">
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
      <div class="box box_performance">
        <div class="box__hd box_performance__hd" @click="goToHistoryRecord">
          <div class="title">今日业绩</div>
          <div class="text">历史记录</div>
          <div class="next-btn">
            <img src="@/assets/images/arrow_enter_g@2x.png">
          </div>
        </div>
        <div class="box__bd box_performance__bd">
          <div class="data-box">
            <div class="data">
              <div class="num">{{data.salesRank}}</div>
              <div class="character">销量排名</div>
            </div>
            <div class="bc"></div>
            <div class="data">
              <div class="num">{{data.revenueRank}}</div>
              <div class="character">营收排名</div>
            </div>
          </div>
          <div class="data-box">
            <div class="data">
              <div class="num num_done hasIcon">
                <div class="icon">￥</div>
                <div class="money">{{data.strike}}</div>
              </div>
              <div class="character">成交金额</div>
            </div>
            <div class="bc"></div>
            <div class="data">
              <div class="num">{{data.strikeNum}}</div>
              <div class="character">成交数量</div>
            </div>
          </div>
          <div class="data-box">
            <div class="data">
              <div class="num last hasIcon">
                <div class="icon">￥</div>
                <div class="money">{{data.gross}}</div>
              </div>
              <div class="character last">毛利润</div>
            </div>
            <div class="bc"></div>
            <div class="data">
              <div class="num last hasIcon">
                <div class="icon">￥</div>
                <div class="money">{{data.netProfit}}</div>
              </div>
              <div class="character last">净利润</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box box_related">
        <div class="box__hd box_related__hd">
          <div class="title">相关数据</div>
        </div>
        <div class="box__bd box_related__bd">
          <div class="stock">
            <div class="num">{{data.stock}}</div>
            <div class="character">剩余库存</div>
          </div>
          <div class="data">
            <div class="item">
              <div class="num">{{data.mprate}}</div>
              <div class="character">动销率</div>
            </div>
            <div class="bc"></div>
            <div class="item">
              <div class="num">{{data.sinkToPin}}</div>
              <div class="character">库销比</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box box_analysis">
        <div class="box__hd box_analysis__hd">
          <div class="title">数据分析</div>
        </div>
        <div class="box__bd box_analysis__bd">
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
          <div class="compare-box">
            <div class="compare-box__hd">对比</div>
            <div class="compare-box__bd">
              <div class="compare-good"
                   v-for="(goods, goodIndex) in compareGoods"
                   :key="goodIndex">
                <img :src="goods.image">
                <div class="delete-btn" @click.stop="deleteGood(goodIndex)">
                  <img src="@/assets/images/search_close@2x.png">
                </div>
              </div>
              <div class="compare-good compare-good_add" @click.stop="addGood">
                <img src="@/assets/images/group_add@2x.png">
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
    </div>
  </div>
</template>

<script>
import echarts  from 'echarts'
import { mapActions } from 'vuex'
import eventBus from '@/assets/js/eventBus'
export default {
  name: "stockedGoodsReport",
  data() {
    return {
      goodName: '商品名称',
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
          value: 'threeMonth'
        },
        {
          label: '近一年',
          value: 'year'
        }
      ],
      chart1:null,
      chart2:null,
      chart3:null,
      seriesData1:[],
      seriesData2:[],
      seriesData3:[],
      currentTimeIndex: 0,
      data: {
        salesRank: 1,
        revenueRank: 5,
        strike: 642.32,
        strikeNum: 102,
        gross: 212.09,
        netProfit: 143.43,
        stock: 98,
        mprate: '105%',
        sinkToPin: 2
      },
      compareGoods: [],
      number: 1
    }
  },
  created(){
    eventBus.$on('selectCompareGoods',this.onGoodsUpdate);
    this.getChartData1();
    this.getChartData2();
    this.getChartData3();
  },
  watch:{
    'compareGoods.length':{
      handler(){
        this.number = this.compareGoods.length + 1
        console.error(this.number);
        this.getChartData1();
        this.getChartData2();
        this.getChartData3();
      }
    }
  },
  beforeDestroy(){
    eventBus.$off("selectCompareGoods", this.onGoodsUpdate)
  },
  destroyed() {
    console.debug('destroyed');
    eventBus.$emit('selectedCompareGoods', this.compareGoods);
  },
  methods: {
    ...mapActions([
      'REQUEST_API'
    ]),
    goToHistoryRecord(){
      this.$router.push({name:'historyRecord'});
    },
    onGoodsUpdate(data){
      console.warn(data);
      this.compareGoods = data;
    },
    // 选择时间
    choseTime(index) {
      this.currentTimeIndex = index;
      this.getChartData1();
      this.getChartData2();
      this.getChartData3();

    },
    getChartData1(){
      this.REQUEST_API({
        api: 'getGoodsSalesNum',
        params: {
          number:this.number
        }
      })
      .then((res) => {
        console.log(res);
        if(res){
          let arr = [];
          for(let i = 0; i< this.compareGoods.length+1;i++){
            let item = {
              type: 'line',
              data: res[i]
            }
            arr.push(item);
          }
          this.seriesData1 = arr;
         
          console.log(this.seriesData1);
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
        params: {
          number:this.number
        }
      })
      .then((res) => {
        // console.log(res);
        if(res){
          let arr = [];
          for(let i = 0; i< this.compareGoods.length+1;i++){
            let item = {
              type: 'line',
              data: res[i]
            }
            arr.push(item);
          }
          this.seriesData2 = arr;
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
        params: {
          number:this.number
        }
      })
      .then((res) => {
        // console.log(res);
        if(res){
          let arr = [];
          for(let i = 0; i< this.compareGoods.length+1;i++){
            let item = {
              type: 'line',
              data: res[i]
            }
            arr.push(item);
          }
          this.seriesData3 = arr;
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
        series: this.seriesData1
      }
      this.chart1.clear();
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
        series: this.seriesData2
      }
      this.chart2.clear();
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
        series: this.seriesData3
      }
      this.chart3.clear();
      this.chart3.setOption(
        option3
      )
    },
    // 删除对比商品
    deleteGood(index) {
      console.debug('删除第' + index + '件对比的商品');
      this.compareGoods.splice(index, 1);
    },
    
    // 新增对比商品
    addGood() {
      console.debug('跳转至商品选择页');
      this.$router.push({
        path: '/compareSelect'
      });
    },
  }
}
</script>

<style scoped lang="stylus" src="./StockedGoodsReport.styl"></style>
