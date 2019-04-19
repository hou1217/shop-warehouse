<template>
  <div class="container">
    <HeaderTitle :title="'店铺库存'"/>
    <HeaderSort />  
    <NavbarTop />
    <FloatingBox />
    <!-- 加载中组件 -->
    <LoadingBox v-if="loading"/>
    <!-- 遮罩层 -->
    <Shade :shadeVisible="shadeVisible"/>
    <vue-data-loading
      :loading="loading"
      :completed="completed"
      :listens="['infinite-scroll']"
      :offset="offset"
      @infinite-scroll="infiniteScroll">
      
    </vue-data-loading>
  </div>
</template>
<script>
import LoadingBox from '@/components/common/LoadingBox'
import Shade from '@/components/common/Shade'
import HeaderTitle from '@/components/HeaderTitle'
import HeaderSort from '@/components/HeaderSort'
import NavbarTop from '@/components/NavbarTop'
import FloatingBox from '@/components/FloatingBox'
import VueDataLoading from 'vue-data-loading'


export default {
  components:{
    HeaderTitle,
    HeaderSort,
    NavbarTop,
    FloatingBox,
    VueDataLoading,
    LoadingBox,
    Shade
  },
  data(){
    return{
      loading:false,
      completed: false,
      offset: -110,
      shadeVisible:false
    }
  },
  methods:{
    // 触底加载
    infiniteScroll() {
      
      console.warn('触发触底加载方法');
      console.debug(this.completed);
      this.loading = true;
      this.getListData();
    },
    getListData(){

    }
  }
}
</script>

<style lang="stylus" scoped src="./ShopStock.styl"></style>

