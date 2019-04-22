<template>
  <div ref="shade" class="shade" v-if="shadeVisible">

  </div>
</template>
<script>
  export default {
    props:{
      shadeVisible:{
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .shade {
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.6)
    position fixed
    top 0
    left 0
    z-index 50
    overflow hidden
  }
</style>
