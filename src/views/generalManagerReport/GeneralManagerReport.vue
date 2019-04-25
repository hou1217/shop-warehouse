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
            <div class="echart-box"></div>
            <div class="echart-box"></div>
            <div class="echart-box"></div>
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
  import Bscroll from 'better-scroll'
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
        list: []
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
      this.$refs.container.addEventListener('touchstart', function (e) {
        if (this.shadeVisible) {
          console.debug(1);
          if (!e.target.classList.contains('item')) {
            e.preventDefault();
          }
        }
      }, true);
      this.$refs.container.addEventListener('touchmove', function (e) {
        if (this.shadeVisible) {
          if (!e.target.classList.contains('item')) {
            e.preventDefault();
          }
        }
      }, true);
      this.$refs.container.addEventListener('touchend', function (e) {
        if (this.shadeVisible) {
          if (!e.target.classList.contains('item')) {
            e.preventDefault();
          }
        }
      }, true);
    },
    methods: {
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
    }
  }
</script>

<style scoped lang="stylus" src="./GeneralManagerReport.styl"></style>
