<template>
  <div>
    <div class="navbar" :class="{isShow:titlePopupVisible}">
      <div class="comprehensive item" @click="popUp" :class="{active:staticIndex === 1}">
        {{sortName}}
        <img :src="titlePopupVisible?
          require('@/assets/images/shop_arrow_up@2x.png'):require('@/assets/images/shop_arrow_down@2x.png')" 
          alt="">
      </div>
      <div class="sales item" :class="{active:staticIndex === 2}" @click="selectSales">
        销量
        <img src="@/assets/images/shop_balance@2x.png" alt="">
      </div>
      
    </div>
    <!-- 选项下拉弹窗 -->
    <div class="category-popup" v-if="titlePopupVisible">
      <div class="title">
        <span>属性</span>
      </div>
      <ul>
        <li v-for="(property, index) in properties"
            :class="{
              active: currentIndex === index
            }"
            @click="handleSelectProperties(property,index)"
            :key="index">
          {{property.name}}
        </li>
      </ul>
      <div class="title">
        <span>排序</span>
      </div>
      <ul>
        <li v-for="(sort, index) in sorts"
            :class="{
              active: currentIndex2 === index
            }"
            @click="handleSelectSorts(index)"
            :key="index">
          {{sort.name}}
        </li>
      </ul>
      <div class="confirm-btn" @click="popDown">
        确定
      </div>
    </div>
  </div>
</template>
<script>
import eventBus from '@/assets/js/eventBus'

export default {
  data(){
    return{
      sortName:'综合',
      isAsc: false,
      staticIndex: 1,
      currentIndex: 0,
      currentIndex2: 0,
      titlePopupVisible: false,
      orderBy:'',
      properties:[
        {
          name:'综合',
          orderBy:'id'
        },
        {
          name:'动销率',
          orderBy:'props'
        },
        {
          name:'库存',
          orderBy:'stockNum'
        },
        {
          name:'利润',
          orderBy:'profit'
        },
        {
          name:'库销比',
          orderBy:'ratio'
        },
        {
          name:'价格',
          orderBy:'price'
        }
      ],
      sorts:[
        {
          name:'由高到低'
        },
        {
          name:'由低到高'
        }
      ],
    }
  },
  props:{
    title:{
      type:String,
      default:'设置'
    }
  },
  mounted(){
    eventBus.$on('define', () => {
      this.popDown();
    });
  },
  methods:{
    clickSearch(){
      this.$emit('clickSearch');
    },
    handleSelectProperties(property,index){
      this.sortName = property.name;
      this.orderBy = property.orderBy;
      if(property.name === '综合'){
        this.currentIndex = 0;
        this.currentIndex2 = -1;
        this.titlePopupVisible = false;
        this.$emit('PopupVisible',{
          order:'id',
          isAsc: this.isAsc,
          visible:false
        });
        return;
      }
      
      this.currentIndex = index;
      this.currentIndex2 = 0;
      this.isAsc = false;
    },
    handleSelectSorts(val){
      
      if(this.currentIndex === 0){
        this.currentIndex = -1;
      }
      if(val === 1){
        this.isAsc = true;
      }else{
        this.isAsc = false;
      }
      console.log(this.isAsc);
      this.currentIndex2 = val;
      
    },
    popUp(){
      this.staticIndex = 1;
      // this.currentIndex2 = -1;
      this.titlePopupVisible = true;
      this.$emit('PopupVisible',{
        visible:true
      })
    },
    selectSales(){
      this.staticIndex = 2;
      this.titlePopupVisible = false;
      this.$emit('PopupVisible',{
        order:'salesNum',
        isAsc: this.isAsc,
        visible:false
      })
    },
    popDown(){
      if(this.currentIndex2!== -1 && this.currentIndex === -1){
        this.$parent.toastVisible = true;
        return false;
      }
      this.titlePopupVisible = false;
      this.$emit('PopupVisible',{
        order: this.orderBy,
        isAsc: this.isAsc,
        visible:false
      });
    }
  }
}
</script>
<style lang="stylus" scoped>
.navbar {
  &.isShow{
    z-index 51

  }
  position fixed 
  top 68px
  z-index 1
  width 100%
  height 62px
  background #ffffff
  display flex
  align-items center
  padding 0 32px
  border-top 1px solid rgba(238,238,238,0.6)
  border-bottom 1px solid rgba(238,238,238,0.6)
  img{
    width 24px
    height 24px
    vertical-align text-top
  }  
  .item{
    &.active{
      color: #262626;
      font-weight bold
    }
    font-size: 26px;
    color: #8D93A4;
    line-height 62px 
    margin-right 60px
  }
  
}
.category-popup{
  position fixed 
  top 130px
  z-index 51
  width 100%
  background #ffffff
  padding 26px 32px
  .title{
    text-align left 
    margin-bottom 12px 
  }
  ul{
    display flex
    flex-wrap wrap
    li{
      &.active{
        background: #262626;
        color: #FFFFFF;   
      }
      width 166px
      height 56px
      line-height 56px
      background: #F4F4F4;
      border-radius: 30px;
      margin-right 32px
      margin-bottom 22px
    }
  }
  .confirm-btn{
    font-size: 32px;
    color: #262626;
    float right
    width 240px
    height 72px
    line-height 72px
    background: #FFE30F;
    border-radius: 8px;
    
  }
}
</style>


