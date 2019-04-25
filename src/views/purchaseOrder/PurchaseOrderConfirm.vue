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
            <!--<img :src="goods.image">-->
          </div>
          <div class="goods goods_more">
            <div class="text">共{{goodsNum}}件</div>
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
        <textarea contenteditable placeholder="建议留言前先与仓库沟通确认"/>
      </div>
    </div>
    
    <div class="confirm-btn" @click.stop="orderConfirm">确认下单</div>
  </div>
</template>

<script>
  export default {
    name: "PurchaseOrderConfirm",
    data() {
      return {
        consignee: {
          name: '名字名字名字',
          phone: '15643223300',
          address: '上海浦东新区耀华路488号信建大厦806室上海浦东新区耀华路488号信建大厦806室'
        },
        goodsList: [
          {
            image: ''
          },{
            image: ''
          },{
            image: ''
          },{
            image: ''
          }
        ],
        goodsNum: 15,
        dispatchData: {
          date: '今天',
          timeRange: '10:00-11:00'
        }
      }
    },
    methods: {
      // 确认下单
      orderConfirm() {
        console.debug('确认下单');
        
        // todo 跳转至下单成功页面
        this.$router.push({
          path: '/purchaseOrderStatus'
        });
      },
    }
  }
</script>

<style scoped lang="stylus" src="./PurchaseOrderConfirm.styl"></style>
