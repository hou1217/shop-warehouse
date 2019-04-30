<template>
  <div class="container container_purchase-order-confirm">
    <!-- todo 替换为通用组件 -->
    <div class="hd">
      <div class="back-btn" @click="$router.go(-1)">
        <img src="@/assets/images/h5_arrow_back@2x.png">
      </div>
      <div class="text">确认订单</div>
    </div>
    
    <div class="bd">
      <div class="consignee-info">
        <div class="consignee">
          <div class="consignee__name">{{consignee.name}}</div>
          <div class="consignee__phone">{{consignee.phone}}</div>
        </div>
        <div class="address">
          <div class="text">{{consignee.address}}</div>
          <div class="next-btn">
            <img src="@/assets/images/arrow_enter_g@2x.png">
          </div>
        </div>
      </div>
      <div class="goods-info">
        <div class="goods-list">
          <div class="goods"
               v-for="(goods, goodsIndex) in goodsList"
               :key="goodsIndex">
            <img :src="imgSrc(goods.id)">
          </div>
          <div class="goods goods_more">
            <div class="text">共{{goodsList.length}}件</div>
            <div class="icon">
              <img src="@/assets/images/arrow_enter_g@2x.png">
            </div>
          </div>
        </div>
      </div>
      <div class="dispatch-info">
        <div class="character">配送时间</div>
        <div class="detail">
          <div class="time">
            {{dispatchData.date + '&nbsp;' + dispatchData.timeRange}}
          </div>
          <div class="icon">
            <img src="@/assets/images/arrow_enter_g@2x.png">
          </div>
        </div>
      </div>
      <div class="leave-message">
        <div class="character">店长留言</div>
        <textarea contenteditable
                  placeholder="建议留言前先与仓库沟通确认"
                  v-model="message"></textarea>
      </div>
    </div>
    
    <div class="confirm-btn"
         ref="confirmButton"
         @click.stop="orderConfirm">
      确认下单
    </div>
  </div>
</template>

<script>
  import store from '@/store/index'
  import eventBus from '@/assets/js/eventBus'
  import { mapActions } from 'vuex'
  export default {
    name: "PurchaseOrderConfirm",
    data() {
      return {
        consignee: {
          name: store.state.userData.nickname,
          phone: store.state.userData.phone,
          address: store.state.userData.address
        },
        // goodsList: [
        //   {
        //     image: require('@/assets/images/demo/goods_1.png')
        //   },{
        //     image: require('@/assets/images/demo/goods_2.png')
        //   },{
        //     image: require('@/assets/images/demo/goods_3.png')
        //   },{
        //     image: require('@/assets/images/demo/goods_4.png')
        //   }
        // ],
        goodsList: [],
        goodsNum: 15,
        dispatchData: {
          date: '今天',
          timeRange: '10:00-11:00'
        },
        clearPurchase: false,
        message: ''
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
    beforeRouteEnter(to, from, next) {
      console.debug(from);
      if (from.path === '/purchaseOrder') {
        next(vm => {
          console.debug(vm);
          vm.clearPurchase = true;
        });
      } else {
        next();
      }
    },
    created() {
      eventBus.$on('purchaseOrder', this.getData);
    },
    mounted() {
      console.debug('mounted');
      console.debug(document.documentElement.clientHeight);
      let oHeight = document.documentElement.clientHeight;
      let confirmButton = document.querySelector('.confirm-btn');
      window.addEventListener('resize', function (e) {
        if (document.documentElement.clientHeight < oHeight) {
          // alert(document.documentElement.clientHeight);
          confirmButton.classList.add('mt');
        } else {
          confirmButton.classList.remove('mt');
        }
      });
    },
    beforeDestroy() {
      eventBus.$off('purchaseOrder');
    },
    methods: {
      ...mapActions([
        'REQUEST_API'
      ]),
      
      // 确认下单
      orderConfirm() {
        console.debug('确认下单');
        
        // todo 跳转至下单成功页面
        if (this.clearPurchase) {
          console.debug('需要调用购物车结算');
          // 购物车结算
          let goodsIds = [];
          for (let item of this.goodsList) {  // 获取结算商品id
            goodsIds.push(item.id);
          }
          this.REQUEST_API({
            api: 'clearPurchaseOrder',
            params: {
              ids: goodsIds,
              message: this.message
            }
          }).then(res => {
            if (res.status === 200) {
              console.debug('下单成功');
              this.$router.replace({
                path: '/purchaseOrderStatus',
                query: {
                  orderId: res.data.orderId
                }
              });
            }
          }).catch(err => {
            console.error('下单失败', err);
          });
        } else {
          // 立即购买
          this.REQUEST_API({
            api: 'createOrder',
            params: {
              id: this.goodsList[0].id,
              message: this.message
            }
          }).then(res => {
            if (res.status === 200) {
              this.$router.replace({
                path: '/purchaseOrderStatus',
                query: {
                  orderId: res.data.orderId
                }
              });
            }
          }).catch(err => {
            console.error('立即购买出错', err);
          });
        }
        // this.$router.push({
        //   path: '/purchaseOrderStatus'
        // });
      },
      
      // 接收下单的商品
      getData(data) {
        console.debug('getData');
        console.debug(data);
        for (let item of data) {
          this.goodsList.push(item);
        }
      },
    }
  }
</script>

<style scoped lang="stylus" src="./PurchaseOrderConfirm.styl"></style>
