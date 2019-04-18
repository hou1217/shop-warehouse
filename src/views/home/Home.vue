<template>
  <div class="home">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header'
// import GoodsCategory from '@/views/category/GoodsCategory'

export default {
  name: 'home',
  components: {
    Header,
    // GoodsCategory
  }
}
</script>
<style lang="stylus" scoped>
.home{
  height 100%  
}
</style>

