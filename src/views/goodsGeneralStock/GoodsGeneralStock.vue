<template>
  <div class="container" ref="infoBot">
    <!-- 标题 -->
    <HeaderTitle :title="'商品总仓'" :name="'stock'"/>
    <!-- 筛选排序 -->
    <HeaderSort @PopupVisible="handlePop"/>
    <!-- 类别分类 -->
    <NavbarTop />
    <!-- 悬浮框 -->
    <FloatingBox :btns="btns"/>
    <!-- 加载中 -->
    <LoadingBox v-if="reload && loading"/>
    <!-- toast -->
    <Toast
      :toastVisible="toastVisible"
      :toastData="toastData"/>
    <!-- 遮罩层 -->
    <Shade
      :shadeVisible="shadeVisible"
      @click.native="handleShadeClick()"/>
    <!-- 快捷补货 -->
    <AddGoods
      :data="goodsData"
      :addGoodsVisible="addGoodsVisible"
      @addGoodsVisibleHandler="addGoodsVisibleHandler"
      @addToPurchase="addToPurchase"
      @goodsNumber="getGoodsNumber"/>
    <!-- 主体盒子 -->
    <div class="main-box" >
      <vue-data-loading
        :loading="loading"
        :completed="completed"
        :listens="['infinite-scroll']"
        :offset="offset"
        @infinite-scroll="infiniteScroll">
        <div
          v-for="(card,index) in cards"
          @click="goToDetail(card.id)"
          :key="index">
          <div class="card">
            <div class="portrait">
              <img :src="imgSrc(card.id)" :onerror="defaultSrc"/>
              <div class="addgoods" @click.stop="addgoods(card)">
                <img
                  :src="card.stockNum < 10?
                  require('@/assets/images/shop_stockgoods@2x.png'):require('@/assets/images/shop_addgoods_s@2x.png')"
                  alt="">
              </div>
            </div>
            <div class="content">
              <h3>{{card.name}}</h3>
              <div class="sales-num">
                <span>售价¥{{card.price}}</span>
                <span>今日销售{{card.salesNumToday}}</span>
              </div>
              <div class="sales-num">
                <span>毛利¥{{card.profit}}</span>
                <span class="stock" :class="{red:card.stockNum < 100}">库存{{card.stockNum}}</span>
              </div>
              <div class="labels">
                <div class="icon">
                  <img src="@/assets/images/icon/shop_activity@2x.png" alt="">
                </div>
                <!-- <div v-for="(label,index) in  card.labels"  -->
                  <!-- :key="index"  -->
                <div
                  class="label pink">
                  {{card.labels}}
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
              <div class="labels" v-if="card.hasGoods">
                <div class="icon">
                  <img src="@/assets/images/icon/shop_shop@2x.png" alt="">
                </div>
                <div class="label">
                  店铺库存 {{card.shopStockNum}}
                </div>
                <div class="label">
                  今日销量 {{card.salesNumToday}}
                </div>
                <div
                  class="drop-btn"
                  @click.stop="handleDrop(card)">
                  <img :src="card.dropVisible?
                    require('@/assets/images/shop_drop_up@2x.png'):require('@/assets/images/shop_drop_down@2x.png')"
                    alt="">
                </div>
              </div>
              <div class="other-data" v-if="card.hasGoods && card.dropVisible">
                <div class="title">店铺数据</div>
                <div class="content">
                  <span>动销率 {{card.props}}%</span>
                  <span>库销比 {{card.ratio}}</span>
                </div>
                <div class="title">相似商品推荐</div>
                <ul class="other-goods">
                  <li
                    v-for="(item,index) in card.otherGoods"
                    :key="index">
                    <img :src="imgSrc(item.id)" alt="">
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </vue-data-loading>
    </div>
    
    <toast :toast-visible="tipVisible" :toast-data="tipData"></toast>
  </div>
</template>
<script>
import eventBus from '@/assets/js/eventBus'
import { mapActions } from 'vuex'
import LoadingBox from '@/components/common/LoadingBox'
import Toast from '@/components/common/Toast'
import Shade from '@/components/common/Shade'
import AddGoods from '@/components/AddGoods'
import HeaderTitle from '@/components/HeaderTitle'
import HeaderSort from '@/components/HeaderSort'
import NavbarTop from '@/components/NavbarTop'
import FloatingBox from '@/components/FloatingBox'
import VueDataLoading from 'vue-data-loading'


export default {
  components:{
    HeaderTitle,
    HeaderSort,
    NavbarTop,
    FloatingBox,
    VueDataLoading,
    LoadingBox,
    Toast,
    Shade,
    AddGoods
  },
  data(){
    return{
      goodsData:{},
      order:'id',
      isAsc:false,
      // 悬浮框数据
      btns:[
        {
          type:'purchaseOrder',
          name:'purchaseOrder',
          url:require('@/assets/images/shop_suspension_warehouse@2x.png')
        },
        {
          type:'order',
          name:'shopOrder',
          url:require('@/assets/images/shop_suspension_order@2x.png')
        },
        {
          type:'report',
          name:'warehouseReport',
          url:require('@/assets/images/shop_suspension_report@2x.png')
        }
      ],
      addGoodsVisible: false,
      toastVisible: false,
      toastData:{
        icon: null,
        msg: '请选择排序属性'
      },
      defaultSrc: 'this.src="' + require('@/assets/images/bitmap.png')
            + '"',
      cards:[
      
      ],
      loading:true,
      reload: true,
      completed: false,
      offset: -110,
      shadeVisible:false,
      tipVisible: false,
      tipData: {
        icon: null,
        msg: ''
      }
    }
  },
  computed:{
    imgSrc(){
      return function(id){
        id = id%16
        return require ('@/assets/images/demo/goods_'+(id)+'.png')
      }
    }
  },
  watch:{
    '$route.params.type':{
      handler(val){
        console.debug(val);
        this.loading = true;
        this.reload = true;
        this.getListData();
      }
    }
  },
  created(){
    this.getListData();
  },
  destroyed() {
    eventBus.$emit('purchaseOrder', [this.goodsData]);
  },
  methods:{
    ...mapActions([
      'REQUEST_API'
    ]),
    goToDetail(id){
      console.log(id);
      this.$router.push({name:'goodsDetail',query:{id:id}});
    },
    handleDrop(card){
      // console.log(card);
      card.dropVisible = !card.dropVisible;
    },
    handleShadeClick(){
      console.warn("点击遮罩区域");
      if(!this.addGoodsVisible){
        eventBus.$emit('define');
      }
    },
    addGoodsVisibleHandler(){
      this.shadeVisible = false;

      this.addGoodsVisible = false;
    },
    addgoods(card){
      this.goodsData = card;
      this.shadeVisible = true;

      this.addGoodsVisible = true;
    },
    handlePop(val){
      console.warn(val);
      this.shadeVisible = val.visible;
      if(val.order){
        this.order = val.order;
      }
      
      this.isAsc = val.isAsc;
      if(!val.visible){
        this.loading = true;
        this.reload = true;
        this.getListData();
      }
    },
    // 触底加载
    infiniteScroll() {
      
      console.warn('触发触底加载方法');
      console.debug(this.completed);
      this.loading = true;
      this.getListData();
    },
    getListData(){
      this.REQUEST_API({
        api: 'getGeneralStockList',
        params: {
          type:this.$route.params.type,
          order:this.order,
          isAsc:this.isAsc
        }
      })
      .then((res) => {
        console.log(res);
        if(res  && res.cards.length > 0){
          if(this.reload){
            this.cards =  res.cards;
          }else{
            this.cards = [].concat(this.cards,res.cards);

          }

        }else{
          this.completed = true;
        }
        console.warn('加载结束');
        this.loading = false;
        this.reload = false;
      })
      .catch((err) => {
        console.debug('列表数据异常：', err);
      });
    },
  
    // 商品添加到进货单
    addToPurchase() {
      console.debug('商品添加到订货单');
      console.debug(this.goodsData);
      // store.commit('setPurchaseOrder', this.goodsData);
      this.REQUEST_API({
        api: 'addGoods',
        params: {
          goodsData: this.goodsData
        }
      }).then(res => {
        if (res.status === 200) {
          // console.debug('添加成功');
          this.tipData.msg = '添加成功';
          this.tipVisible = true;
          setTimeout(() => {
            this.tipVisible = false;
            this.tipData.msg = '';
          }, 2000);
        }
      }).catch(err => {
        console.debug('添加失败', err);
      });
      this.addGoodsVisible = false;
      this.shadeVisible = false;
      this.goodsData = {};
    },
  
    //
    getGoodsNumber(data) {
      console.debug('getGoodsNumber');
      console.debug(data);
      if (this.goodsData) {
        this.goodsData['num'] = data;
      }
    },
  }
}
</script>

<style lang="stylus" scoped src="./GeneralStock.styl"></style>

