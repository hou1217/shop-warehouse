<template>
  <div class="loading-box">
    <div class="loading-img">
      <img src="../../assets/images/loading/refresh_1.png">
    </div>

    <div class="loading-text">加载中...</div>
  </div>
</template>
<style lang="stylus" scoped>
  /*图片旋转*/
  @-webkit-keyframes rotation {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }
  .loading-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 230px!important;
    height: 230px!important;
    /*padding-bottom: 230px;*/
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
    border-radius: 10px;

    background: rgba(41,41,41,0.8);
  }

  .loading-box .loading-img {
    /*position: absolute;*/
    /*top: 18.3%;*/
    /*left: 50%;*/
    /*-webkit-transform: translate(-50%, 0);*/
    /*-moz-transform: translate(-50%, 0);*/
    /*-ms-transform: translate(-50%, 0);*/
    /*-o-transform: translate(-50%, 0);*/
    /*transform: translate(-50%, 0);*/
  }

  .loading-box .loading-img img {
    -webkit-transform: rotate(360deg);
    animation: rotation 3s linear infinite;
    -moz-animation: rotation 3s linear infinite;
    -webkit-animation: rotation 3s linear infinite;
    -o-animation: rotation 3s linear infinite;
  }

  .loading-box .loading-text {
    /*position: absolute;*/
    /*left: 50%;*/
    /*bottom: 19.1%;*/
    /*-webkit-transform: translate(-50%, 0);*/
    /*-moz-transform: translate(-50%, 0);*/
    /*-ms-transform: translate(-50%, 0);*/
    /*-o-transform: translate(-50%, 0);*/
    /*transform: translate(-50%, 0);*/
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #FFFFFF;
    text-align: left;
  }
</style>

