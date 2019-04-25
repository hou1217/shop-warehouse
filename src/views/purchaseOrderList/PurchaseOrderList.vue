<template>
  <div class="container container_purchase-order-list">
    <!-- todo 替换为通用组件 -->
    <div class="hd">
      <div class="back-btn" @click="$router.go(-1)">
        <img src="@/assets/images/h5_arrow_back@2x.png">
      </div>
      <div class="text">进货清单</div>
    </div>
    
    <div class="bd">
      <div class="goods-box"
           v-for="(goods, goodsIndex) in goodsList"
           :key="goodsIndex">
        <div class="goods-img">
          <!--<img :src="goods.image">-->
        </div>
        <div class="goods-detail">
          <div class="name">{{goods.name}}</div>
          <div class="specifications">
            {{goods.specifications}}
          </div>
          <div class="option">
            <div class="price">
              <div class="icon">
                <img src="@/assets/images/shop_money@2x.png">
              </div>
              <div class="num">{{goods.price}}</div>
            </div>
            <div class="amount">
              <div class="icon">×</div>
              <div class="num">{{goods.num}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PurchaseOrderList",
    data() {
      return {
        goodsList: [
          {
            image: '',
            name: '商品名称商品名称商商品名称商品名称商名称商品名称商品名称商名称…',
            price: 8.5,
            num: 54,
            id: '1',
            countLess: true,
            activity: [],
            specifications: '商规格商品规格规商品规格商品规格商品规格…'
          },{
            image: '',
            name: '商品名称商品名称商商品名称商品名称商名称商品名称商品名称商名称…',
            price: 8.5,
            num: 9,
            id: '2',
            countLess: false,
            activity: ['满25减5', '新品上市第二件半价'],
            specifications: '商规格商品规格规商品'
          },{
            image: '',
            name: '商品名称商品名称商商',
            price: 58.4,
            num: 54,
            id: '3',
            countLess: true,
            activity: [],
            specifications: '商规格商品规格规商品规格'
          }
        ],
        selectedList: [],
        tipVisible: false,
        tipData: {
          icon: null,
          msg: ''
        }
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" src="./PurchaseOrderList.styl"></style>
