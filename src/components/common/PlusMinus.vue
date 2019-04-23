<template>
  <div class="rule-table__item__tb__per-editing">
    <div @click="changeRankBonusPer($event)">
      <img src="@/assets/images/goods_add@2x.png">
      <input :value="number">
      <!--{{number}}-->
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      number:1
    }
  },
  methods:{
    // 改变排名分红百分比
    changeRankBonusPer( event) {
      console.debug(event);
      if (event.target.nodeName == 'IMG') {
        if (event.offsetX > 0 && event.offsetX < 20) {
          console.debug('减');
          if(this.number === 0){
            return false;
          }
          this.number -= 1;
        } else if (event.offsetX > 60 && event.offsetX < 80) {
          console.debug('加');
          this.number += 1;
        }
      }
      this.$forceUpdate();
    },
    // 各排名分红比例输入
    rankBonusInput( event) {
      console.debug('rankBonusInput');
      console.debug(event.target);
    },
  }
}
</script>

<style lang="stylus" scoped>
.rule-table__item__tb__per-editing div:first-child {
  display: flex;
  box-sizing: border-box;
  width: 160px;
  height: 42px;
  position: relative;
  margin-right: 14px;
}

.rule-table__item__tb__per-editing div img {
  width: 160px;
  height: 42px;
  position: absolute;
  left: 0;
  top: 0;
  // z-index 1
}

.rule-table__item__tb__per-editing div input {
  display: block;
  box-sizing: border-box;
  width: 40%;
  margin: 0 auto;
  font-size: 28px;
  color: #262626;
  border: none;
  outline: none;
  text-align: center;
  // z-index: 98;
}
</style>

