<template>
  <div class="container container_shop-order">
    <!-- todo 替换为通用组件 -->
    <div class="hd">
      <div class="back-btn" @click="$router.go(-1)">
        <img src="@/assets/images/h5_arrow_back@2x.png"/>
      </div>
      <div class="text">店铺订单</div>
      <div class="search-btn">
        <img src="@/assets/images/shop_search@2x.png">
      </div>
    </div>
    
    <div class="tabbar">
      <div class="tab"
           :class="{ active: currentTabIndex === tabIndex }"
           v-for="(tab, tabIndex) in tabs"
           :key="tabIndex"
           @click.stop="tabClick(tab, tabIndex)">
        {{tab.label}}
        <div class="num" v-if="tab.num">{{tab.num}}</div>
        <div class="bb"></div>
      </div>
    </div>
    
    <div class="bd">
      <div class="order-box"
           v-for="(order, orderIndex) in orderList"
           :key="orderIndex">
        <div v-if="currentTabIndex === 0" class="status">{{order.status}}</div>
        <div class="goods-list"
             @click.stop="turnToDetail(order.id)">
          <div class="goods"
               v-for="(goods, goodsIndex) in order.goodsList"
               :key="goodsIndex">
            <img :src="goods.image" :onerror="defaultSrc">
          </div>
        </div>
        <div class="goods-num">
          共{{order.goodsNum}}件
        </div>
        <div class="btn-box">
          <div v-if="order.status === '等待仓库确认'" class="btn btn_edit">订单修改</div>
          <div v-if="order.status === '等待仓库确认' || order.status === '仓库已确认'"
               class="btn btn_cancel">
            申请撤单
          </div>
          <div v-else class="btn btn_service">申请售后</div>
          <div v-if="order.status === '仓库已发货' || order.status === '订单已完成'"
               class="btn btn_another">
            再次下单
          </div>
          <div v-else class="btn btn_remind">提醒发货</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShopOrder",
    data() {
      return {
        tabs: [{
          label: '全部',
          value: 'all'
        },{
          label: '待确认',
          value: 'confirm',
          num: 6
        },{
          label: '待发货',
          value: 'send',
          num: 0
        },{
          label: '待收货',
          value: 'receive',
          num: 6
        },{
          label: '售后',
          value: 'service',
          num: 0
        }],
        currentTabIndex: 0,
        orderList: [],
        testData: [
          [{
            status: '等待仓库确认',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')},
                  {image: require('@/assets/images/demo/goods_3.png')},
                  {image: require('@/assets/images/demo/goods_4.png')},
                  {image: require('@/assets/images/demo/goods_5.png')}],
            goodsNum: 15,
            id: '1'
          },{
            status: '仓库已确认',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')}],
            goodsNum: 2,
            id: '1'
          },{
            status: '仓库已发货',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')},
                  {image: require('@/assets/images/demo/goods_3.png')},
                  {image: require('@/assets/images/demo/goods_4.png')},
                  {image: require('@/assets/images/demo/goods_5.png')}],
            goodsNum: 15,
            id: '1'
          },{
            status: '订单已完成',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')},
                  {image: require('@/assets/images/demo/goods_3.png')},
                  {image: require('@/assets/images/demo/goods_4.png')},
                  {image: require('@/assets/images/demo/goods_5.png')}],
            goodsNum: 15,
            id: '1'
          }],
          [{
            status: '等待仓库确认',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')},
                  {image: require('@/assets/images/demo/goods_3.png')},
                  {image: require('@/assets/images/demo/goods_4.png')},
                  {image: require('@/assets/images/demo/goods_5.png')}],
            goodsNum: 15,
            id: '1'
          },{
            status: '仓库已确认',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')}],
            goodsNum: 2,
            id: '1'
          }],
          [{
            status: '等待仓库确认',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')},
                  {image: require('@/assets/images/demo/goods_3.png')},
                  {image: require('@/assets/images/demo/goods_4.png')},
                  {image: require('@/assets/images/demo/goods_5.png')}],
            goodsNum: 15,
            id: '1'
          }],
          [{
            status: '等待仓库确认',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')},
                  {image: require('@/assets/images/demo/goods_3.png')},
                  {image: require('@/assets/images/demo/goods_4.png')},
                  {image: require('@/assets/images/demo/goods_5.png')}],
            goodsNum: 15,
            id: '1'
          },{
            status: '仓库已确认',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')}],
            goodsNum: 2,
            id: '1'
          },{
            status: '仓库已发货',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')},
                  {image: require('@/assets/images/demo/goods_3.png')},
                  {image: require('@/assets/images/demo/goods_4.png')},
                  {image: require('@/assets/images/demo/goods_5.png')}],
            goodsNum: 15,
            id: '1'
          }],
          [{
            status: '等待仓库确认',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')},
                  {image: require('@/assets/images/demo/goods_3.png')},
                  {image: require('@/assets/images/demo/goods_4.png')},
                  {image: require('@/assets/images/demo/goods_5.png')}],
            goodsNum: 15,
            id: '1'
          },{
            status: '仓库已确认',
            goodsList:
                [{image: require('@/assets/images/demo/goods_1.png')},
                  {image: require('@/assets/images/demo/goods_2.png')}],
            goodsNum: 2,
            id: '1'
          }]
        ],
        
        defaultSrc: 'this.src="' + require('@/assets/images/bitmap.png')
            + '"'
      }
    },
    created() {
      // console.debug(this.defaultSrc);
      for (let item of this.testData[this.currentTabIndex]) {
        this.orderList.push(item);
      }
    },
    methods: {
      // 选择订单类型
      tabClick(tab, index) {
        console.debug(tab.label);
        console.debug(tab.value);
        this.currentTabIndex = index;
        this.orderList = [];
        // 测试
        for (let item of this.testData[this.currentTabIndex]) {
          this.orderList.push(item);
        }
      },
      
      // 跳转订单详情
      turnToDetail(id) {
        this.$router.push({
          path: '/purchaseOrderDetail',
          query: {
            orderId: id
          }
        });
      },
      
      // 获取订单列表
      getOrderListData() {
      
      },
    }
  }
</script>

<style scoped lang="stylus" src="./ShopOrder.styl"></style>
