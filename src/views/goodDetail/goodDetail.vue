<template>
  <div class="container container_good-detail">
    <!-- todo 图片轮播 -->
    <div class="good-images-box"></div>
    
    <!-- 主体盒子 -->
    <div class="main-box main-box_good-detail">
      <!-- 商品介绍 -->
      <div class="good-desc">
        <div class="top">
          <div class="name">
            商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商称商品名称商品名...
          </div>
          <div class="money-box money-box_price">
            <div class="money-box__left">
              <div class="character">售价</div>
              <div class="num">
                <div class="icon">
                  <img src="@/assets/images/shop_money@2x.png"/>
                </div>
                <div class="text">39.6</div>
              </div>
            </div>
            <div class="money-box__right">
              <div class="character">今日进货</div>
              <div class="num">3323</div>
            </div>
          </div>
          <div class="money-box money-box_profit">
            <div class="money-box__left">
              <div class="character">毛利</div>
              <div class="num">
                <div class="icon">
                  <img src="@/assets/images/shop_money@2x.png"/>
                </div>
                <div class="text">8.5</div>
              </div>
            </div>
            <div class="money-box__right">
              <div class="character">总仓库存</div>
              <div class="num">5432</div>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="activity">
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
          <div class="dispatch">
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
      
      <!-- 商品数据 -->
      <div class="good good_report">
        <div class="title">
          <div class="left-block"></div>
          <div class="text">商品数据</div>
          <div class="report-icon">
            <img src="@/assets/images/shop_report@2x.png">
          </div>
          <div class="next-btn">
            <img src="@/assets/images/arrow_enter_b@2x.png">
          </div>
        </div>
        <div class="good__bd">
          <!--<div class="shop-data">-->
            <!--<div>今日销量 {{shopData.sales}}</div>-->
            <!--<div>剩余库存 {{shopData.inventory}}</div>-->
            <!--<div>动销率 {{shopData.mprate}}</div>-->
            <!--<div>库销比 {{shopData.sinkToPin}}</div>-->
          <!--</div>-->
          <div class="good-data">
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
                 :key="keywordIndex">{{keyword}}</div>
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
                  <img  v-else
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
                <!--<img :src="image.url">-->
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
               v-for="(similar, similarIndex) in similars"
               :key="similarIndex">
            <div class="img">
              <!--<img :src="similar.headId">-->
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
          <div class="image">
            <img src="@/assets/images/img1@2x.png">
          </div>
          <div class="image">
            <img src="@/assets/images/img2@2x.png">
          </div>
          <div class="image">
            <img src="@/assets/images/img3@2x.png">
          </div>
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
      <div class="add-list-btn">加入进货单</div>
      <div class="stock-btn">立即进货</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodDetail",
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
              url: '',
              width: 0,
              height: 0
            },{
              url: '',
              width: 0,
              height: 0
            },{
              url: '',
              width: 0,
              height: 0
            }],
            like: 0,
            isLike: false
          },{
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
        similars: [{
          headId: '',
          name: '商a品商品商品名称商品名称商名称…',
          price: 39.6
        },{
          headId: '',
          name: '商a品商品商品名称商品名称商名称…',
          price: 39.6
        },{
          headId: '',
          name: '商a品商品商品名称商品名称商名称…',
          price: 39.6
        }],
        // imageList: [],
      }
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped lang="stylus" src="./goodDetail.styl"></style>
