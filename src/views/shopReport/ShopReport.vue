<template>
  <div class="container container_report">
    
    <div class="bd">
      <!-- 今日业绩 -->
      <SmallTitle 
        @click.native="goToHistoryRecord"
        :title="'今日业绩'" 
        :rightText="'历史纪录'" 
        :hasNextBtn="true"/>
      <div class="box box_performance">
        <div class="box__bd box_performance__bd">
          <div class="data-box">
            <div class="data">
              <div class="num">{{data.salesRank}}</div>
              <div class="character">上海排名</div>
            </div>
            <div class="bc"></div>
            <div class="data">
              <div class="num">{{data.revenueRank}}</div>
              <div class="character">区域排名</div>
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
      <!-- 店铺数据 -->
      <SmallTitle 
        @click.native="goToShopData"
        :title="'店铺数据'" 
        :hasRightImg="true"
        :hasNextBtn="true"/>
      <div class="box box_performance">
        <div class="box__bd box_performance__bd">
          <div class="data-box">
            <div class="data">
              <div class="num">{{data.kinds}}</div>
              <div class="character">商品种类</div>
            </div>
            <div class="bc"></div>
            <div class="data">
              <div class="num">{{data.remainingNums}}</div>
              <div class="character">剩余库存</div>
            </div>
          </div>
          
          
          <div class="data-box">
            <div class="data">
              <div class="num last">{{data.mprate}}</div>
              <div class="character last">动销率</div>
            </div>
            <div class="bc"></div>
            <div class="data">
              <div class="num last">{{data.sinkToPin}}</div>
              <div class="character last">库销比</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分类数据 -->
      <SmallTitle 
        @click.native="goToClassifiedData"
        :title="'分类数据'" 
        :hasRightImg="true"
        :hasNextBtn="true"/>
      <div class="box box_performance box_kinds">
        
        <!-- <div class="box__bd box_kinds__bd">
          <div class="left">
            <div class="title">分类销量</div>
            <div id="echart">

            </div>
          </div>
          
          <div class="right">
            <div class="title">商品分类：8</div>
            <ul class="kinds">
              <li 
                v-for="(kind,index) in kinds"
                :key="index">
                {{kind.name}}
              </li>
            </ul>
          </div>
        </div> -->
      </div>
      <!-- 单品排行 -->
      <SmallTitle 
        :title="'单品排行'"/>
      <div class="container" ref="infoBot">
        <!-- 筛选排序 -->
        <HeaderSort @PopupVisible="handlePop"/> 
        <!-- 类别分类 -->
        <NavbarTop />
        <!-- 主体盒子 -->
        <div class="main-box" >
          <div
          v-for="(card,index) in cards"
          @click="goToDetail(card.id)"
          :key="index">
            <div class="card">
              <div class="portrait">
                <img src="@/assets/images/demo2.png" :onerror="defaultSrc"/>
                <div class="rank-icon" :class="{hasRedBac:index < 3}">
                  {{index+1}}
                  
                </div>
                <!-- <div class="addgoods">
                  <img 
                    :src="card.stockNum < 10?
                    require('@/assets/images/shop_stockgoods@2x.png'):require('@/assets/images/shop_addgoods_s@2x.png')" 
                    alt="">
                </div> -->
              </div>
              <div class="content">
                <h3>{{card.name}}</h3>
                <div class="sales-num">
                  <span>售价¥{{card.price}}</span>
                  <span>今日销售{{card.salesNumToday}}</span>
                </div>
                <div class="sales-num">
                  <span>毛利¥{{card.profit}}</span>
                  <!-- <span class="stock" :class="{red:card.stockNum < 10}">库存{{card.stockNum}}</span> -->
                  <div class="btns">
                    <div class="btn">
                      <img src="@/assets/images/shop_report@2x.png" alt="">
                    </div>
                    <div class="btn">
                      <img src="@/assets/images/arrow_enter_g@2x.png" alt="">
                    </div>
                  </div>
                  
                </div>
                <div class="labels">
                  <div class="icon">
                    <img src="@/assets/images/icon/shop_rate@2x.png" alt="">
                  </div>
                  <div class="label" :class="{red:card.props > 100}">
                    动销率 {{card.props}}%
                  </div>
                  <div class="label" :class="{red:card.ratio > 5}">
                    库销比 {{card.ratio}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 查看更多 -->
        <div class="read-more" @click="getRankData()">
          查看更多
          <div class="down-img">
            <img src="@/assets/images/shop_drop_down_b@2x.png" alt="">
          </div>
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
import { mapActions } from 'vuex'
import SmallTitle from '@/components/SmallTitle'
import HeaderSort from '@/components/HeaderSort'
import NavbarTop from '@/components/NavbarTop'
export default {
  name: "shopReport",
  components:{
    SmallTitle,
    HeaderSort,
    NavbarTop,
    // FloatingBox,
    // VueDataLoading,
    // LoadingBox,
    // Toast,
    // Shade,
    // AddGoods
  },
  data() {
    return {
      defaultSrc: 'this.src="' + require('@/assets/images/bitmap.png')
            + '"',
      cards:[],
      reload: true,

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
      kinds:[
        {
          name:'美妆护理'
        },
        {
          name:'美妆护理'
        },
        {
          name:'美妆护理'
        },
        {
          name:'美妆护理'
        },
        {
          name:'美妆护理'
        },
        {
          name:'美妆护理'
        },
        {
          name:'美妆护理'
        },
        {
          name:'美妆护理'
        },
      ],
      items:[
        
      ],
      data: {
        salesRank: 1,
        revenueRank: 5,
        strike: 642.32,
        strikeNum: 102,
        gross: 212.09,
        netProfit: 143.43,
        kinds: 102,
        remainingNums: 69876,
        mprate: '105%',
        sinkToPin: 2
      },
      compareGoods: [
        {
          icon: '',
        },{
          icon: '',
        },{
          icon: '',
        },{
          icon: '',
        }
      ],
    }
  },
  watch:{
    '$route.params.type':{
      handler(val){
        console.debug(val);
        // this.loading = true;
        this.reload = true;
        this.getRankData();
      }
    }
  },
  created(){
    this.getRankData();
    this.getMateData();
  },
  methods: {
    ...mapActions([
      'REQUEST_API'
    ]),
    goToClassifiedData(){
      console.warn('1123');
      this.$router.push({name:'classifiedData'});
    },
    goToShopData(){
      this.$router.push({name:'shopData'});
    },
    goToHistoryRecord(){
      this.$router.push({name:'historyRecord'});
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
    getRankData(){
      this.REQUEST_API({
        api: 'getRankList',
        params: {}
      })
      .then((res) => {
        console.log(res);
        if(res  && res.cards.length > 0){
          if(this.reload){
            this.cards =  res.cards; 
          }else{
            this.cards = [].concat(this.cards,res.cards);

          }

        // }else{
        //   this.completed = true;
        }
        console.warn('加载结束');
        // this.loading = false;
        this.reload = false;
      })
      .catch((err) => {
        console.debug('列表数据异常：', err);
      });
    },
    goToDetail(id){
      console.log(id);
      this.$router.push({name:'goodsDetail',query:{id:id}});
    },
    handlePop(val){
      console.warn(val);
      this.shadeVisible = val;
      if(!val){
        this.loading = true;
        this.reload = true;
        this.getRankData();
      }
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
      // this.$router.push({
      //   path: '/'
      // });
    },
  }
}
</script>

<style lang="stylus" scoped src="../stock/ShopStock.styl"></style>
<style scoped lang="stylus" src="./ShopReport.styl"></style>