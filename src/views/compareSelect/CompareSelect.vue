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
          <div class="goods-box__hd">{{listKey + '(' + list.length + ')'}}</div>
          <div class="goods-box__bd">
            <!--,
                  disabled: isSelected(goods.id)-->
            <div class="goods"
                 :class="{
                  nm: (goodsIndex + 1) % 4 === 0,
                  disabled: goods.selected
                 }"
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
    
    <!-- 提示 -->
    <toast :toast-visible="tipData.visible"
           :toast-data="{icon: null, msg: tipData.message}"></toast>
  </div>
</template>

<script>
import eventBus from '@/assets/js/eventBus'
import Toast from '@/components/common/Toast'
import { ReportApi } from "../../service/ReportApi";

export default {
  name: "CompareSelect",
  components: {
    Toast
  },
  data() {
    return {
      keyword: '',
      currentCategoryIndex: 0,
      categories: ['特价套餐','湃客咖啡','冷藏乳饮','面包甜点'],
      // goods: {
      //   '早餐': [
      //     {
      //       name: '商品1',
      //       image: require('@/assets/images/demo/goods_1.png'),
      //       id: '1'
      //     },{
      //       name: '商品2',
      //       image: require('@/assets/images/demo/goods_2.png'),
      //       id: '2'
      //     },{
      //       name: '商品3',
      //       image: require('@/assets/images/demo/goods_3.png'),
      //       id: '3'
      //     }
      //   ],
      //   '午餐': [
      //     {
      //       name: '商品4',
      //       image: require('@/assets/images/demo/goods_4.png'),
      //       id: '4'
      //     },{
      //       name: '商品5',
      //       image: require('@/assets/images/demo/goods_5.png'),
      //       id: '5'
      //     },{
      //       name: '商品6',
      //       image: require('@/assets/images/demo/goods_6.png'),
      //       id: '6'
      //     },{
      //       name: '商品7',
      //       image: require('@/assets/images/demo/goods_7.png'),
      //       id: '7'
      //     },{
      //       name: '商品8',
      //       image: require('@/assets/images/demo/goods_8.png'),
      //       id: '8'
      //     },{
      //       name: '商品9',
      //       image: require('@/assets/images/demo/goods_9.png'),
      //       id: '9'
      //     },{
      //       name: '商品10',
      //       image: require('@/assets/images/demo/goods_10.png'),
      //       id: '10'
      //     },{
      //       name: '商品11',
      //       image: require('@/assets/images/demo/goods_11.png'),
      //       id: '11'
      //     }
      //   ]
      // },
      goods: {},
      selected: [],
      hasSelected: [],
      tipData: {
        visible: false,
        message: ''
      },
  
      // 测试数据
      testData: {
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
  
      transitiveData: [],
      selectedNum: 0,  // 已选择的商品数量
    }
  },
  created() {
    eventBus.$on('selectedCompareGoods', this.comparedGoods);
    // this.getGoodsListData();
  },
  mounted() {
  //   console.debug('mounted');
  //   eventBus.$on('selectedCompareGoods', this.comparedGoods);
    this.getGoodsListData();
  },
  beforeDestroy() {
    eventBus.$off("selectedCompareGoods", this.comparedGoods)
  },
  destroyed(){
    eventBus.$emit('selectCompareGoods',this.transitiveData);
  },
  methods: {
    // 切换分类
    selectCategory(category, index) {
      // console.debug('切换分类');
      this.currentCategoryIndex = index;
    },
    
    // 选择商品
    select(goods) {
      // console.debug('选择商品');
      // console.debug(goods);
      if (goods.selected) {
        return false;
      }
      
      if (this.selected.indexOf(goods) > -1) {
        let index = this.selected.indexOf(goods);
        this.selected.splice(index, 1);
        // this.canSelect = true;
        this.selectedNum--;
      } else {
        // 最多只能选择3个
        if (this.selectedNum >= 3) {
          this.tipData.message = '已超出可选范围';
          this.tipData.visible = true;
          setTimeout(() => {
            this.tipData.visible = false;
            this.tipData.message = '';
          }, 2000);
          return false;
        }
        this.selected.push(goods);
        this.selectedNum++;
      }
    },
    complete(){
      let that = this;
      // for (let key in this.goods) {
      //   for (let item of this.goods[key]) {
      //     if (item.selected) {
      //       that.transitiveData.push(item);
      //     }
      //   }
      // }
      
      for (let item of this.selected) {
        that.transitiveData.push(item);
      }
      
      // console.debug(this.transitiveData);
      this.$router.go(-1);
    },
    
    // 处理已参加对比的商品
    comparedGoods(data) {
      console.debug('comparedGoods');
      console.debug(data);
      console.debug(this.goods);
      // 获得已选择过的商品列表data
      // this.hasSelected = data;
      this.selectedNum = data.length;  // 获取已选商品数量
      
      for (let item of data) {  // 将已选商品存入需要传递的参数列表
        this.transitiveData.push(item);
      }
      // for (let key in this.goods) {  // 修改已选商品选中状态
      //   console.debug(key);
      //   for (let item of data) {
      //     this.goods[key] = this.goods[key].map(d => {
      //       if (d.id === item.id) {
      //         d.selected = true;
      //       }
      //       return d;
      //     });
      //   }
      // }
      
      console.debug(this.goods);
      this.$forceUpdate();
    },
    
    isSelected(id) {
      // console.debug('isSelected');
      // console.debug(this.hasSelected);
      // console.debug(id);
      for (let i = 0; i < this.hasSelected.length; i++) {
        if (this.hasSelected[i].id === id) {
          console.debug('hasSelected.id');
          return true;
        } else {
          if (i === this.hasSelected.length - 1) {
            return false;
          }
        }
      }
    },
    
    // 获取数据
    getGoodsListData() {
      console.debug('getGoodsListData');
      let that = this;
      // 获取到数据
      // if (this.testData) {
      //
      //   // 处理获取到的数据，给每个数据添加selected属性
      //   for (let key in this.testData) {
      //     this.goods[key] = this.testData[key].map(item => {
      //       item.selected = false;
      //       return item;
      //     });
      //   }
      //
      //   console.debug(this.goods);
      // }
      
      ReportApi.getCompareGoodsList().then((res) => {
        console.debug(res.data);
        console.debug(that.transitiveData);
        if (res.data) {
          
          Object.assign(that.goods, res.data);
          
          for (let key in that.goods) {
            for (let item of that.transitiveData) {
              that.goods[key] = that.goods[key].map(d => {
                if (d.id === item.id) {
                  d.selected = true;
                }
                return d;
              });
            }
          }
          
          // for (let key in res.data) {
          //   // for (let item of that.transitiveData) {
          //   //   console.debug(item);
          //   //   that.goods[key] = res.data[key].map(d => {
          //   //     if (d.id === item.id) {
          //   //       d.selected = true;
          //   //     }
          //   //     console.debug(d);
          //   //     return d;
          //   //   });
          //   // }
          //
          //   // this.goods[key] = res.data[key].map(item => {
          //   //   item.selected = false;
          //   //   return item;
          //   // });
          //
          //   this.goods[key] = res.data[key].map(item => {
          //     // for (let d )
          //     return item;
          //   });
          // }
        }
        console.debug(this.goods);
        this.$forceUpdate();
      }).catch((err) => {
        console.debug('获取对比商品列表出错', err);
      });
    },
  }
}
</script>

<style scoped lang="stylus" src="./CompareSelect.styl"></style>
