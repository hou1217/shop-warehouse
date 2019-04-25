<template>
  <div class="container container_compare-select">
    <!-- todo 替换为通用组件 -->
    <div class="hd">
      <div class="back-btn" @click="$router.go(-1)">
        <img src="@/assets/images/h5_arrow_back@2x.png">
      </div>
      <div class="text">选择对比分类</div>
      <div class="complete-btn" @click="complete()">
        完成
      </div>
    </div>
    <div class="bd">
      <div class="search-box">
        <div class="icon">
          <img src="@/assets/images/search_b@2x.png">
        </div>
        <input class="search-input"
               v-model="keyword"
               placeholder="搜索商品">
      </div>
      <div class="category-box">
        <div class="category"
             :class="{active: categoryIndex === currentCategoryIndex}"
             v-for="(category, categoryIndex) in categories"
             :key="categoryIndex"
             @click.stop="selectCategory(category, categoryIndex)">
          {{category}}
          <div class="hasItem"></div>
        </div>
      </div>
      <div class="list-box">
        <div class="goods-box"
             v-for="(list, listKey, listIndex) in goods"
             :key="listIndex">
          <div class="goods-box__hd">{{listKey}}</div>
          <div class="goods-box__bd">
            <div class="goods"
                 :class="{ nm: (goodsIndex + 1) % 4 === 0 }"
                 v-for="(goods, goodsIndex) in list"
                 :key="goodsIndex">
              <div class="image">
                <img :src="goods.image">
                <div class="select-btn"
                     :class="{selected: selected.indexOf(goods) > -1}"
                     @click="select(goods)">
                  {{selected.indexOf(goods) > -1 ?
                  selected.indexOf(goods) + 1 : ''}}
                </div>
              </div>
              <div class="name">{{goods.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus'
export default {
  name: "CompareSelect",
  data() {
    return {
      keyword: '',
      currentCategoryIndex: 0,
      categories: ['特价套餐','湃客咖啡','冷藏乳饮','面包甜点'],
      goods: {
        '早餐': [
          {
            name: '商品1',
            image: require('@/assets/images/demo/goods_1.png'),
            id: '1'
          },{
            name: '商品2',
            image: require('@/assets/images/demo/goods_2.png'),
            id: '2'
          },{
            name: '商品3',
            image: require('@/assets/images/demo/goods_3.png'),
            id: '3'
          }
        ],
        '午餐': [
          {
            name: '商品4',
            image: require('@/assets/images/demo/goods_4.png'),
            id: '4'
          },{
            name: '商品5',
            image: require('@/assets/images/demo/goods_5.png'),
            id: '5'
          },{
            name: '商品6',
            image: require('@/assets/images/demo/goods_6.png'),
            id: '6'
          },{
            name: '商品7',
            image: require('@/assets/images/demo/goods_7.png'),
            id: '7'
          },{
            name: '商品8',
            image: require('@/assets/images/demo/goods_8.png'),
            id: '8'
          },{
            name: '商品9',
            image: require('@/assets/images/demo/goods_9.png'),
            id: '9'
          },{
            name: '商品10',
            image: require('@/assets/images/demo/goods_10.png'),
            id: '10'
          },{
            name: '商品11',
            image: require('@/assets/images/demo/goods_11.png'),
            id: '11'
          }
        ]
      },
      selected: []
    }
  },
  destroyed(){
    eventBus.$emit('selectCompareGoods',this.selected);
  },
  methods: {
    // 切换分类
    selectCategory(category, index) {
      console.debug('切换分类');
      this.currentCategoryIndex = index;
    },
    
    // 选择商品
    select(goods) {
      console.debug('选择商品');
      // console.debug(goods);
      if (this.selected.indexOf(goods) > -1) {
        let index = this.selected.indexOf(goods);
        this.selected.splice(index, 1);
      } else {
        this.selected.push(goods);
      }
      // console.log(this.selected);
    },
    complete(){
      // console.log(this.selected);
      
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="stylus" src="./CompareSelect.styl"></style>
