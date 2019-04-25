<template>
  <div class="shop-data">
    <HeaderTitle :title="'分类数据'"/>
    <div class="content">
      <!-- 小标题 -->
      <SmallTitle 
        :title="'分类数据'"/>
      <!-- 数据盒子 -->
      <DataBox :datas="datas"/>
      <!-- 小标题 -->
      <SmallTitle 
        :title="'数据分析'"
        :hasRightImg="true"/>
      <div class="time-box">
        <div class="time-box__hd">时间</div>
        <div class="time-box__bd">
          <div class="time"
            :class="{active: currentTimeIndex === timeIndex}"
            v-for="(time, timeIndex) in timeList"
            :key="timeIndex" @click="choseTime(timeIndex)">
            {{time.label}}
          </div>
        </div>
      </div>
      
    </div>
    
    
    
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import HeaderTitle from '@/components/HeaderTitle'
import SmallTitle from '@/components/SmallTitle'
import DataBox from '@/components/DataBox'
export default {
  components:{
    HeaderTitle,
    SmallTitle,
    DataBox
  },
  data(){
    return{
      currentTimeIndex: 0,
      kind: 0,
      datas:[
        {
          num:8,
          character:"商品分类"
        },
        {
          num:1,
          character:"新增分类"
        },
      ],
      timeList: [
        
        {
          label: '今日',
          value: 'today'
        },
        {
          label: '本周',
          value: 'week'
        },
        {
          label: '本月',
          value: 'month'
        },
        {
          label: '本季度',
          value: 'quarter'
        },
        {
          label: '本年',
          value: 'year'
        }
      ],
      data:{}
    }
  },
  created(){
    this.getShopData();
  },
  methods:{
    ...mapActions([
      'REQUEST_API'
    ]),
    choseTime(index){
      this.currentTimeIndex = index;
      this.kind = index;
      this.getShopData();
    },
    getShopData(){
      

      this.REQUEST_API({
        api: 'getShopData',
        params: {
          kind:this.kind
        }
      })
      .then((res) => {
        console.log(res);
        this.data = res;     
        console.warn('加载结束');
      })
      .catch((err) => {
        console.debug('列表数据异常：', err);
      });
    }
  }
} 
</script>
<style lang="stylus" scoped>
>>> img{
  width 100%
  height 100%
}
.shop-data{
  .select-btn{
    // border-top 1px solid rgba(238,238,238,0.6)
    background-color #fff
    
    box-sizing border-box
    // z-index 1
    padding 20px 33px
    width 100% 
    display flex
    justify-content space-between
    li{
      &.active{
        color #fff
        background: #262626;   
      }
      box-sizing border-box
      // margin-top 24px
      width 148px
      height 56px
      line-height 56px
      background: #F4F4F4;
      border-radius: 8px;
      font-size: 26px;
    }
  }  
  .content{
    padding-top 68px
    .time-box {
      width 100%
      margin 26px 0 16px 0
      padding 0 30px
      .time-box__hd {
        width 100%
        height 33px
        line-height 33px
        margin 0 0 10px 0
        font-family PingFangSC-Regular
        font-size 24px
        color #8D93A4
        text-align justify
      }

      .time-box__bd {
        width 100%
        display flex
        flex-wrap wrap

        .time {
          width 148px
          height 56px
          border-radius 8px
          background #F4F4F4
          line-height 56px
          text-align center
          font-family PingFangSC-Regular
          font-size 26px
          color #575C68
          margin 0 20px 24px 0

          &.active {
            background #262626
            color #FFFFFF
          }
        }
      }
    }
    .title{
      background: #F4F4F4;
      height 44px
      line-height 44px
      text-align left 
      padding-left 20px
    }
    
  }
}
</style>


