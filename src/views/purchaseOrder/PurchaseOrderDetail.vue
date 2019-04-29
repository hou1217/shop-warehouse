<template>
  <div class="container container_purchase-order-detail">
    <!-- todo 替换为通用组件 -->
    <div class="hd">
      <div class="back-btn" @click="$router.go(-1)">
        <img src="@/assets/images/h5_arrow_back@2x.png">
      </div>
      <div class="text">订单详情</div>
    </div>
    
    <div class="bd">
      <div class="order-status">
        <div class="icon">
          <img src="@/assets/images/shop_car@2x.png">
        </div>
        <div class="text">{{orderData.isSend ? '仓库已发货' : '等待仓库确认'}}</div>
      </div>
      <div class="consignee-info"
           v-if="orderData.consignee">
        <div class="consignee">
          <div class="consignee__name">{{orderData.consignee.name}}</div>
          <div class="consignee__phone">{{orderData.consignee.phone}}</div>
        </div>
        <div class="address">
          <div class="text">{{orderData.consignee.address}}</div>
          <div class="next-btn">
            <img src="@/assets/images/arrow_enter_g@2x.png">
          </div>
        </div>
      </div>
      <div class="goods-info">
        <div class="goods-list">
          <div class="goods"
               v-for="(goods, goodsIndex) in orderData.goods"
               :key="goodsIndex">
            <img :src="imgSrc(goods.id)">
          </div>
          <div class="goods goods_more" @click.stop="turnToList">
            <div class="text" v-if="orderData.goods">共{{orderData.goods.length}}件</div>
            <div class="icon">
              <img src="@/assets/images/arrow_enter_g@2x.png">
            </div>
          </div>
        </div>
      </div>
      <div class="contact" @click.stop="contactStore">
        <div class="icon">
          <img src="@/assets/images/shop_contact@2x.png">
        </div>
        <div class="text">联系仓库</div>
      </div>
      <div class="leave-message">
        <div class="character">店长留言</div>
        <div class="text">{{orderData.message}}</div>
      </div>
      <div class="order-info">
        <div class="code">
          <div class="character">订单编号</div>
          <div class="text text_code">{{orderData.id}}
            <!--<div class="text">{{orderData.id}}</div>-->
            <div class="icon">
              <img src="@/assets/images/shop_copy@2x.png">
            </div>
          </div>
        </div>
        <div class="create">
          <div class="character">下单时间</div>
          <div class="text">{{orderData.createdAt}}</div>
        </div>
        <div class="dispatch" v-if="orderData.dispatchData">
          <div class="character">配送时间</div>
          <div class="text">
            {{orderData.dispatchData.date + orderData.dispatchData.timeRange}}
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <div class="btn btn_edit" @click.stop="editOrder">订单修改</div>
      <div class="btn btn_cancel" @click.stop="cancelOrder">申请撤单</div>
      <div class="btn btn_remind" @click.stop="remind">提醒发货</div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import eventBus from '@/assets/js/eventBus'
  export default {
    name: "purchaseOrderDetail",
    data() {
      return {
        // orderData: {
        //   id: '123456784843',
        //   createdAt: '2018-09-18 10:39',
        //   isSend: false,
        //   consignee: {
        //     name: '名字名字名字',
        //     phone: '15643223300',
        //     address: '上海浦东新区耀华路488号信建大厦806室上海浦东新区耀华路488号信建大厦806室'
        //   },
        //   goodsList: [
        //     {
        //       image: require('@/assets/images/demo/goods_1.png')
        //     },{
        //       image: require('@/assets/images/demo/goods_2.png')
        //     },{
        //       image: require('@/assets/images/demo/goods_3.png')
        //     },{
        //       image: require('@/assets/images/demo/goods_4.png')
        //     }
        //   ],
        //   goodsNum: 15,
        //   dispatchData: {
        //     date: '今天',
        //     timeRange: '10:00-11:00'
        //   },
        //   message: '我是留言我是留言我是留言我是留言我是留言我是留言我是留言我是留言言我是留言言我是留言言我是留言言我是留'
        // }
        orderData: {}
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
      this.getDetailData();
    },
    destroyed() {
      eventBus.$emit('goodsIds', this.orderData.goods);
    },
    methods: {
      ...mapActions([
        'REQUEST_API'
      ]),
      
      // 联系仓库
      contactStore() {
        console.debug('联系仓库');
      },
      
      // 订单修改
      editOrder() {
        console.debug('订单修改')
      },
      
      // 申请撤单
      cancelOrder() {
        console.debug('申请撤单')
      },
      
      // 提醒发货
      remind() {
        console.debug('提醒发货')
      },
      
      // 跳转至进货清单
      turnToList() {
        this.$router.push({
          path: '/purchaseOrderList'
        });
      },
      
      // 获取订单详情
      getDetailData() {
        this.REQUEST_API({
          api: 'getOrderDetail',
          params: {
            orderId: this.$route.query.orderId
          }
        }).then(res => {
          console.debug('获取订单详情成功');
          console.debug(res);
          Object.assign(this.orderData, res.data);
          
          this.$forceUpdate();
        }).catch(err => {
          console.debug('获取订单详情出错', err);
        });
      },
    }
  }
</script>

<style scoped lang="stylus" src="./PurchaseOrderDetail.styl"></style>
