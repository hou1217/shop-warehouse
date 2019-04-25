<template>
  <div class="shop-data">
    <HeaderTitle :title="singleClassName"/>
    <div class="content">
      <!-- 小标题 -->
      <SmallTitle 
        :title="'今日业绩'"
        :rightText="'历史记录'"
        :hasNextBtn="true"/>
      <!-- 数据盒子 -->
      <DataBox :datas="datas1"/>
      <!-- 小标题 -->
      <SmallTitle 
        :title="'相关数据'"/>
      <!-- 数据盒子 -->
      <DataBox :datas="datas2"/>
      <!-- 小标题 -->
      <SmallTitle 
        :title="'数据分析'"
        :hasRightImg="true"/>
      <!-- 时间选择器 -->
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
      <!-- 对比盒子 -->
      <div class="compare-box">
        <div class="compare-box__hd">对比</div>
        <div class="compare-box__bd">
          <div class="compare-good"
                v-for="(good, goodIndex) in compareGoods"
                :key="goodIndex">
            <!--<img :src="good.icon">-->
            <div class="delete-btn" @click.stop="deleteGood(goodIndex)">
              <img src="@/assets/images/search_close@2x.png">
            </div>
          </div>
          <div class="compare-good compare-good_add" @click.stop="addGood">
            <img src="@/assets/images/group_add@2x.png">
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
      singleClassName:'面包甜点',
      kind: 0,
      datas1:[
        {
          num:1,
          character:"销量排名"
        },
        {
          num:5,
          character:"营收排名"
        },
        {
          num:'¥642.32',
          character:"成交金额"
        },
        {
          num:102,
          character:"成交数量"
        },
        {
          num:'¥212.09',
          small:true,
          character:"毛利润"
        },
        {
          num:'¥143.43',
          small:true,
          character:"净利润"
        },
      ],
      datas2:[
        {
          num:102,
          character:"商品种类"
        },
        {
          num:69876,
          character:"剩余库存"
        },
        {
          num:'105%',
          small:true,
          character:"动销率"
        },
        {
          num:2,
          small:true,
          character:"库销比"
        },
      ],
      timeList: [
        
        {
          label: '今日',
          value: 'today'
        },
        {
          label: '近一周',
          value: 'week'
        },
        {
          label: '近一个月',
          value: 'month'
        },
        {
          label: '近三个月',
          value: 'quarter'
        },
        {
          label: '近一年',
          value: 'year'
        }
      ],
      compareGoods: [
        {
          icon: '',
        },
        {
          icon: '',
        },
        {
          icon: '',
        },
        {
          icon: '',
        }
      ],
      
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
    // 删除对比商品
    deleteGood(index) {
      console.debug('删除第' + index + '件对比的商品');
    },
    // 新增对比商品
    addGood() {
      console.debug('跳转至商品选择页');
      this.$router.push({
        name: 'compareSelect'
      });
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
    .compare-box {
      width 100%
      margin 0 0 16px 0
      padding 0 30px
      .compare-box__hd {
        width 100%
        height 33px
        line-height 33px
        font-family PingFangSC-Regular
        font-size 24px
        color #8D93A4
        text-align justify
        margin 0 0 10px 0
      }

      .compare-box__bd {
        width 100%
        display flex
        flex-wrap wrap

        .compare-good {
          width 78px
          height 78px
          border-radius 18.83px
          position relative
          margin 0 24px 24px 0
          background #e3e3e3

          img {
            width 100%
            height 100%
          }

          .delete-btn {
            width 28px
            height 28px
            position absolute
            top -10px
            right -10px

            img {
              width 100%
              height 100%
            }
          }

          &.compare-good_add {
            background #ffffff
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


