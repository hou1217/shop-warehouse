<template>
  <div class="container container_purchase-order-status">
    <div class="hd">
      <div class="back-btn" @click="$router.go(-1)">
        <img src="@/assets/images/h5_arrow_back@2x.png">
      </div>
    </div>
    <div class="bd">
      <div class="status-box">
        <div class="message-box">
          <div class="icon">
            <img src="@/assets/images/shop_success@2x.png">
          </div>
          <div class="text">下单成功</div>
        </div>
        <div class="btn-box">
          <div class="btn btn_return" @click.stop="goBackToStock">返回店铺</div>
          <div class="btn btn_detail" @click.stop="turnToDetail">订单详情</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PurchaseOrderStatus",
    data() {
      return {

      }
    },
    methods: {
      //返回店铺
      goBackToStock(){
        this.$router.push({
          name: 'stock',
          params:{
            type: 1
          }
        });
      },
      // 跳转至订单详情
      turnToDetail() {
        this.$router.push({
          path: '/purchaseOrderDetail'
        });
      },
    }
  }
</script>

<style scoped lang="stylus">
  .container_purchase-order-status {
    width 100%
    height auto
    background #ffffff
    
    >>> img {
      width 100%
      height 100%
    }
    
    .hd {
      width 100%
      height 68px
      display flex
      align-items center
      position fixed
      border-bottom 1px solid rgba(238, 238, 238, 0.6)
      background #ffffff
      top 0
      left 0
  
      .back-btn {
        width 44px
        height 44px
        margin 0 6px 0 0
    
        img {
          width 100%
          height 100%
        }
      }
    }
    
    .bd {
      width 100%
      height 100vh
      background #F4F4F4
      padding 68px 0 0 0
      
      .status-box {
        width 100%
        height 286px
        background #ffffff
        display flex
        justify-content center
        align-items center
        flex-wrap wrap
        align-content center
        
        .message-box {
          width 100%
          display flex
          align-items center
          justify-content center
          margin 0 0 40px 0
          
          .icon {
            width 52px
            height 52px
            margin 0 10px 0 0
          }
          
          .text {
            height 48px
            line-height 48px
            font-family PingFangSC-Regular
            font-size 34px
            color #262626
          }
        }
        
        .btn-box {
          width 100%
          display flex
          align-items center
          justify-content center
          
          .btn {
            width 168px
            height 56px
            line-height 56px
            text-align center
            background rgba(220,222,230,0.10)
            border 1px solid #8D93A4
            border-radius 4px
            font-family PingFangSC-Regular
            font-size 26px
            color #8D93A4
          }
          
          .btn_return {
            margin 0 50px 0 0
          }
        }
      }
    }
  }

</style>
