<template>
  <div class="container">
    <NavbarLeft/>

    <div class=goods-category >
      <div class="category-title">
        <ul>
          <li
            v-for="(item,index) in titles"
            :key="index"
            :class="{active: currentIndex === index}"
            @click.stop="selectCategory(item, index)">
            {{item.name}}
          </li>
        </ul>
        <div class="btn-shadow" @click="clickHandler">
          <div class="btn-more">
            <img src="@/assets/images/shop_drop_down@2x.png" alt="">
          </div>
        </div>
      </div>
      
      <div class="goods-detail" ref="wrapper">
        <div>
          <div
            v-for="(item) in details"
            :key="item.title"
            :ref="item.title"
            class="detail-box">
            <div class="title">{{item.title}}</div>
            <div v-for="(oitem) in item.value"
              :key="oitem.id"
              class="list-item">
              
              <div class="portrait">
                <img src="@/assets/images/demo/goods_3.png" :onerror="defaultSrc"/>
              </div>
              <div class="content">
                <h3>{{oitem.name}}</h3>
                <div class="good-num">
                  <span>好评{{oitem.goodNum}}%</span>
                  <span>月销{{oitem.monthNum}}</span>
                </div>
                <div class="price">
                  ¥{{oitem.price}}
                </div>
                <div class="labels">
                  <div v-for="label in  oitem.labels" :key="label" class="label">
                    {{label}}
                  </div>
                </div>
                <div class="add-goods-btn">
                  <img src="@/assets/images/shop_addgoods@2x.png" alt="">
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <!-- 遮罩层 -->
        <div class="goods-shade" ref="shade" v-if="shadeVisible"></div>
        <!-- 选项下拉弹窗 -->
        <div class="category-popup" v-if="titlePopupVisible">
          <div class="title">
            <span>全部分类</span>
            <div class="close-btn" @click="clickHandler">
              <div class="icon">
                <img src="@/assets/images/shop_drop_up@2x.png"/>
              </div>
            </div>
          </div>
          <ul>
            <li v-for="(title, titleIndex) in titles"
                :class="{
                  active: currentIndex === titleIndex,
                  nm: (titleIndex + 1) % 3 === 0
                }"
                :key="titleIndex" @click="selectCategory(title, titleIndex)">
              {{title.name}}
            </li>
          </ul>
        </div>
        <!-- <ul>
          <li v-for="(title, titleIndex) in titles"
              :class="{
                active: currentIndex === titleIndex,
                nm: (titleIndex + 1) % 3 === 0
              }"
              :key="titleIndex" @click="selectCategory(title, titleIndex)">
            {{title.name}}
          </li>
        </ul> -->
      </div>
    </div>
    
    
    <!-- 加载中 -->
    <LoadingBox v-if="loading"/>
    <!-- 店铺仓库入口 -->
    <div class="shop-stock" @click="goToShopStock">
      <img src="@/assets/images/shop_warehouse@2x.png" alt="">
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import LoadingBox from '@/components/common/LoadingBox'
import NavbarLeft from '@/components/NavbarLeft'
import Bscroll from 'better-scroll'
export default {
  components: {
    NavbarLeft,
    LoadingBox
  },
  data(){
    return{
      currentIndex: 0,
      loading: true,
      defaultSrc: 'this.src="' + require('@/assets/images/bitmap.png')
          + '"',
      scroll: null,
      titles:[
        {
          id:1,
          name:'饮用水'
        },
        {
          id:2,
          name:'茶饮料'
        },
        {
          id:3,
          name:'碳酸饮料'
        },
        {
          id:4,
          name:'果汁'
        },
        {
          id:5,
          name:'牛奶'
        },
        {
          id:6,
          name:'其他'
        }
      ],
      details:[
        
      ],
      titlePopupVisible: false,
      shadeVisible: false,
      
      listHeight: []
    }
  },
  watch:{
    '$route.params.type':{
      handler(val){
        console.log(val);
        this.loading = true;
        this.details = [];
        this.getListData();
      }
    }
  },
  created(){
    console.log(this.$route.params);
    this.getListData();
  },
  mounted(){
    if (this.$refs.wrapper) {
      // console.log(this.$refs.wrapper);
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true,
        probeType: 2
      });
    }
    
    // this.scroll.on('scroll', (e) => {
    //   console.debug(e);
    // })
  
    let nodeList = document.querySelectorAll('.detail-box');
    let listHeight = [];
    for (let item of nodeList) {
      listHeight.push(item.offsetTop - 36);
    }
  
    this.scroll.on('scroll', (pos) => {
      const y = pos.y;

      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if (-y >= height1 && -y < height2) {
          this.currentIndex = i
        }
      }
    });
  },
  methods:{
    ...mapActions([
      'REQUEST_API'
    ]),
    goToShopStock(){
      this.$router.push({name:'stock',params:{type:1}});
    },
    clickHandler(){
      console.debug('clickHandler');
      this.shadeVisible = !this.shadeVisible;
      this.titlePopupVisible = !this.titlePopupVisible;
    },
    
    // 点击分类
    selectCategory(category, index) {
      console.debug('selectCategory');
      if (this.$refs[category.name]) {
        const element = this.$refs[category.name][0];
        this.scroll.scrollToElement(element);
      }
      this.currentIndex = index;
      if (this.shadeVisible && this.titlePopupVisible) {
        this.shadeVisible = !this.shadeVisible;
        this.titlePopupVisible = !this.titlePopupVisible;
      }
    },
    getListData(){
      this.REQUEST_API({
        api: 'getCategoryList',
        params: {}
      })
      .then((res) => {
        console.log(res);
        if(res  && res.cards.length > 0){
          this.details =  res.cards;
        }
        console.warn('加载结束');
        this.loading = false;
        // this.reload = false;
      })
      .catch((err) => {
        console.debug('列表数据异常：', err);
      });
    }
  }
}
</script>
<style lang="stylus" scoped src="./GoodsCategory.styl"></style>


