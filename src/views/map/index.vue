<template>
  
  <div id="container">
    
    <div class="map-bar">
      <div class="map-bar__search"></div>
      <div class="map-bar__rank" @click.stop="openShopList"></div>
    </div>
    
    <div class="building-card" v-if="buildingDetailOpened">
      <div class="building-card__head">
      </div>
      <div class="building-card__body">
        <div class="building-card__body__title">
          <div class="building-card__body__title__name">
            {{currentBuilding.name}}
          </div>
          <div class="building-card__body__title__icon"></div>
        </div>
        <div class="building-card__body__attributes">
          <div class="building-card__body__attributes_line">
            <span>营业额 ￥3254.12</span><span>成交量 542</span>
          </div>
          <div class="building-card__body__attributes_line">
            <span>客单价 ￥56.3</span><span>效评 ￥670.2</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="heatmap" v-if="!heatmapOpend"
         @click="heatmapToggle(true)"></div>
    <div class="noheatmap" v-if="heatmapOpend"
         @click="heatmapToggle(false)"></div>
    <div class="heatmap-bar" v-if="heatmapOpend">
      <div
          v-bind:class="{ 'heatmap-bar__btn': true, 'heatmap-bar__btn_active': currentIndex == 0}"
          @click="heatmapChoose(0)">综合
      </div>
      <div
          v-bind:class="{ 'heatmap-bar__btn': true, 'heatmap-bar__btn_active': currentIndex == 1}"
          @click="heatmapChoose(1)">客流量
      </div>
      <div
          v-bind:class="{ 'heatmap-bar__btn': true, 'heatmap-bar__btn_active': currentIndex == 2}"
          @click="heatmapChoose(2)">客单价
      </div>
    </div>
  
    
    <!-- 遮罩层 -->
    <div class="shade" v-if="shadeVisible" @click.stop="closeShade"></div>
    <!--<shade :shade-visible="shadeVisible"></shade>-->
    
    <!-- 店铺列表弹出 -->
    <div class="shop-list-popup" v-if="shopListPopupVisible">
      <div class="shop-list-popup__hd">
        <div class="icon" @click.stop="openDistancePopup">
          <img src="@/assets/images/shopl_local@2x.png">
        </div>
        <div class="text">附近</div>
      </div>
      <div class="sort-box"
           :class="{z2: sortPopupVisible}">
        <div class="item item_first" @click.stop="openSortPopup">
          <div class="text">{{currentProp.label}}</div>
          <div class="icon">
            <img src="@/assets/images/shop_arrow_down@2x.png">
          </div>
        </div>
        <div class="item">
          <div class="text">销量</div>
          <div class="icon">
            <img src="@/assets/images/shop_balance@2x.png">
          </div>
        </div>
        <div class="item">
          <div class="text">距离</div>
        </div>
      </div>
      <div class="shop-list-popup__bd">
        <div class="shop-box"
             v-for="(shop, shopIndex) in shopList"
             :key="shopIndex">
          <div class="shop-box__bd">
            <div class="rank">{{shopIndex}}</div>
            <div class="shop-name">{{shop.name}}</div>
            <div class="shop-location">
              <div class="distance">{{shop.distance}}</div>
              <div class="location">{{shop.location}}</div>
            </div>
            <div class="shop-info">
              <div class="detail">
                <div class="item">
                  <div class="character">营业额</div>
                  <div class="num">￥{{shop.turnover}}</div>
                </div>
                <div class="item">
                  <div class="character">成交量</div>
                  <div class="num">{{shop.vol}}</div>
                </div>
                <div class="item">
                  <div class="character">客单价</div>
                  <div class="num">￥{{shop.pct}}</div>
                </div>
                <div class="item">
                  <div class="character">坪效</div>
                  <div class="num">￥{{shop.lge}}</div>
                </div>
              </div>
              <div class="time">
                <div class="icon">
                  <img src="@/assets/images/map/shopmap_tel.png">
                </div>
                <div class="character">营业时间：</div>
                <div class="num">{{shop.time}}</div>
              </div>
            </div>
          </div>
  
          <div class="btn btn_phone">
            <div class="icon">
              <img src="@/assets/images/map/shopmap_tel@2x.png"/>
            </div>
            <div class="text">电话</div>
          </div>
          <div class="btn btn_route">
            <div class="icon">
              <img src="@/assets/images/map/shopmap_route@2x.png"/>
            </div>
            <div class="text">路线</div>
          </div>
        </div>
      </div>
      
      <!-- 盒子内部遮罩层 -->
      <div class="popup-shade"
           v-if="popupShadeVisible"
           @click="closePopupShade"></div>
      
      <!-- 盒子内部弹窗 -->
      <div class="sort-popup" v-if="sortPopupVisible">
        <div class="select-box select-box_prop">
          <div class="title">属性</div>
          <div class="list list_props">
            <div class="item item_prop"
                 :class="{
                  nm: (propIndex + 1) % 4 === 0,
                  active: currentProp.value === prop.value
                 }"
                 v-for="(prop, propIndex) in props"
                 :key="prop.value" @click="propItemClick(prop)">
              {{prop.label}}
            </div>
          </div>
        </div>
        <div class="select-box select-box_sort">
          <div class="title">排序</div>
          <div class="list list_props">
            <div class="item item_prop"
                 :class="{active: currentSort === sort.value}"
                 v-for="sort in sorts"
                 :key="sort.value"
                 @click="sortItemClick(sort)">
              {{sort.label}}
            </div>
          </div>
        </div>
        <div class="confirm-btn" @click="sortConfirm">确定</div>
      </div>
      
      <div class="distance-popup" v-if="distancePopupVisible">
        <div class="distance-popup__tabs">
          <div class="tab active">商区</div>
          <div class="tab">地铁</div>
        </div>
        <div class="distance-popup__bd">
          <div class="left">
            <div class="range"
                 :class="{active: currentRange === range}"
                 v-for="range in ranges"
                 :key="range" @click="rangeAreaSelect(range)">
              {{range}}
            </div>
          </div>
          <div class="right">
            <div class="character">距离</div>
            <div class="nearby" v-if="currentRange === '附近'">附近 (智能范围)</div>
            <div class="distance"
                 :class="{active: currentDistance === distance}"
                 v-for="distance in distances"
                 :key="distance" @click="rangeDistanceSelect(distance)">
              <div class="text">{{distance}}</div>
              <div class="icon">
                <img src="@/assets/images/shop_select@2x.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import {FamilyApi} from '@/service/FamilyApi'
  import Shade from '@/components/common/Shade'
  
  export default {
    components: {
      Shade
    },
    data: () => {
      return {
        map: null,
        center: {
          lng: 121.416405,
          lat: 31.16791
        },
        currentBuilding: null,
        buildingDetailOpened: false,
        heatmapOpend: false,
        
        heatmaps: [],
        currentIndex: 0,
        
        shadeVisible: false,
        shopListPopupVisible: false,
        shopList: [{
          name: '全家便利店 (虹梅路三店虹梅路三店虹梅梅路)…',
          distance: '小于100米',
          location: '宜山路2007号',
          turnover: '3254.12',
          vol: '542',
          pct: '56.3',
          lge: '670.2',
          time: '00:00-24:00'
        },{
          name: '全家便利店 (虹梅路二店)',
          distance: '433米',
          location: '宜山路2007号',
          turnover: '3254.12',
          vol: '542',
          pct: '56.3',
          lge: '670.2',
          time: '00:00-24:00'
        },{
          name: '全家便利店 (宜山路)',
          distance: '654米',
          location: '宜山路2007号',
          turnover: '3254.12',
          vol: '542',
          pct: '56.3',
          lge: '670.2',
          time: '00:00-24:00'
        },{
          name: '全家便利店 (虹梅路三店虹梅路三店虹梅梅路)…',
          distance: '766米',
          location: '宜山路2007号',
          turnover: '3254.12',
          vol: '542',
          pct: '56.3',
          lge: '670.2',
          time: '00:00-24:00'
        }],
        
        popupShadeVisible: false,
        sortPopupVisible: false,
        distancePopupVisible: false,
        
        props: [
          {
            label: '综合',
            value: 'multiple'
          },{
            label: '营业额',
            value: 'turnover'
          },{
            label: '客单价',
            value: 'pct'
          },{
            label: '坪效',
            value: 'lge'
          }
        ],
        sorts: [
          {
            label: '由高到低',
            value: 'desc'
          },{
            label: '由低到高',
            value: 'asc'
          }
        ],
        currentProp: {
          label: '综合',
          value: 'multiple'
        },
        currentSort: '',
        
        ranges: ['附近','热门商区','静安区','长宁区','徐汇区','杨浦区','虹口区'],
        distances: ['500米', '1000米', '2000米'],
        currentRange: '附近',
        currentDistance: '500米'
      }
    },
    methods: {
      
      initGeolocation: function () {
        
        this.map.plugin('AMap.Geolocation', () => {
          
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(16, 24),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          });
          this.map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', (res) => {
            console.debug("定位成功");
            console.debug(res);
            this.setCenter(res.position.lng, res.position.lat);
          });//返回定位信息
          AMap.event.addListener(geolocation, 'error', (error) => {
            console.debug("定位异常");
            console.debug(error);
          });//返回定位出错信息
          
        });
        
      },
      initBuilding: function () {
        
        //全家信息
        FamilyApi.getBuildingList().then((res) => {
          
          let buildingList = res.data;
          for (let building of buildingList) {
            let name = building.name;
            let lng = building.lng;
            let lat = building.lat;
            let icon = building.icon;
            let selectedIcon = building.selectedIcon;
            let marker = new AMap.Marker({
              position: new AMap.LngLat(lng, lat),
              icon: new AMap.Icon({
                size: new AMap.Size(56, 56),
                image: icon,
                imageSize: new AMap.Size(56, 56)
              }),
              //offset: new AMap.Pixel(-13, -30)
              //cursor: 'bottom-center'
            });
            marker.select = () => {
              marker.setIcon(new AMap.Icon({
                size: new AMap.Size(56, 56),
                image: selectedIcon,
                imageSize: new AMap.Size(56, 56)
              }));
            };
            marker.unSelect = () => {
              marker.setIcon(new AMap.Icon({
                size: new AMap.Size(56, 56),
                image: icon,
                imageSize: new AMap.Size(56, 56)
              }));
            }
            marker.name = name;
            marker.on("click", () => {
              this.showBuildingDetail(marker);
            });//点击事件
            this.map.add(marker);
          }
          
        }).catch((e) => {
          console.error("获取建筑物列表异常: ", e);
        });
        
      },
      //热力图展示
      initHeapMap: function () {
        
        this.map.plugin(["AMap.Heatmap"], () => {
          
          //pv热力图
          FamilyApi.getBuildingList().then(res => {
            
            {
              let max = 0;
              let buildingPvList = res.data.map((building) => {
                building.score && max < building.score && (max = building.score);
                return {
                  lng: building.lng,
                  lat: building.lat,
                  count: building.score
                }
              });
              this.heatmaps[0] = new AMap.Heatmap(this.map, {
                radius: 50, //给定半径
                opacity: [0, 0.8]
              });
              this.heatmaps[0].setDataSet({
                data: buildingPvList,
                max: max
              });
              this.heatmaps[0].hide();
            }
            
            {
              let max = 0;
              let buildingPvList = res.data.map((building) => {
                building.pv && max < building.pv && (max = building.pv);
                return {
                  lng: building.lng,
                  lat: building.lat,
                  count: building.pv
                }
              });
              this.heatmaps[1] = new AMap.Heatmap(this.map, {
                radius: 50, //给定半径
                opacity: [0, 0.8]
              });
              this.heatmaps[1].setDataSet({
                data: buildingPvList,
                max: max
              });
              this.heatmaps[1].hide();
            }
            
            {
              let max = 0;
              let buildingPpList = res.data.map((building) => {
                building.pp && max < building.pp && (max = building.pp);
                return {
                  lng: building.lng,
                  lat: building.lat,
                  count: building.pp
                }
              });
              this.heatmaps[2] = new AMap.Heatmap(this.map, {
                radius: 50, //给定半径
                opacity: [0, 0.8]
              });
              this.heatmaps[2].setDataSet({
                data: buildingPpList,
                max: max
              });
              this.heatmaps[2].hide();
            }
            
          }).catch(e => {
            console.error("获取建筑物pv,pp列表异常: ", e);
          });
          
        });
        
      },
      setCenter: function (lng, lat) {
        
        //改变中心点
        this.center.lng = lng;
        this.center.lat = lat;
      },
      //建筑物详情展示
      showBuildingDetail: function (marker) {
        //TODO
        console.debug("展示建筑物详情 TODO");
        console.debug(marker);
        
        if (this.currentBuilding) {
          
          this.currentBuilding.unSelect();
          
          if (this.currentBuilding.name !== marker.name) {
            this.currentBuilding = marker;
            this.currentBuilding.select();
            this.buildingDetailOpened = true;
          } else {
            this.currentBuilding = null;
            this.buildingDetailOpened = false;
          }
          
        } else {
          
          this.currentBuilding = marker;
          this.currentBuilding.select();
          this.buildingDetailOpened = true;
        }
        
      },
      heatmapToggle: function (state) {
        this.heatmapOpend = state;
        if (!this.heatmapOpend) {
          for (let index in this.heatmaps) {
            this.heatmaps[index].hide();
          }
          this.currentIndex = 0;
        } else {
          this.heatmaps[this.currentIndex].show();
        }
        
      },
      
      heatmapChoose: function (currentIndex) {
        for (let index in this.heatmaps) {
          if (index == currentIndex) {
            this.heatmaps[index].show();
          } else {
            this.heatmaps[index].hide();
          }
        }
        this.currentIndex = currentIndex;
      },
      
      // 点击打开排行
      openShopList() {
        this.shadeVisible = true;
        this.shopListPopupVisible = true;
      },
      
      // 关闭遮罩
      closeShade() {
        this.shopListPopupVisible = false;
        this.sortPopupVisible = false;
        this.distancePopupVisible = false;
        this.popupShadeVisible = false;
        this.shadeVisible = false;
      },
      
      // 打开排序弹窗
      openSortPopup() {
        this.popupShadeVisible = true;
        this.sortPopupVisible = true;
      },
      
      // 打开范围弹窗
      openDistancePopup() {
        this.popupShadeVisible = true;
        this.distancePopupVisible = true;
      },
      
      // 选择排序属性
      propItemClick(prop) {
        if (this.currentProp.value !== prop.value) {
          this.currentProp.value = prop.value;
          this.currentProp.label = prop.label;
        }
      },
      
      // 选择排序方式
      sortItemClick(sort) {
        if (this.currentSort !== sort.value) {
          this.currentSort = sort.value;
        }
      },
      
      // 确认排序方式
      sortConfirm() {
        this.sortPopupVisible = false;
        this.popupShadeVisible = false;
      },
      
      // 选择范围区域
      rangeAreaSelect(range) {
        if (this.currentRange !== range) {
          this.currentRange = range;
        }
      },
      
      // 选择范围
      rangeDistanceSelect(distance) {
        if (this.currentDistance !== distance) {
          this.currentDistance = distance;
        }
        this.distancePopupVisible = false;
        this.popupShadeVisible = false;
      },
  
      // 点击popup内遮罩
      closePopupShade() {
        this.sortPopupVisible = false;
        this.distancePopupVisible = false;
        this.popupShadeVisible = false;
      },
    },
    mounted: function () {

      let recaptchaScript = document.createElement('script');
      recaptchaScript.setAttribute('src', 'https://webapi.amap.com/maps?v=1.4.14&key=687288a4144c83a67b11a316ec4c35bb');
      document.head.appendChild(recaptchaScript);
      recaptchaScript.onload = () => {

        console.debug("高德地图加载成功");

        //初始化地图对象，加载地图
        this.map = new AMap.Map("container", {
          zoom: 15,
          resizeEnable: false,
          zoomEnable: false
        });

        //定位
        this.initGeolocation();

        //加载全家便利店
        this.initBuilding();

        //加载热力度
        this.initHeapMap();

        //添加/移除建筑物
        // let marker = new AMap.Marker({
        //   position: new AMap.LngLat(lng, lat),
        //   icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        //   //offset: new AMap.Pixel(-13, -30)
        // 	cursor: 'bottom-center'
        // });
        // marker.on("click", () => {
        //   console.info("你点击了我.....")
        // 	//切换图片
        //   //marker.setIcon("https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=139522464,1276766862&fm=179&app=42&f=JPEG?w=121&h=121");
        // });//点击事件
        // map.add(marker);
        // setTimeout(() => {
        //   map.remove(marker);
        // }, 5000);

        //热力点
        // map.plugin(["AMap.Heatmap"], function () {
        //   //初始化heatmap对象
        //   let heatmap = new AMap.Heatmap(map, {
        //     radius: 50, //给定半径
        //     opacity: [0, 0.8]
        //     /*,
        // 		gradient:{
        // 				0.5: 'blue',
        // 				0.65: 'rgb(117,211,248)',
        // 				0.7: 'rgb(0, 255, 0)',
        // 				0.9: '#ffea00',
        // 				1.0: 'red'
        // 		}
        // 		 */
        //   });
        //   //设置数据集：该数据为北京部分“公园”数据
        //   heatmap.setDataSet({
        //     data: [{
        //       "lng": lng,
        // 			"lat": lat,
        // 			count: 100
        // 		}],
        //     max: 100
        //   });
        //
        //   heatmap.show();
        //
        // });
      }
    }
  }
</script>
<style scoped>
  #container {
    width: 100%;
    height: 100%;
  }
  
  .building-card {
    
    text-align: justify;
    
    position: absolute;
    z-index: 101;
    
    left: 20px;
    bottom: 30px;
    width: 710px;
    height: 166px;
    
    opacity: 0.9;
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.10);
    border-radius: 12px;
    
    display: flex;
    align-items: center;
    
  }
  
  .building-card__head {
    
    position: relative;
    margin-left: 14px;
    
    width: 138px;
    height: 138px;
    background-image: url("http://pqgihe8li.bkt.clouddn.com/shop_4.png");
    background-size: contain;
    
  }
  
  .building-card__body {
    
    position: relative;
    
    padding-top: 24px;
    padding-left: 18px;
    padding-bottom: 27px;
    
  }
  
  .building-card__body__title {
    
    height: 42px;
    
    display: flex;
    align-items: center;
    
  }
  
  .building-card__body__title__name {
    
    width: 466px;
    
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #262626;
    
  }
  
  .building-card__body__title__icon {
    margin-left: 20px;
    background-image: url("../../assets/images/map/shopmap_chat@3x.png");
    background-size: contain;
    width: 34px;
    height: 34px;
  }
  
  .building-card__body__attributes {
    margin-top: 19px;
  }
  
  .building-card__body__attributes_line {
    display: flex;
  }
  
  .building-card__body__attributes_line span {
    width: 233px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #8D93A4;
    text-align: justify;
  }
  
  .map-bar {
    z-index: 100;
    position: absolute;
    left: 24px;
    top: 24px;
    
    display: flex;
    align-items: center;
  }
  
  .map-bar__search {
    
    position: relative;
    
    background-image: url("../../assets/images/map/search@3x 2.png");
    background-size: cover;
    width: 610px;
    height: 78px;
    background-repeat: no-repeat;
    
  }
  
  .map-bar__rank {
    
    position: relative;
    padding-left: 16px;
    
    background-image: url("../../assets/images/map/shopmap_shop.png");
    background-size: contain;
    width: 84px;
    height: 84px;
  }
  
  .heatmap {
    
    position: absolute;
    z-index: 100;
    right: 16px;
    bottom: 130px;
    
    background-image: url("../../assets/images/map/shopmap_thermal.png");
    background-size: contain;
    width: 96px;
    height: 96px;
  }
  
  .noheatmap {
    position: absolute;
    z-index: 100;
    right: 16px;
    bottom: 130px;
    
    background-image: url("../../assets/images/map/shopmap_map.png");
    background-size: contain;
    width: 96px;
    height: 96px;
  }
  
  .heatmap-bar {
    position: absolute;
    z-index: 100;
    left: 175px;
    bottom: 44px;
    
    display: flex;
    width: 420px;
  }
  
  .heatmap-bar__btn {
    
    position: relative;
    
    width: 118px;
    height: 46px;
    margin-right: 20px;
    
    opacity: 0.9;
    background: rgba(255, 255, 255, 0.70);
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.10);
    border-radius: 22.4px;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .heatmap-bar__btn_active {
    font-family: PingFangSC-Regular;
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    background: #262626;
    border-radius: 22.4px;
  }
  
  .shade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.6);
    z-index: 10000;
  }
  
  .shop-list-popup {
    width: 100%;
    height: 91.7%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10001;
    background: #ffffff;
    border-radius: 20px 20px 0 0;
  }
  
  .shop-list-popup__hd {
    width: 100%;
    height: 53px;
    border-radius: 20px 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    border-bottom: 1px solid #EEEEEE;
  }
  
  .shop-list-popup__hd .icon {
    width: 32px;
    height: 32px;
    margin: 0 8px 0 0;
  }

  .shop-list-popup__hd .icon img {
    width: 100%;
    height: 100%;
  }

  .shop-list-popup__hd .text {
    height: 33px;
    line-height: 33px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #575C68;
  }
  
  .shop-list-popup .sort-box {
    width: 100%;
    height: 62px;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: #ffffff;
  }
  
  .shop-list-popup .sort-box .item {
    padding: 0 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
  }

  .shop-list-popup .sort-box .item .text {
    height: 37px;
    line-height: 37px;
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #8D93A4;
    text-align: justify;
    margin: 0 4px 0 0;
  }

  .shop-list-popup .sort-box .item.item_first .text {
    font-family: PingFangSC-Medium;
    color: #262626;
  }

  .shop-list-popup .sort-box .item .icon {
    width: 24px;
    height: 24px;
  }

  .shop-list-popup .sort-box .item .icon img {
    width: 100%;
    height: 100%;
  }

  .shop-list-popup__bd {
    width: 100%;
    height: 1108px;
    background: #ffffff;
    padding: 0 30px;
  }

  .shop-list-popup__bd .shop-box {
    width: 100%;
    height: 262px;
    padding: 30px 0 0 30px;
    border-bottom: 1px solid rgba(238,238,238,0.6);
    position: relative;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd {
    width: 100%;
    position: relative;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .rank {
    position: absolute;
    top: 0;
    left: -30px;
    font-family: SFUIDisplay-Regular;
    font-size: 24px;
    color: #8D93A4;
    text-align: justify;
    height: 42px;
    line-height: 42px;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-name {
    width: 100%;
    height: 42px;
    line-height: 42px;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #262626;
    text-align: justify;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 0 6px 0;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-location {
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
    font-size: 0;
    margin: 0 0 19px 0;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-location .distance {
    height: 37px;
    line-height: 37px;
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #575C68;
    margin: 0 25px 0 0;
    position: relative;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-location .distance:after {
    content: '';
    width: 1px;
    height: 22px;
    background: #D8D8D8;
    position: absolute;
    right: -12px;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-location .location {
    height: 37px;
    line-height: 37px;
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #575C68;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info {
    width: 100%;
    
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info .detail {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    margin: 0 0 6px 0;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info .detail .item {
    height: 33px;
    display: flex;
    align-items: center;
    margin: 0 60px 2px 0;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info .detail .item .character {
    height: 33px;
    line-height: 33px;
    margin: 0 10px 0 0;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #8D93A4;
    text-align: justify;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info .detail .item .num {
    height: 31px;
    line-height: 31px;
    font-family: SFUIDisplay-Regular;
    font-size: 26px;
    color: #8D93A4;
    text-align: justify;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info .time {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info .time .icon {
    width: 22px;
    height: 22px;
    margin: 0 6px 0 0;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info .time .icon img {
    width: 100%;
    height: 100%;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info .time .character {
    height: 30px;
    line-height: 30px;
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #8D93A4;
    text-align: justify;
  }

  .shop-list-popup__bd .shop-box .shop-box__bd .shop-info .time .num {
    height: 30px;
    line-height: 30px;
    font-family: SFUIDisplay-Regular;
    font-size: 22px;
    color: #8D93A4;
    text-align: justify;
  }

  .shop-list-popup__bd .shop-box > .btn {
    width: 92px;
    height: 131px;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
    bottom: 0;
  }

  .shop-list-popup__bd .shop-box > .btn .icon {
    width: 50px;
    height: 50px;
    margin: 0 0 4px 0;
  }

  .shop-list-popup__bd .shop-box > .btn .icon img {
    width: 100%;
    height: 100%;
  }

  .shop-list-popup__bd .shop-box > .btn .text {
    height: 25px;
    line-height: 25px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #8D93A4;
    text-align: justify;
  }
  
  .btn.btn_phone {
    right: 75px;
  }
  
  .btn.btn_route {
    right: -17px;
  }
  
  /*店铺列表弹窗内部弹窗样式*/
  .popup-shade {
    width: 100%;
    height: 1170px;
    position: absolute;
    top: 54px;
    left: 0;
    background: rgba(0,0,0,0.6);
    z-index: 1;
  }
  
  .shop-list-popup .sort-box.z2 {
    position: relative;
    z-index: 2;
  }
  
  
  .shop-list-popup .sort-popup {
    width: 100%;
    position: absolute;
    top: 115px;
    left: 0;
    background: #ffffff;
    z-index: 2;
    padding: 28px 30px 0;
  }

  .shop-list-popup .sort-popup .select-box {
    width: 100%;
    margin: 0 0 38px 0;
  }

  .shop-list-popup .sort-popup .select-box .title {
    width: 100%;
    height: 33px;
    line-height: 33px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #8D93A4;
    text-align: justify;
    margin: 0 0 12px 0;
  }

  .shop-list-popup .sort-popup .select-box .list {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .shop-list-popup .sort-popup .select-box .list .item {
    width: 158px;
    height: 56px;
    line-height: 56px;
    background: #F4F4F4;
    border-radius: 30px;
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #575C68;
    text-align: center;
    margin: 0 18px 0 0;
  }

  .shop-list-popup .sort-popup .select-box .list .item.nm {
    margin: 0 0 0 0;
  }

  .shop-list-popup .sort-popup .select-box .list .item.active {
    background: #262626;
    color: #ffffff;
  }
  
  .shop-list-popup .sort-popup .confirm-btn {
    width: 240px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    border-radius: 8px;
    background: #FFE30F;
    margin: 0 0 26px 0;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #262626;
    position: relative;
    left: 454px;
  }

  
  .shop-list-popup .distance-popup {
    width: 100%;
    position: absolute;
    top: 53px;
    left: 0;
    background: #ffffff;
    z-index: 2;
  }

  .shop-list-popup .distance-popup .distance-popup__tabs {
    width: 100%;
    height:  60px;
    background: #ffffff;
    display: flex;
    border-bottom: 1px solid #EEEEEE;
  }

  .shop-list-popup .distance-popup .distance-popup__tabs .tab {
    flex: 1;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #575C68;
  }

  .shop-list-popup .distance-popup .distance-popup__tabs .tab.active {
    color: #F9AB10;
  }

  .shop-list-popup .distance-popup .distance-popup__bd {
    width: 100%;
    display: flex;
    background: #ffffff;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .left {
    flex: 1;
    height: 750px;
    overflow: scroll;
    background: #F6F6F6;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .left .range {
    width: 100%;
    height: 98px;
    line-height: 98px;
    padding: 0 0 0 44px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #575C68;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .left .range.active {
    background: #ffffff;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .right {
    flex: 1;
    height: 750px;
    overflow: scroll;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .right .character {
    width: 100%;
    height: 62px;
    line-height: 30px;
    padding: 32px 0 0 44px;
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #8D93A4;
    text-align: left;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .right .nearby {
    width: 100%;
    height: 88px;
    line-height: 88px;
    padding: 0 0 0 44px;
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #575C68;
    text-align: left;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .right .distance {
    width: 100%;
    height: 88px;
    padding: 0 28px 0 44px;
    display: flex;
    align-items: center;
    position: relative;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .right .distance .text {
    font-family: SFUIDisplay-Medium;
    font-size: 26px;
    color: #575C68;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .right .distance .icon {
    display: none;
    width: 44px;
    height: 44px;
    position: absolute;
    right: 28px;
  }
  
  .shop-list-popup .distance-popup .distance-popup__bd .right .distance .icon img {
    width: 100%;
    height: 100%;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .right .distance.active .text {
    color: #F9AB10;
  }

  .shop-list-popup .distance-popup .distance-popup__bd .right .distance.active .icon {
    display: block;
  }
</style>
