<template>
  <div class="container" ref="infoBot">
    <!-- 标题 -->
    <HeaderTitle :title="'商品总仓'"/>
    <!-- 筛选排序 -->
    <HeaderSort @PopupVisible="handlePop"/>  
    <!-- 类别分类 -->
    <NavbarTop />
    <!-- 悬浮框 -->
    <FloatingBox />
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
    <!-- <AddGoods 
      :addGoodsVisible="addGoodsVisible"
      @addGoodsVisibleHandler="addGoodsVisibleHandler"/> -->
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
          :key="index">
          <div class="card">
            <div class="portrait">
              <img src="@/assets/images/demo2.png" :onerror="defaultSrc"/>
              <div class="addgoods" @click="addgoods()">
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
                <span>今日销售{{card.salesNum}}</span>
              </div>
              <div class="sales-num">
                <span>毛利¥{{card.profit}}</span>
                <span class="stock" :class="{red:card.stockNum < 10}">库存{{card.stockNum}}</span>
              </div>
              <div class="labels">
                <div class="icon">
                  <img src="@/assets/images/icon/shop_activity@2x.png" alt="">
                </div>
                <div v-for="(label,index) in  card.labels" 
                  :key="index" 
                  class="label pink">
                  {{label}}
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
      </vue-data-loading>
    </div>
  </div>
</template>
<script>
import eventBus from '@/assets/js/eventBus'
import { mapActions } from 'vuex'
import LoadingBox from '@/components/common/LoadingBox'
import Toast from '@/components/common/Toast'
import Shade from '@/components/common/Shade'
// import AddGoods from './children/AddGoods'
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
    Shade
  },
  data(){
    return{
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
      reload: false,
      completed: false,
      offset: -110,
      shadeVisible:false
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
  methods:{
    ...mapActions([
      'REQUEST_API'
    ]),
    handleShadeClick(){
      console.warn("点击遮罩区域");
      eventBus.$emit('define');
    },
    addGoodsVisibleHandler(){
      this.shadeVisible = false;

      this.addGoodsVisible = false;
    },
    addgoods(){
      this.shadeVisible = true;

      this.addGoodsVisible = true;
    },
    handlePop(val){
      console.warn(val);
      this.shadeVisible = val;
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
        api: 'getStockList',
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
    }
  }
}
</script>

<style lang="stylus" scoped src="./ShopStock.styl"></style>

