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
          <img :src="imgSrc(goods.id)">
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
              <div class="num">{{goods.num ? goods.num : 1}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import eventBus from '@/assets/js/eventBus'
  export default {
    name: "PurchaseOrderList",
    data() {
      return {
        // goodsList: [
        //   {
        //     image: require('@/assets/images/demo/goods_1.png'),
        //     name: '商品名称商品名称商商品名称商品名称商名称商品名称商品名称商名称…',
        //     price: 8.5,
        //     num: 54,
        //     id: '1',
        //     countLess: true,
        //     activity: [],
        //     specifications: '商规格商品规格规商品规格商品规格商品规格…'
        //   },{
        //     image: require('@/assets/images/demo/goods_2.png'),
        //     name: '商品名称商品名称商商品名称商品名称商名称商品名称商品名称商名称…',
        //     price: 8.5,
        //     num: 9,
        //     id: '2',
        //     countLess: false,
        //     activity: ['满25减5', '新品上市第二件半价'],
        //     specifications: '商规格商品规格规商品'
        //   },{
        //     image: require('@/assets/images/demo/goods_3.png'),
        //     name: '商品名称商品名称商商',
        //     price: 58.4,
        //     num: 54,
        //     id: '3',
        //     countLess: true,
        //     activity: [],
        //     specifications: '商规格商品规格规商品规格'
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
      eventBus.$on('goodsIds', this.getGoodsIds);
    },
    methods: {
      ...mapActions([
        'REQUEST_API'
      ]),
      
      // 接收获取到的商品id
      getGoodsIds(data) {
        console.debug('getGoodsIds');
        console.debug(data);
        this.getGoodsDetails(data);
      },
      
      // 获取商品详情列表
      getGoodsDetails(data) {
        this.REQUEST_API({
          api: 'getGoodsDetails',
          params: {
            ids: data
          }
        }).then(res => {
          console.debug('获取商品详情列表成功');
          console.debug(res);
          for (let item of res.data) {
            this.goodsList.push(item);
          }
        }).catch(err => {
          console.debug('获取商品详情列表出错', err);
        });
      },
    }
  }
</script>

<style scoped lang="stylus" src="./PurchaseOrderList.styl"></style>
