<template>
  <div class="h-progress">
    <div class="h-progress-number">
      <div class="start">
        <slot name="start"></slot>
      </div>
      <div class="end">
        <slot name="end"></slot>
      </div> 
    </div>
    
    <div class="h-progress-content">
      <div class="h-progress-runway" :style="{ height: barHeight + 'px' }"></div>
      <div class="h-progress-progress" :style="{ width: value + '%', height: barHeight + 'px' }"></div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'h-progress',
    props: {
      value: Number,
      barHeight: {
        type: Number,
        default: 3
      }
    }
  };
</script>

<style scoped lang="stylus">
  .h-progress {
      position: relative;
      // display: flex;
      height: 32px;
      line-height: 32px;

      .h-progress-number{
        display: flex;
        display: -webkit-box;
        justify-content space-between
        .start{
          // margin-right: 5px;
          font-size: 22px;
          color: #000000;
          letter-spacing: 0;
          text-align: justify;
          line-height: 22px;
        }

        .end{
          // margin-left: 5px;
          font-size: 14px;
          color: #000000;
          letter-spacing: 0;
          text-align: justify;
        }
      }
      .h-progress-content {
        position: relative;
        // flex: 1;
      }

      .h-progress-runway {
        position: absolute;
        transform: translate(0, -50%);
        top: 50%;
        left: 0;
        right: 0;
        background-color: #ebebeb;
        height: 3px;
      }

      .h-progress-progress {
        position: absolute;
        display: block;
        background-color: #262626;
        top: 50%;
        transform: translate(0, -50%);
        width: 0;
      }
  }
  
</style>


