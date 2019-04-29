<template>
  <!-- 弹窗 -->
  <div class="category-popup" v-if="addGoodsVisible">
    <div class="content">
      <div class="header">
        <div class="portrait">
          <img :src="imgSrc(data.id)" :onerror="defaultSrc"/>
        </div>
        <div class="content">
          <div class="price">
            ¥{{data.price}}
          </div>
          <div class="choose">
            <div class="item">
              已选择
            </div>
            <div class="item">
              {{data.name}}
            </div>
          </div>
        </div>
      </div>
      <div class="title">
        <span>种类</span>
      </div>
      <ul>
        <li v-for="(kind, index) in kinds"
            :class="{
              active: currentIndex === index
            }"
            @click="handleSelectKinds(index)"
            :key="index">
          {{kind.name}}
        </li>
      </ul>
      <div class="numbers">
        <div>
          数量
        </div>
        <PlusMinus />
      </div>
    </div>
    
    <div class="btns">
      <div class="btn" @click="joinLists">
        加入进货单
      </div>
      <div class="btn immediate" @click="handleImmediate">
        立即进货
      </div>
    </div>
  </div>
</template>
<script>
import PlusMinus from '@/components/common/PlusMinus'
export default {
  components:{
    PlusMinus
  },
  props:{
    addGoodsVisible:{
      type: Boolean,
      default: false
    },
    data:{
      type:Object,
      
    }
  },
  data(){
    return{
      defaultSrc: 'this.src="' + require('@/assets/images/bitmap.png')
          + '"',
      currentIndex: 0,
      kinds:[
        {
          name:'商品名称'
        },
        {
          name:'商品名称'
        },
        {
          name:'商品名称'
        },
        {
          name:'商品名称'
        },
      ]
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
  methods:{
    handleSelectKinds(val){
      this.currentIndex = val;
    },
    joinLists(){
      console.debug('加入订货单');
      // console.debug(this.data);
      // this.$router.push({
      //   name:"purchaseOrder"
      // })
      this.$emit('addToPurchase');
    },
    handleImmediate(){
      this.$router.push({
        name:"purchaseOrderConfirm"
      })
      // this.$emit('addGoodsVisibleHandler',false);
    }
  }
}
</script>

<style lang="stylus" scoped>

.category-popup{
  position fixed
  bottom 0px
  z-index 51
  width 100%
  background #ffffff
  .content{
    padding 32px
  }
  .header{
    display flex
    .portrait{
      width  182px
      height 182px
    }
    .content{
      .price{
        font-size: 42px;
        color: #E93A0F;
        text-align left
      }
      .choose{
        
        display flex
        .item{
          &:first-child{
            margin-right   10px
          }
          color: #8D93A4;
          font-size: 24px;
        }
        
        
      }
      
    }
  }
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
      color: #ADB1BE;
      // width 132px
      padding 0 24px
      height 54px
      line-height 54px
      border: 1px solid #ADB1BE;
      // background: #F4F4F4;
      border-radius: 4px;
      margin-right 32px
      margin-bottom 22px
    }
  }
  .numbers{
    display flex
    justify-content space-between
  }
  .btns{
    display flex
    font-size: 30px;
    color: #E93A0F;
    width 100%
    height 88px
    line-height 88px
    background: rgba(255,242,238,0.5);
    .btn{
      width 50%
      &.immediate{
        color: #FFFFFF;
        background: #E93A0F;
      }
    }
  }
}
</style>

