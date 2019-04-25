<template>
  <div class="container container_compare-select">
    <!-- todo 替换为通用组件 -->
    <div class="hd">
      <div class="back-btn" @click="$router.go(-1)">
        <img src="@/assets/images/h5_arrow_back@2x.png">
      </div>
      <div class="text">选择对比分类</div>
      <div class="complete-btn">
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
                 :class="{
                  nm: (goodsIndex + 1) % 4 === 0,
                  disabled: isSelected
                 }"
                 v-for="(goods, goodsIndex) in list"
                 :key="goodsIndex">
              <div class="image">
                <!--<img :src="goods.image">-->
                <div class="select-btn"
                     :class="{selected: selected.indexOf(goods.id) > -1}"
                     @click="select(goods.id)">
                  {{selected.indexOf(goods.id) > -1 ?
                  selected.indexOf(goods.id) + 1 : ''}}
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
              name: '商品名称商…',
              image: '',
              id: '1'
            },{
              name: '商品名称',
              image: '',
              id: '2'
            },{
              name: '商品名称',
              image: '',
              id: '3'
            }
          ],
          '午餐': [
            {
              name: '商品名称商…',
              image: '',
              id: '4'
            },{
              name: '商品名称',
              image: '',
              id: '5'
            },{
              name: '商品名称',
              image: '',
              id: '6'
            },{
              name: '商品名称',
              image: '',
              id: '7'
            },{
              name: '商品名称商…',
              image: '',
              id: '8'
            },{
              name: '商品名称',
              image: '',
              id: '9'
            },{
              name: '商品名称',
              image: '',
              id: '10'
            },{
              name: '商品名称',
              image: '',
              id: '11'
            }
          ]
        },
        selected: [],
        isSelected: false
      }
    },
    methods: {
      // 切换分类
      selectCategory(category, index) {
        console.debug('切换分类');
        this.currentCategoryIndex = index;
      },
      
      // 选择商品
      select(goodsId) {
        console.debug('选择商品');
        console.debug(goodsId);
        if (this.isSelected) {
          return false;
        }
        if (this.selected.indexOf(goodsId) > -1) {
          let index = this.selected.indexOf(goodsId);
          this.selected.splice(index, 1);
        } else {
          this.selected.push(goodsId);
        }
      }
    }
  }
</script>

<style scoped lang="stylus" src="./CompareSelect.styl"></style>
