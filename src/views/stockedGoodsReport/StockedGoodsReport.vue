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
            <div class="echart-box"></div>
            <div class="echart-box"></div>
            <div class="echart-box"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    }
  },
  created(){
    eventBus.$on('selectCompareGoods',this.onGoodsUpdate)
  },
  beforeDestroy(){
    eventBus.$off("selectCompareGoods", this.onGoodsUpdate)
  },
  methods: {
    onGoodsUpdate(data){
      console.log(data);
      this.compareGoods = data;
    },
    // 选择时间
    choseTime(index) {
      this.currentTimeIndex = index;
    },
    
    // 删除对比商品
    deleteGood(index) {
      console.debug('删除第' + index + '件对比的商品');
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
