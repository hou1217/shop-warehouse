<template>
  <div class="videoShade"
       :class="{open:isOpen, horizontal:isHorizontal}"
       @click="closeVideoPopup"
       ref="videoShade">
    <!--<div class="video-show-box">-->
    <!--<d-player v-if="playerVisible" :options="options" ref="player"></d-player>-->
    <!--</div>-->
    
    <!-- 视频展示主体 -->
    <div class="video-show-box" @click="videoClick">
      <video class="video-source"
             ref="videoSource"
             :src="testVideoUrl"
             autoplay="autoplay"
             :muted="muted"></video>
      
      <!-- 播放/暂停按钮 -->
      <div v-if="!videoComplete"
           ref="controlButton"
           class="video-control-btn">
        <img v-if="playing"
             class="pause"
             src="@/assets/images/videoPlayer/video_off@2x.png">
        <img v-else
             class="play"
             src="@/assets/images/videoPlayer/video_play@2x.png">
      </div>
    </div>
    
    <!-- 关闭按钮 -->
    <div class="return-back-btn"
         @click="closeVideoPopup"
         ref="returnBackBtn">
      <img class="return-back-img"
           src="@/assets/images/player/navi_whiteback@2x.png">
    </div>
    
    <!-- 静音按钮 -->
    <div class="voice-silence-btn"
         ref="voiceSilenceBtn" @click="mute">
      <div class="icon">
        <img v-if="muted"
             src="@/assets/images/videoPlayer/voice_silence_w@2x.png">
        <img v-else
             src="@/assets/images/videoPlayer/voice_on_w@2x.png">
      </div>
    </div>
    
    <!-- 底部进度条及缩放按钮 -->
    <div class="video-footer" ref="videoFooter">
      <img class="bg" src="@/assets/images/player/preview_shadow@2x.png">
      
      <!-- 当前时间 -->
      <div class="current-time">{{videoCurrentTime}}</div>
      
      <!-- 进度条 -->
      <div class="progress-box">
        <div class="point" ref="point">
          <img src="@/assets/images/player/start_b@2x.png">
        </div>
        <div class="total" ref="totalBar" @click="onProgressBarClick"></div>
        <div class="current" ref="currentBar"
             @click="onProgressBarClick"></div>
      </div>
      
      <!-- 总时间 -->
      <div class="duration">{{videoDuration}}</div>
      
      <!-- 缩放按钮 -->
      <!--<div class="small-screen-btn">-->
      <!--<img src="@/assets/images/player/smallscreen@2x.png">-->
      <!--</div>-->
    </div>
    
    <!-- 遮罩层 -->
    <div class="shade" v-if="shadeVisible"></div>
  
    <!-- 重播按钮 -->
    <div v-if="videoComplete"
         ref="replayButton"
         class="replay-box" @click="replay">
      <div class="icon">
        <img class="video-replay"
             src="@/assets/images/videoPlayer/video_replay@2x.png">
      </div>
      <div class="character">点击重新播放</div>
    </div>
  
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isOpen: false,  // 弹窗是否打开状态
        // video相关参数
        testVideoUrl: '',

        videoCurrentTime: '00:00',
        videoDuration: '00:00',
        player: null,
        // 进度条相关参数
        duration: 0,
        timer: null,
        totalBarLength: 0,
        hideTimer: null,
        
        
        playing: true,  // 视频播放状态
        videoComplete: false,  // 视频播放完成状态
        controllerShow: true,  // 视频控制按钮展示状态
        shadeVisible: false,
        muted: true,  // 静音状态
        isHorizontal: false,  // 是否横屏视频
        
        // 测试参数
        testVisible: true
      }
    },
    // props: {
    //   testVideoUrl: String,
    // },
    watch: {
      'playing': {
        handler(val) {
          console.debug(val);
          if (val) {
            console.debug('setTimeout');
            this.hideTimer = setTimeout(() => {
              let returnNode = document.querySelector('.return-back-btn');
              let silenceNode = document.querySelector('.voice-silence-btn');
              // let pauseNode = document.querySelector('.video-pause');
              let controlButtonNode = this.$refs.controlButton;
              let footerNode = document.querySelector('.video-footer');

              returnNode.style.setProperty('opacity', '0');
              silenceNode.style.setProperty('opacity', '0');
              // if(pauseNode)pauseNode.style.setProperty('opacity', '0');
              if (controlButtonNode) controlButtonNode.style.setProperty('opacity', '0');
              footerNode.style.setProperty('opacity', '0');
              this.controllerShow = false;
            }, 3000);
          } else {
            console.debug('clearTimeout');
            clearTimeout(this.hideTimer);
          }
        }
      },
    },
    mounted() {
      // this.$refs.point.style.transform = `translate(${0}px, 0)`;
      this.$refs.point.style.setProperty('margin-left', '0');
      this.totalBarLength = this.$refs.totalBar.clientWidth;
      // this.$refs.currentBar.style.setProperty('width', '0px');
      this.$refs.currentBar.style.setProperty('width', '0');
      
      // console.debug(this.$refs.totalBar.clientWidth);
      
      // 测试监听横竖屏事件
      // window.addEventListener("orientationchange", function () {
      //   alert(window.orientation);
      // }, false);
      
      // 测试监听resize事件
      // window.addEventListener("resize", function () {
      //   alert('window resize');
      // });
    },
    methods: {
      //打开视频窗口
      openVideoPopup(video) {
        this.testVideoUrl = video.videoUrl;

        console.debug('openVideoPopup');
        let duration = Math.round(video.duration);
        let horizontal = (video.width / video.height) > 1.3;
        // 处理视频总时长
        console.log(duration);
        console.debug(horizontal);
        // window.orientation = 90;
        this.player = this.$refs.videoSource;
        this.player.style.setProperty('visibility', 'visible');
        this.isHorizontal = horizontal;
        // 打开视频展示页面
        this.isOpen = true;
        
        // 打开页面后自动播放视频
        // this.player.play();
        
        // 打开视频页面3s后隐藏控制按钮
        this.hideTimer = setTimeout(() => {
          let returnNode = this.$refs.returnBackBtn;
          let silenceNode = this.$refs.voiceSilenceBtn;
          // let pauseNode = this.$refs.videoPause;
          let controlButtonNode = this.$refs.controlButton;
          let footerNode = this.$refs.videoFooter;

          returnNode.style.setProperty('opacity', '0');
          silenceNode.style.setProperty('opacity', '0');
          // if(pauseNode)pauseNode.style.setProperty('opacity', '0');
          if (controlButtonNode) controlButtonNode.style.setProperty('opacity', '0');
          footerNode.style.setProperty('opacity', '0');
          this.controllerShow = false;
        }, 3000);
        
        // 显示视频进度条的总时长
        if (duration) {
          if (duration < 60) {
            if (duration < 10) {
              this.videoDuration = `00:0${duration}`;
            } else {
              this.videoDuration = `00:${duration}`;
            }
          } else {
            if (duration % 60 < 10) {
              this.videoDuration = `${(duration / 60) > 10 ? parseInt(duration / 60) : '0' + parseInt(duration / 60)}:0${duration % 60}`;
            } else {
              this.videoDuration = `${(duration / 60) > 10 ? parseInt(duration / 60) : '0' + parseInt(duration / 60)}:${duration % 60}`;
            }
          }
        }
        
        this.duration = duration;
        
        // 刷新进度条
        this.timer = setInterval(() => {
          this.progressBarRefresh(duration);
        }, 1000);
      },
      // 进度条刷新方法
      progressBarRefresh(dur) {
        let currentTime = Math.ceil(this.player.currentTime);
        // let duration = Math.round(this.player.duration);
        let duration = dur;
        // console.log(currentTime);
        // console.log(duration);
        
        // if (currentTime === duration) {
        //   window.clearInterval(this.timer);
        //   return false;
        // }
        
        let per = currentTime / duration;
        
        if (currentTime < 60) {
          if (currentTime < 10) {
            this.videoCurrentTime = `00:0${currentTime}`;
          } else {
            this.videoCurrentTime = `00:${currentTime}`;
          }
        } else {
          if ((currentTime % 60) < 10) {
            this.videoCurrentTime =
                `${Math.round(currentTime / 60) > 10 ?
                    Math.round(currentTime / 60) :
                    '0' + Math.round(currentTime / 60)}:0${(currentTime % 60)}`;
          } else {
            this.videoCurrentTime =
                `${Math.round(currentTime / 60) > 10 ?
                    Math.round(currentTime / 60) :
                    '0' + Math.round(currentTime / 60)}:${(currentTime % 60)}`;
          }
        }
        
        // 移动进度点
        // this.$refs.point.style.transform =
        //     `translate(${this.totalBarLength * per}px, 0)`;
        this.$refs.point.style.setProperty('margin-left', `${per * 100}%`);
        
        // 移动进度条
        // this.$refs.currentBar.style.setProperty('width', `${this.totalBarLength * per}px`);
        this.$refs.currentBar.style.setProperty('width', `${per * 100}%`);
        
        // console.debug(this.totalBarLength, this.totalBarLength * per);
        
        if (currentTime >= duration) {
          // 播放完毕显示遮罩及重播按钮
          this.shadeVisible = true;
          this.videoComplete = true;
          this.playing = !this.playing;
          this.controllerShow = true;
          currentTime = 0;
          this.player.currentTime = this.player.duration;
          let returnNode = document.querySelector('.return-back-btn');
          let silenceNode = document.querySelector('.voice-silence-btn');
          // let pauseNode = document.querySelector('.video-pause');
          let controlButtonNode = this.$refs.controlButton;
          let footerNode = document.querySelector('.video-footer');

          returnNode.style.setProperty('opacity', '1');
          silenceNode.style.setProperty('opacity', '1');
          // if (pauseNode) pauseNode.style.setProperty('opacity', '1');
          if (controlButtonNode) controlButtonNode.style.setProperty('opacity', '1');
          footerNode.style.setProperty('opacity', '1');
          this.controllerShow = true;
          window.clearInterval(this.timer);
          return false;
        }
      },
      // 关闭视频窗口
      closeVideoPopup(e) {
        // console.debug('closeVideoPopup');
        // console.debug(e);
        // console.debug(e.target);
        
        // let node = document.querySelector('.videoShade');
        // // node.className = 'videoShade close';
        //
        // console.debug(node.className);
        
        if (!this.controllerShow) {
          return false;
        }
        
        if (e.target.className === 'videoShade open' || e.target.className === 'return-back-btn' || e.target.className === 'return-back-img') {
          //this.$emit('closeVideoPopup');
          // 关闭视频展示页面
          this.isOpen = false;
          this.player.pause();
          this.videoComplete = false;
          this.shadeVisible = false;
          this.testVideoUrl = '';
          this.playing = true;
          this.videoCurrentTime = '00:00';
          this.videoDuration = '00:00';
          // this.$refs.point.style.transform = `translate(${0}px, -50%)`;
          this.$refs.point.style.setProperty('margin-left', `0`);
          this.$refs.currentBar.style.setProperty('width', '0px');
          this.player.style.setProperty('visibility', 'hidden');
          
          window.clearInterval(this.timer);
          
          let returnNode = document.querySelector('.return-back-btn');
          let silenceNode = document.querySelector('.voice-silence-btn');
          // let pauseNode = document.querySelector('.video-pause');
          let controlButtonNode = this.$refs.controlButton;
          let footerNode = document.querySelector('.video-footer');
          
          returnNode.style.setProperty('opacity', '1');
          silenceNode.style.setProperty('opacity', '1');
          // if (pauseNode) pauseNode.style.setProperty('opacity', '1');
          if (controlButtonNode) controlButtonNode.style.setProperty('opacity', '1');
          footerNode.style.setProperty('opacity', '1');
          this.controllerShow = true;
        }
      },
      
      // 静音
      mute() {
        // console.debug('mute');
        this.muted = !this.muted;
      },
      
      // 点击播放
      videoClick(e) {
        // console.debug(e);
        console.debug(e.target);
        let node = e.target;
        let videoPlayer = document.querySelector('.video-source');
        let timer = null;
        // console.debug('videoPlayer');
        // console.debug(e.target.duration);
        // console.debug(videoPlayer.duration);
        
        if (node.className === 'video-source' ||
            node.className === 'play' ||
            node.className === 'pause') {
          if (this.playing) {
            console.debug('videoClick if');
            videoPlayer.pause();
            this.playing = false;
            window.clearInterval(this.timer);
            
            let returnNode = document.querySelector('.return-back-btn');
            let silenceNode = document.querySelector('.voice-silence-btn');
            // let pauseNode = document.querySelector('.video-pause');
            let controlButtonNode = this.$refs.controlButton;
            let footerNode = document.querySelector('.video-footer');
            
            returnNode.style.setProperty('opacity', '1');
            silenceNode.style.setProperty('opacity', '1');
            // pauseNode.style.setProperty('opacity', '1');
            if (controlButtonNode) controlButtonNode.style.setProperty('opacity', '1');
            footerNode.style.setProperty('opacity', '1');
            this.controllerShow = true;
            
          } else {
            console.debug('videoClick else');
            videoPlayer.play();
            this.playing = true;
            this.timer = setInterval(() => {
              this.progressBarRefresh(this.duration);
            }, 1000);
          }
        }
      },
      
      // 点击进度条
      onProgressBarClick(e) {
        console.debug('点击进度条');
        console.debug(e);
        console.debug(e.target);
      },
      
      // 重播
      replay() {
        console.debug('重播');
        this.shadeVisible = false;
        this.videoComplete = false;
        this.videoCurrentTime = '00:00';
        this.$refs.videoSource.play();
        this.$refs.currentBar.style.setProperty('width', '0px');
        // this.$refs.point.style.transform = `translate(${0}px, -50%)`;
        this.$refs.point.style.setProperty('margin-left', `0`);
        this.playing = true;
        this.timer = setInterval(() => {
          this.progressBarRefresh(this.duration);
        }, 1000);
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .videoShade {
    position: fixed;
    left: 0;
    top: 100%;
    /*top: 0;*/
    /*width: 100%;*/
    /*height: 100%;*/
    width: 100vw;
    height: 100vh;
    background: #000;
    overflow: hidden;
    z-index: 1000;
    opacity: 0;
    -webkit-touch-callout: none;
    user-select: none;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    .return-back-btn {
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
      left: 0;
      top: 0;
      width: 90px;
      height: 126px;
      /*line-height: 70px;*/
      /*text-align: center;*/
      /*color: #ffffff;*/
      /*font-size: 40px;*/
      z-index: 306;
      
      img {
        width 50px
        height 50px
      }
    }
    
    .voice-silence-btn {
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
      top: 0;
      right: 0;
      width: 90px;
      height: 126px;
      z-index: 102;
      
      .icon {
        width: 50px;
        height: 50px;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    
    .video-footer {
      display: flex;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 6.7%;
      
      .bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        -webkit-transform: rotateX(180deg);
        -moz-transform: rotateX(180deg);
        -ms-transform: rotateX(180deg);
        -o-transform: rotateX(180deg);
        transform: rotateX(180deg);
      }
      
      .current-time {
        width: 70px;
        height: 26px;
        line-height: 26px;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #FFFFFF;
        letter-spacing: 0;
        margin: 0 10px 0 20px;
      }
      
      .progress-box {
        flex: 1;
        height: 100%;
        margin: 0 10px;
        position: relative;
        
        .point {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100%;
          /*width: 36px;*/
          /*height: 36px;*/
          position: absolute;
          top: 0;
          left: -50px;
          z-index: 302;
          
          /*测试*/
          /*transition: transform 1s 0s;*/
          
          img {
            /*width: 100%;*/
            /*height: 100%;*/
            width: 36px;
            height: 36px;
            /*object-fit: contain;*/
          }
        }
        .total {
          position: absolute;
          /*left: 2.5%;*/
          top: 50%;
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
          width: 100%;
          height: 4px;
          background: #262626;
          border-radius: 2px;
          z-index: 300;
        }
        
        .current {
          position: absolute;
          /*left: 2.5%;*/
          top: 50%;
          -webkit-transform: translate(0, -50%);
          -moz-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          transform: translate(0, -50%);
          width: 0;
          height: 4px;
          background: #FFE30F;
          border-radius: 2px;
          z-index: 301;
          
          /*transition: transform 0.2s 0s;*/
          /*-webkit-transition: all 1s ease;*/
          /*-moz-transition: all 1s ease;*/
          /*-o-transition: all 1s ease;*/
          /*transition: all 1s ease;*/
        }
        
      }
      
      .duration {
        width: 70px;
        height: 26px;
        line-height: 26px;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #FFFFFF;
        letter-spacing: 0;
        margin: 0 20px 0 10px;
      }
      
    }
    
    .small-screen-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 12.8%;
      height: 100%;
      /*background: red;*/
      position: absolute;
      top: 0;
      right: 0;
      img {
        width 44px
        height 44px
      }
    }
    
    .video-show-box {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 100%;
      /*width: 200px;*/
      height: auto;
      z-index: -1;
      
      img {
        width 120px
        height 120px
      }
      
      .video-source {
        max-width: 100%;
        height: auto;
        object-fit: contain;
        z-index: -1;
      }
      
      .video-control-btn {
        width: 140px;
        height: 140px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 300;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
    }
    
    .shade {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 305;
  
      
    }
    
    .replay-box {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      z-index: 310;
    
      .icon {
        width: 140px;
        height: 140px;
        margin: 0 auto 4px;
      
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    
      .character {
        width: 180px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-shadow: 0 0 8px rgba(0, 0, 0, 0.50);
      }
    }
    
    &.open {
      /*animation: open 0.3s;*/
      /*animation-fill-mode: forwards;*/
      opacity: 1;
      -webkit-transform: translateY(-100%);
      -moz-transform: translateY(-100%);
      -ms-transform: translateY(-100%);
      -o-transform: translateY(-100%);
      transform: translateY(-100%);
  
      &.horizontal {
        opacity: 1;
        transform: translateY(-100%) rotate(90deg);
        transform-origin: center center;
        width: 100vh;
        height: 100vw;
        top: calc((100vw + 100vh) / 2);
        left: calc((100vw - 100vh) / 2);
        object-fit: cover;
        
        .video-show-box {

          video {
            max-height: 100vw;
            object-fit contain;
          }
        }
      }
    }
  }
  
  @keyframes open {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    100% {
      opacity: 1;
      transform: translateY(-100%);
    }
  }
  
  .close {
    /*animation: close 0.3s;*/
    /*animation-fill-mode: forwards;*/
    opacity: 0;
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
    
    &.horizontal {
      opacity: 1;
      transform: translateY(0) rotate(0deg);
      transform-origin: center center;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
  
  @keyframes close {
    0% {
      opacity: 1;
      transform: translateY(-100%);
    }
    100% {
      opacity: 0;
      transform: translateY(0);
    }
  }


</style>


