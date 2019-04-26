<template>
  <div class="container container_gm-report" ref="container">
    <!-- todo 替换为通用组件 -->
    <div class="hd">
      <div class="text">{{location ? location : '选择定位'}}</div>
      <div class="location-icon" @click.stop="selectLocation">
        <img src="@/assets/images/shopl_local@2x.png">
      </div>
    </div>
    
    <div class="bd">
      <div class="box box_performance">
        <div class="box__hd box_performance__hd">
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
      
          <div class="echarts-box">
            <div class="echart-box" id="chart1"></div>
            <div class="echart-box" id="chart2"></div>
            <div class="echart-box" id="chart3"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 遮罩层 -->
    <div class="shade" v-if="shadeVisible"></div>
    
    <!-- 定位弹出窗 -->
    <div class="location-popup" v-if="locationPopupVisible">
      <div class="show-location">
        <div class="province" :class="{selected: province}">
          <div class="icon"></div>
          <div class="text">{{province ? province : '请选择'}}</div>
        </div>
        <div class="city" :class="{selected: city}" v-if="province">
          <div class="icon"></div>
          <div class="text">{{city ? city : '请选择'}}</div>
        </div>
      </div>
      <div class="select-box" :class="{'province-selected': province}">
        <div class="list">
          <div class="item"
               :class="{selected: item === area}"
               v-for="(item, index) in list"
               :key="index" @click.stop="onItemClick(item, index)">
            <div class="text">{{item}}</div>
            <div class="icon">
              <img src="@/assets/images/shop_select@2x.png">
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <div class="btn btn_cancel" @click="cancelSelect">取消</div>
        <div class="btn btn_confirm" @click="confirmSelect">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { mapActions } from 'vuex'
  export default {
    name: "GeneralManagerReport",
    data() {
      return {
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
            value: 'season'
          },
          {
            label: '今年',
            value: 'year'
          }
        ],
        currentTimeIndex: 0,
        location: '',
        province: '',
        city: '',
        area: '',
        shadeVisible: false,
        locationPopupVisible: false,
        provinces:
            ['北京市','天津市','上海市','重庆市','河北省','山西省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','陕西省','甘肃省','青海省','台湾省','内蒙古自治区','广西壮族自治区','西藏自治区','宁夏回族自治区','新疆维吾尔自治区','香港特别行政区','澳门特别行政区'],
        cities:
            ['南昌市','九江市','上饶市','抚州市','宜春市','吉安市','赣州市','景德镇市','萍乡市','新余市','鹰潭市','瑞昌市','共青城市','庐山市','德兴市','高安市','丰城市','樟树市','井冈山市','乐平市','贵溪市','瑞金市'],
        areas: ['赣县区','南康区','全南县','章贡区'],
        list: [],
        chart1: null,
        chart2: null,
        chart3: null,
        seriesData1:[],
        seriesData2:[],
        seriesData3:[],
      }
    },
    watch: {
      shadeVisible(val) {
        if (val) {
          document.querySelector('.container_gm-report').classList.add('notScroll');
        } else {
          document.querySelector('.container_gm-report').classList.remove('notScroll');
        }
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
      },
      
      // 打开位置选择
      selectLocation() {
        if (this.location) {
          let arr = this.location.split('/');
          this.province = arr[0];
          this.city = arr[1];
          this.area = arr[2];
          this.list = [];
          for (let item of this.areas) {
            this.list.push(item);
          }
          this.shadeVisible = true;
          this.locationPopupVisible = true;
        } else {
          this.list = [];
          for (let item of this.provinces) {
            this.list.push(item);
          }
          this.shadeVisible = true;
          this.locationPopupVisible = true;
        }
      },
      
      // 选择
      onItemClick(item, index) {
        if (!this.province) {
          // 未选择省份
          this.province = item;
          
          this.list = [];
          for (let item of this.cities) {
            this.list.push(item);
          }
          
        } else {
          if (!this.city) {
            this.city = item;
            this.list = [];
            for (let item of this.areas) {
              this.list.push(item);
            }
          } else {
            // 选择地区
            this.area = item;
          }
        }
      },
      
      // 取消地区选择
      cancelSelect() {
        this.locationPopupVisible = false;
        this.shadeVisible = false;
        this.list = [];
        this.province = '';
        this.city = '';
        this.area = '';
      },
      
      // 确认地区选择
      confirmSelect() {
        if (!this.province) {
          return false;
        }
        
        this.locationPopupVisible = false;
        this.shadeVisible = false;
        this.list = [];
        this.location = this.province + '/' + this.city + '/' + this.area;
        this.province = '';
        this.city = '';
        this.area = '';
      },
  
      // echarts
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
    }
  }
</script>

<style scoped lang="stylus" src="./GeneralManagerReport.styl"></style>
