<template>
  <div class="container container_good-detail">
    <!-- 图片轮播 -->
    <div class="good-images-box">
      <mt-swipe :auto="0" class="mint-swipe_good-detail">
        <mt-swipe-item class="swipe-item-1 item"
                       v-for="(src, srcIndex) in goodsDetailData.headIds"
                       :key="srcIndex">
          <img :src="src">
        </mt-swipe-item>
        <!--<mt-swipe-item class="swipe-item-2 item">-->
        <!--<img :src="src2">-->
        <!--</mt-swipe-item>-->
        <!--<mt-swipe-item class="swipe-item-3 item">-->
        <!--<img :src="src3">-->
        <!--</mt-swipe-item>-->
      </mt-swipe>
      <div class="btn btn_back" @click="$router.go(-1)">
        <img src="@/assets/images/shop_back_fill@2x.png"/>
      </div>
      <div class="btn btn_warehouse">
        <img src="@/assets/images/shop_warehouse_fill@2x.png"/>
        <div class="num">6</div>
      </div>
      <div class="btn btn_add">
        <img src="@/assets/images/shop_add_fill@2x.png"/>
      </div>
    </div>
    
    <!-- 主体盒子 -->
    <div class="main-box main-box_good-detail">
      <!-- 商品介绍 -->
      <div class="good-desc">
        <div class="top">
          <div class="name">
            {{goodsDetailData.name}}
          </div>
          <div class="money-box money-box_price">
            <div class="money-box__left">
              <div class="character">售价</div>
              <div class="num">
                <div class="icon">
                  <img src="@/assets/images/shop_money@2x.png"/>
                </div>
                <div class="text">{{goodsDetailData.price}}</div>
              </div>
            </div>
            <div class="money-box__right">
              <div class="character">今日进货</div>
              <div class="num">{{goodsDetailData.purchase}}</div>
            </div>
          </div>
          <div class="money-box money-box_profit">
            <div class="money-box__left">
              <div class="character">毛利</div>
              <div class="num">
                <div class="icon">
                  <img src="@/assets/images/shop_money@2x.png"/>
                </div>
                <div class="text">{{goodsDetailData.profit}}</div>
              </div>
            </div>
            <div class="money-box__right">
              <div class="character">总仓库存</div>
              <div class="num">{{goodsDetailData.warehouse}}</div>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="activity" @click.stop="openActivityPopup">
            <div class="character">活动</div>
            <div class="text">优惠活动信息</div>
            <div class="next-btn">
              <img src="@/assets/images/arrow_enter_g@2x.png">
            </div>
          </div>
          <div class="service">
            <div class="character">服务</div>
            <div class="text">服务内容</div>
            <div class="next-btn">
              <img src="@/assets/images/arrow_enter_g@2x.png">
            </div>
          </div>
          <div class="dispatch" @click.stop="openDispatchPopup">
            <div class="character">配送</div>
            <div class="text">今天21:09</div>
            <div class="next-btn">
              <img src="@/assets/images/arrow_enter_g@2x.png">
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="character">已选</div>
          <div class="text">商品规格</div>
          <div class="next-btn">
            <img src="@/assets/images/arrow_enter_g@2x.png">
          </div>
        </div>
      </div>
      
      <!-- 商品数据或店铺数据 -->
      <div class="good good_report">
        <div class="title">
          <div class="left-block"></div>
          <div class="text" v-if="isStocked">店铺数据</div>
          <div class="text" v-else>商品数据</div>
          
          <div class="report-icon" @click.stop="turnToReport">
            <img src="@/assets/images/shop_report@2x.png">
          </div>
          <div class="next-btn" @click.stop="turnToReport">
            <img src="@/assets/images/arrow_enter_b@2x.png">
          </div>
        </div>
        <div class="good__bd">
          <div class="shop-data" v-if="isStocked">
            <div>今日销量 {{shopData.sales}}</div>
            <div>剩余库存 {{shopData.inventory}}</div>
            <div>动销率 {{shopData.mprate}}</div>
            <div>库销比 {{shopData.sinkToPin}}</div>
          </div>
          <div class="good-data" v-else>
            <div>动销率 {{goodData.mprate}}</div>
            <div>库销比 {{goodData.sinkToPin}}</div>
            <div>退货率 {{goodData.returnRate}}</div>
          </div>
        </div>
      </div>
      
      <!-- 商品评价 -->
      <div class="good good_comment">
        <div class="title">
          <div class="left-block"></div>
          <div class="text">商品评价</div>
          <div class="all-text">查看全部</div>
          <div class="next-btn">
            <img src="@/assets/images/arrow_enter_b@2x.png">
          </div>
        </div>
        <div class="good__bd">
          <div class="keyword-box">
            <div class="keyword"
                 v-for="(keyword, keywordIndex) in commentKeywords"
                 :key="keywordIndex">{{keyword}}
            </div>
          </div>
          <div class="comment-box"
               v-for="(comment, commentIndex) in comments"
               :key="commentIndex">
            <div class="author">
              <div class="portrait">
                <!--<img :src="comment.author.portrait">-->
              </div>
              <div class="nickname">{{comment.author.name}}</div>
              <div class="like">
                <div class="icon">
                  <img v-if="comment.isLike"
                       src="@/assets/images/fabulous_pre_b@2x.png">
                  <img v-else
                       src="@/assets/images/fabulous_nor@2x.png">
                </div>
                <div class="num" v-if="comment.like">{{comment.like}}</div>
              </div>
            </div>
            <div class="text">{{comment.text}}</div>
            <div class="images">
              <div class="image"
                   v-for="(image, imageIndex) in comment.images"
                   :key="imageIndex">
                <img :src="image.url">
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 相似商品-->
      <div class="good good_similar">
        <div class="title">
          <div class="left-block"></div>
          <div class="text">相似商品</div>
        </div>
        <div class="good__bd">
          <div class="similar-box"
               v-for="(similar, similarIndex) in goodsDetailData.similars"
               :key="similarIndex">
            <div class="img">
              <img :src="similar.headId">
            </div>
            <div class="name">{{similar.name}}</div>
            <div class="price">
              <div class="icon">
                <img src="@/assets/images/shop_money@2x.png">
              </div>
              <div class="num">{{similar.price}}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 商品详情 -->
      <div class="good good_detail">
        <div class="title">
          <div class="left-block"></div>
          <div class="text">商品详情</div>
        </div>
        <div class="good__bd">
          <div class="image"
               v-for="(img, imgIndex) in goodsDetailData.details"
               :key="imgIndex">
            <img :src="img">
          </div>
          <!--<div class="image">-->
          <!--<img src="@/assets/images/img2@2x.png">-->
          <!--</div>-->
          <!--<div class="image">-->
          <!--<img src="@/assets/images/img3@2x.png">-->
          <!--</div>-->
        </div>
      </div>
    </div>
    
    <!-- 底部功能栏 -->
    <div class="footer">
      <div class="help-btn">
        <div class="icon">
          <img src="@/assets/images/shop_service@2x.png"/>
        </div>
        <div class="text">客服</div>
      </div>
      <div class="collect-btn">
        <div class="icon">
          <img src="@/assets/images/shop_collect@2x.png"/>
        </div>
        <div class="text">收藏</div>
      </div>
      <div class="add-list-btn" @click="goToPurchaseOrder()">加入进货单</div>
      <div class="stock-btn" @click="goToPurchaseOrderConfirm()">立即进货</div>
    </div>
    
    <!-- 弹出 -->
    <!-- 遮罩 -->
    <div class="shade" v-if="shadeVisible" @click.stop="onShadeClick"></div>
    <!-- 活动 -->
    <div class="activity-popup" v-if="activityPopupVisible">
      <div class="header">
        <div class="text">活动</div>
        <div class="close-btn" @click.stop="closeActivityPopup">
          <img src="@/assets/images/close_envelop@2x.png">
        </div>
      </div>
      <div class="bd">
        <div class="activity">
          <div class="icon">
            <img src="@/assets/images/shop_promotion@2x.png">
          </div>
          <div class="detail">促销内容促销内容促销内容促销内容促销内容促销内容促销内容促销内容促销内容促销内容促销内容</div>
        </div>
        <div class="activity">
          <div class="icon">
            <img src="@/assets/images/shop_promotion@2x.png">
          </div>
          <div class="detail">折扣折扣折扣内容</div>
        </div>
      </div>
    </div>
    <!-- 配送 -->
    <div class="dispatch-popup" v-if="dispatchPopupVisible">
      <div class="dates">
        <div class="date"
             :class="{active: dateIndex === currentDateIndex}"
             v-for="(date, dateIndex) in dispatchDate"
             :key="dateIndex" @click="choseDate(dateIndex)">
          {{date}}
        </div>
      </div>
      <div class="times">
        <div class="time"
             :class="{active: timeIndex === currentTimeIndex}"
             v-for="(time, timeIndex) in dispatchTime"
             :key="timeIndex" @click="choseTime(timeIndex)">
          <div class="text">{{time}}</div>
          <div class="icon">
            <img src="@/assets/images/shop_select@2x.png">
          </div>
        </div>
      </div>
    </div>
    
    <toast :toastVisible="tipVisible" :toast-data="tipData"></toast>
  </div>
</template>

<script>
  // import Bscroll from 'better-scroll'
  // import { GoodsApi } from "../../service/GoodsApi";
  import {mapActions} from 'vuex'
  import store from '@/store/index'
  import eventBus from '@/assets/js/eventBus'
  import Toast from '@/components/common/Toast'
  
  export default {
    name: "GoodsDetail",
    components: {
      Toast
    },
    data() {
      return {
        shopData: {
          sales: '105%',
          inventory: 2,
          mprate: '5%',
          sinkToPin: 2
        },
        goodData: {
          mprate: '105%',
          sinkToPin: 2,
          returnRate: '5%'
        },
        commentKeywords: [
          '评论关键词(53)',
          '关键词(53)',
          '关键关键词关键词词(453)',
          '关键关键词关键词词(453)',
        ],
        comments: [
          {
            author: {
              name: '大K家的壁虎',
              portrait: ''
            },
            text: '2017年中国游戏直播平台市场规模为87亿元游戏直播市场稳步增长',
            images: [{
              url: require('@/assets/images/demo/comment_1.png'),
              width: 0,
              height: 0
            }, {
              url: require('@/assets/images/demo/comment_2.png'),
              width: 0,
              height: 0
            }, {
              url: require('@/assets/images/demo/comment_3.png'),
              width: 0,
              height: 0
            }],
            like: 0,
            isLike: false
          }, {
            author: {
              name: '用户昵称',
              portrait: ''
            },
            text: '2017年中国游戏稳步增长直播平台市场规模为87亿元游戏直播市场稳步增长稳步增长',
            images: [],
            like: 5424,
            isLike: true
          }
        ],
        similars: [
          {
            headId: require('@/assets/images/demo/comment_4.png'),
            name: '商a品商品商品名称商品名称商名称…',
            price: 39.6
          }, {
            headId: require('@/assets/images/demo/comment_5.png'),
            name: '商a品商品商品名称商品名称商名称…',
            price: 39.6
          }, {
            headId: require('@/assets/images/demo/comment_6.png'),
            name: '商a品商品商品名称商品名称商名称…',
            price: 39.6
          }
        ],
        // imageList: [],
        scroll: null,
        activityPopupVisible: false,
        dispatchPopupVisible: false,
        shadeVisible: false,
        dispatchDate: ['4月16日 [周二]', '4月17日 [周三]', '4月18日 [周四]', '4月19日 [周五]', '4月20日 [周一]'],
        dispatchTime: ['09:00-12:30', '13:00-15:30', '16:00-18:30', '19:00-21:30'],
        currentDateIndex: 0,
        currentTimeIndex: 0,
        
        // 测试商品是否未已进货商品
        isStocked: true,
        
        // 测试图片地址
        imageList: [
          require('@/assets/images/demo/goods_1.png'),
          require('@/assets/images/demo/goods_8.png'),
          // require('@/assets/images/demo/goods_1.png'),
          // require('@/assets/images/demo/goods_8.png')
        ],
        
        // 测试商品详情
        goodsDetailData: {},
        tipData: {
          icon: null,
          msg: ''
        },
        tipVisible: false
      }
    },
    created() {
      this.getGoodsDetailData();
    },
    destroyed() {
      eventBus.$emit('purchaseOrder', [this.goodsDetailData]);
    },
    mounted() {
      // if (this.$refs.wrapper) {
      //   this.scroll = new Bscroll(this.$refs.wrapper, {
      //     click: true,
      //     bounce: false
      //   });
      // }
      document.querySelector('.container_good-detail').addEventListener('touchStart', function (e) {
        console.debug('touchStart')
      });
    },
    methods: {
      ...mapActions([
        'REQUEST_API'
      ]),
      // 加入进货单
      goToPurchaseOrder() {
        // this.$router.push({
        //   name: "purchaseOrder"
        // })
        // store.commit('setPurchaseOrder', this.goodsDetailData);
        this.REQUEST_API({
          api: 'addGoods',
          params: {
            goodsData: this.goodsDetailData
          }
        }).then(res => {
          if (res.status === 200) {
            // console.debug('添加成功');
            this.tipData.msg = '添加成功';
            this.tipVisible = true;
            setTimeout(() => {
              this.tipVisible = false;
              this.tipData.msg = '';
            }, 2000);
          }
        }).catch(err => {
          console.debug('添加失败', err);
        });
      },
      //确认订单
      goToPurchaseOrderConfirm() {
        this.$router.push({
          name: "purchaseOrderConfirm"
        })
      },
      // 打开活动窗口
      openActivityPopup() {
        this.shadeVisible = true;
        this.activityPopupVisible = true;
      },
      
      // 打开配送窗口
      openDispatchPopup() {
        this.shadeVisible = true;
        this.dispatchPopupVisible = true;
      },
      
      // 关闭活动窗口
      closeActivityPopup() {
        this.activityPopupVisible = false;
        this.shadeVisible = false;
      },
      
      // 选择日期
      choseDate(index) {
        this.currentDateIndex = index;
      },
      
      // 选择时间
      choseTime(index) {
        this.currentTimeIndex = index;
        this.dispatchPopupVisible = false;
        this.shadeVisible = false;
      },
      
      // 点击遮罩层
      onShadeClick() {
        this.dispatchPopupVisible = false;
        this.activityPopupVisible = false;
        this.shadeVisible = false;
      },
      
      // 跳转至数据分析页
      turnToReport() {
        if (this.isStocked) {
          this.$router.push({
            path: '/stockedGoodsReport'
          });
        } else {
          this.$router.push({
            path: '/noStockedGoodsReport'
          });
        }
      },
      
      // 获取商品详情
      getGoodsDetailData() {
        this.REQUEST_API({
          api: 'getGoodsDetail',
          params: {
            id: this.$route.query.id
          }
        })
            .then((res) => {
              console.debug('获取商品数据成功');
              console.debug(res);
              if (res.data) {
                Object.assign(this.goodsDetailData, res.data);
              }
              this.$forceUpdate();
            }).catch((err) => {
          console.error('获取商品详情出错', err);
        });
      }
    }
  }
</script>

<style scoped lang="stylus" src="./GoodsDetail.styl"></style>
