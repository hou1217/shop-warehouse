<template>
  <div class="container container_purchase-order-manage">
    <!-- todo 替换为通用组件 -->
    <div class="hd">
      <div class="back-btn" @click="$router.go(-1)">
        <img src="@/assets/images/h5_arrow_back@2x.png">
      </div>
      <div class="text">进货单</div>
      <div class="location-icon">
        <img src="@/assets/images/shopl_local@2x.png">
      </div>
      <div class="complete-btn" @click="$router.go(-1)">
        完成
      </div>
    </div>
    
    <div class="bd">
      <div class="goods-box"
           v-for="(goods, goodsIndex) in goodsList"
           :key="goodsIndex">
        <div class="select-btn"
             @click="selectGoods(goods)">
          <!--selectedList.indexOf(goods.id) > -1-->
          <img v-if="goods.selected"
               src="@/assets/images/shop_multi_select@2x.png">
          <img v-else src="@/assets/images/shop_multi_unselect@2x.png">
        </div>
        <div class="goods-img">
          <img :src="imgSrc(goods.id)">
        </div>
        <div class="goods-detail">
          <div class="name">{{goods.name}}</div>
          <div class="tip">
            <div class="specifications">
              <div class="text">商品规格</div>
              <div class="icon">
                <img src="@/assets/images/shop_drop_down@2x.png">
              </div>
            </div>
            <div class="count-less-tip" v-if="goods.countLess">库存紧张</div>
          </div>
          <div class="option">
            <div class="price">
              <div class="icon">
                <img src="@/assets/images/shop_money@2x.png">
              </div>
              <div class="num">{{goods.price}}</div>
            </div>
            <div class="num-control">
              <plus-minus></plus-minus>
            </div>
          </div>
          <div class="activities"
               v-if="goods.activity.length">
            <div class="icon">
              <img src="@/assets/images/shop_activity@2x.png">
            </div>
            <div :class="`activity activity_${activityIndex + 1}`"
                 v-for="(activity, activityIndex) in goods.activity"
                 :key="activityIndex">
              {{activity}}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <div class="select-all-btn" @click.stop="selectAll">
        <div class="icon">
          <img v-if="selectedList.length === goodsList.length"
               src="@/assets/images/shop_multi_select@2x.png">
          <img v-else src="@/assets/images/shop_multi_unselect@2x.png">
        </div>
        <div class="text">全选</div>
      </div>
      <div class="collect-btn" @click.stop="collect">
        移入收藏夹
      </div>
      <div class="delete-btn" @click.stop="deleteOrder">
        删除
      </div>
    </div>
    
    <!-- 提示 -->
    <toast :toastVisible="tipVisible" :toastData="tipData"></toast>
  </div>
</template>

<script>
  import PlusMinus from '@/components/common/PlusMinus'
  import Toast from '@/components/common/Toast'
  import store from '@/store/index'
  import eventBus from '@/assets/js/eventBus'
  export default {
    name: "PurchaseOrderManage",
    components: {
      Toast,
      PlusMinus
    },
    data() {
      return {
        // goodsList: [
        //   {
        //     image: require('@/assets/images/demo/goods_1.png'),
        //     name: '商品名称商品名称商商品名称商品名称商名称商品名称商品名称商名称…',
        //     price: 8.5,
        //     num: 34,
        //     id: '1',
        //     countLess: true,
        //     activity: []
        //   },{
        //     image: require('@/assets/images/demo/goods_2.png'),
        //     name: '商品名称商品名称商商品名称商品名称商名称商品名称商品名称商名称…',
        //     price: 8.5,
        //     num: 340,
        //     id: '2',
        //     countLess: false,
        //     activity: ['满25减5', '新品上市第二件半价']
        //   },{
        //     image: require('@/assets/images/demo/goods_3.png'),
        //     name: '商品名称商品名称商商',
        //     price: 58.4,
        //     num: 34,
        //     id: '3',
        //     countLess: true,
        //     activity: []
        //   }
        // ],
        goodsList: [],
        selectedList: [],
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
    created() {
      // eventBus.$on('purchaseOrder', this.getPurchaseOrder);
      this.getPurchaseOrderListData();
    },
    beforeDestroy() {
      // eventBus.$off('purchaseOrder');
    },
    methods: {
      // 全选
      selectAll() {
        this.selectedList = [];
        for (let item of this.goodsList) {
          this.selectedList.push(item);
          item.selected = true;
        }
        this.$forceUpdate();
      },
  
      // 选中商品
      selectGoods(goods) {
        // if (this.selectedList.indexOf(goodsId) > -1) {
        //   let index = this.selectedList.indexOf(goodsId);
        //   this.selectedList.splice(index, 1);
        // } else {
        //   this.selectedList.push(goodsId);
        // }
        if (this.selectedList.length === 0) {
          this.selectedList.push(goods);
        } else {
          for (let i = 0; i < this.selectedList.length; i++) {
            if (this.selectedList[i].id === goods.id) {
              this.selectedList.splice(i, 1);
              break;
            } else {
              if (i === this.selectedList.length - 1) {
                this.selectedList.push(goods);
                break;
              }
            }
          }
        }
        goods.selected = !goods.selected;
        this.$forceUpdate();
      },
  
      // 收藏
      collect() {
        console.debug('收藏');
        console.debug(this.selectedList);
        if (this.selectedList.length === 0) {
          this.tipVisible = true;
          this.tipData.msg = '你还没有选择商品';
          setTimeout(() => {
            this.tipVisible = false;
            this.tipData.msg = '';
          }, 2000);
          return false;
        }
        
        // todo 发起收藏请求
      },
      
      // 删除
      deleteOrder() {
        console.debug('删除订单');
        console.debug(this.selectedList);
        if (this.selectedList.length === 0) {
          this.tipVisible = true;
          this.tipData.msg = '你还没有选择商品';
          setTimeout(() => {
            this.tipVisible = false;
            this.tipData.msg = '';
          }, 2000);
          return false;
        }
        
        // todo 发起删除订单请求
        store.dispatch('deletePurchaseOrder', this.selectedList).then(() => {
          this.getPurchaseOrderListData();
        }).catch(err => {
          console.debug('删除失败', err);
        });
      },
  
      // 获取进货单列表
      getPurchaseOrderListData() {
        store.dispatch('getPurchaseOrderList').then((res) => {
          console.debug('获取进货单列表成功');
          console.debug(res);
          this.goodsList = [];
          if (res.data && res.data.length) {
            Object.assign(this.goodsList, res.data);
            this.goodsList.forEach(item => {
              item['activity'] = [];
              item['activity'].push(item.labels);
              item['selected'] = false;
              return item;
            })
          }
          this.$forceUpdate();
        }).catch(err => {
          console.debug('获取进货单列表出错', err);
        })
      },
    }
  }
</script>

<style scoped lang="stylus" src="./PurchaseOrderManage.styl"></style>
