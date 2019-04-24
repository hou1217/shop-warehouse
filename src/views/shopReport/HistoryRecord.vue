<template>
  <div class="history-record">
    <HeaderTitle :title="'历史记录'"/>
    <ul class="select-btn">
      <li 
        v-for="(item,index) in items"
        :key="index"
        :class="{active:currIndex === index}"
        @click="selectType(index)">
        {{item}}
      </li>
    </ul>
    <ul class="content" v-if="data.kind === 'month'">
      <li 
        v-for="(item,index) in data.cards"
        :key="index">
        {{item.name}}周销量
        <div class="right-text">¥{{item.totalSales}}</div>
        <div class="next-btn">
          <img src="@/assets/images/arrow_enter_g@2x.png">
        </div>
      </li>
    </ul>
    <div class="content" v-else>
      <ul 
        v-for="(item,index) in data.cards"
        :key="index">
        <div class="title">
          {{item.title}}月
        </div>
        <li 
          v-for="(eachItem,index) in item.times"
          :key="index">
          {{eachItem.number}}日销量
          <div class="right-text">¥{{eachItem.totalSales}}</div>
          <div class="next-btn">
            <img src="@/assets/images/arrow_enter_g@2x.png">
          </div>
        </li>
      </ul>
      
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import HeaderTitle from '@/components/HeaderTitle'
export default {
  components:{
    HeaderTitle
  },
  data(){
    return{
      currIndex: 0,
      kind: 0,
      items:["日","周","月","年"],
      data:{}
    }
  },
  created(){
    this.getHistoryRecordData();
  },
  methods:{
    ...mapActions([
      'REQUEST_API'
    ]),
    selectType(index){
      this.currIndex = index;
      this.kind = index;
      this.getHistoryRecordData()
    },
    getHistoryRecordData(){
      // 模拟选择日和周
      let api = null;
      if(this.kind === 0){
        api = 'getHistoryRecord1'
      }else{
        api = 'getHistoryRecord'
      }

      this.REQUEST_API({
        api: api,
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
.history-record{
  .select-btn{
    border-top 1px solid rgba(238,238,238,0.6)
    background-color #fff
    position fixed
    top 68px
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
      width 156px
      height 56px
      line-height 56px
      background: #F4F4F4;
      border-radius: 8px;
      font-size: 26px;
    }
  }  
  .content{
    padding-top 166px
    .title{
      background: #F4F4F4;
      height 44px
      line-height 44px
      text-align left 
      padding-left 20px
    }
    li{
      position relative
      border-bottom 1px solid rgba(238,238,238,0.6)
      height 42px
      line-height 42px
      text-align left 
      padding 25px 30px
      font-size: 30px;
      color: #575C68;
      .right-text {
        font-size 30px
        color: #262626;
        letter-spacing: 0;
        position absolute
        top 50%
        transform translateY(-50%)
        right 58px
      }
      .next-btn{
        width 44px
        height 44px
        position absolute
        top 50%
        margin-top -22px
        right 18px  
      }
    }
  }
}
</style>


