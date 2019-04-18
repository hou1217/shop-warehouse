<template>
  <div class="container">
    <NavbarLeft/>
    <div class=goods-category >
      <div class="category-title" 
        @click="clickHandler" 
       >
        <ul>
          <li 
            v-for="(item,index) in titles" 
            :key="index"
            :class="{active: currentIndex === index}">
            {{item.name}}
          </li>
        </ul>
        <div class="btn-shadow">
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
                <img :src="oitem.headId" :onerror="defaultSrc"/>
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
        
      </div>
      
    </div>
  </div>
</template>
<script>
import NavbarLeft from '@/components/NavbarLeft'
import Bscroll from 'better-scroll'
export default {
  components: {
    NavbarLeft,
    
  },
  data(){
    return{
      currentIndex: 0,
      defaultSrc: 'this.src="' + require('@/assets/images/bitmap.png'),
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
        {
          title:'饮用水',
          value:[
            {
              id:1,
              headId:require('@/assets/images/demo1.png'),
              name:'哇哈哈',
              goodNum: 98,
              monthNum: 43,
              price: 39.6,
              labels:[
                "满25减5"
              ]
            },
            {
              id:2,
              headId:require('@/assets/images/demo1.png'),
              name:'农夫山泉',
              goodNum: 98,
              monthNum: 43,
              price: 39.6,
              labels:[
                "满25减5"
              ]
            }
          ]
        },
        {
          title:'茶饮料',
          value:[
            {
              id:3,
              headId:require('@/assets/images/demo1.png'),
              name:'康师傅冰红茶',
              goodNum: 98,
              monthNum: 43,
              price: 39.6,
              labels:[
                "满25减5"
              ]
            },
            {
              id:4,
              headId:require('@/assets/images/demo1.png'),
              name:'统一绿茶',
              goodNum: 98,
              monthNum: 43,
              price: 39.6,
              labels:[
                "满25减5"
              ]
            }
          ]
        },
        {
          title:'碳酸饮料',
          value:[
            {
              id:5,
              headId:require('@/assets/images/demo1.png'),
              name:'可口可乐',
              goodNum: 98,
              monthNum: 43,
              price: 39.6,
              labels:[
                "满25减5"
              ]
            },
            {
              id:6,
              headId:require('@/assets/images/demo1.png'),
              name:'百事可乐',
              goodNum: 98,
              monthNum: 43,
              price: 39.6,
              labels:[
                "满25减5"
              ]
            }
          ]
        }
      ]
    }
  },
  created(){
    console.log(this.$route.params)
  },
  mounted(){
    if (this.$refs.wrapper) {
      console.log(this.$refs.wrapper)
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true
      });
    }
  },
  methods:{
    clickHandler(){
      
    }
  }
}
</script>
<style lang="stylus" scoped src="./GoodsCategory.styl"></style>


