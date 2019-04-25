<template>
  <div class="warehouse-report">
    <HeaderTitle :title="'总仓报表'"/>
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
      <!-- 最佳伴侣 -->
      <SmallTitle 
        :title="'最佳伴侣'"/>
      <div class="best-mate">
        <div class="mate" v-for="(item,index) in items" :key="index">
          <div class="prop">{{item.props}}%</div>
          <div class="goods">
            <div class="goods-img">
              <img src="@/assets/images/demo2.png" alt="">
            </div>
            <div>
              {{item.name1}}
            </div>
          </div>
          
          <div class="goods">
            <div class="goods-img">
              <img src="@/assets/images/demo2.png" alt="">
            </div>
            <div>
              {{item.name2}}
            </div>
          </div>
        </div>
      </div>
      <!-- 查看更多 -->
      <div 
        class="read-more"
        @click="getMateData()"
        style="margin-bottom:30px">
        查看更多
        <div class="down-img">
          <img src="@/assets/images/shop_drop_down_b@2x.png" alt="">
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
      datas:[
        {
          num:15,
          character:"商品分类"
        },
        {
          num:2,
          character:"新增分类"
        },
      ],
      currentTimeIndex: 0,
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
      items:[
        
      ],
    }
  },
  created(){
    this.getMateData();
  },
  methods:{
    ...mapActions([
      'REQUEST_API'
    ]),
    choseTime(index){
      this.currentTimeIndex = index;
      
    },
    getMateData(){
      this.REQUEST_API({
        api: 'getMateList',
        params: {}
      })
      .then((res) => {
        console.log(res);
        if(res  && res.cards.length > 0){          
          this.items = [].concat(this.items,res.cards);     
        }
        console.warn('加载结束');
      })
      .catch((err) => {
        console.debug('列表数据异常：', err);
      });
    },
  }
}
</script>

<style lang="stylus" scoped src="./WarehouseReport.styl"></style>

