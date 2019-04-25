<template>

	<div id="container">

		<div class="map-bar">
			<div class="map-bar__search"></div>
			<div class="map-bar__rank"></div>
		</div>

		<div class="building-card" v-if="buildingDetailOpened">
			<div class="building-card__head">
			</div>
			<div class="building-card__body">
				<div class="building-card__body__title">
					<div class="building-card__body__title__name">{{currentBuilding.name}}</div>
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

		<div class="heatmap" v-if="!heatmapOpend" @click="heatmapToggle(true)"></div>
		<div class="noheatmap" v-if="heatmapOpend" @click="heatmapToggle(false)"></div>
		<div class="heatmap-bar" v-if="heatmapOpend">
			<div v-bind:class="{ 'heatmap-bar__btn': true, 'heatmap-bar__btn_active': currentIndex == 0}"  @click="heatmapChoose(0)">综合</div>
			<div v-bind:class="{ 'heatmap-bar__btn': true, 'heatmap-bar__btn_active': currentIndex == 1}" @click="heatmapChoose(1)">客流量</div>
			<div v-bind:class="{ 'heatmap-bar__btn': true, 'heatmap-bar__btn_active': currentIndex == 2}" @click="heatmapChoose(2)">客单价</div>
		</div>

	</div>

</template>
<script>
	import {FamilyApi} from '@/service/FamilyApi'
	export default{
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
				currentIndex: 0
			}
		},
		methods:{

      initGeolocation: function() {

        this.map.plugin('AMap.Geolocation',  () => {

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
      initBuilding: function()  {

        //全家信息
        FamilyApi.getBuildingList().then((res) => {

          let buildingList = res.data;
          for(let building of buildingList){
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
			initHeapMap: function() {

        this.map.plugin(["AMap.Heatmap"],  () => {

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
      setCenter: function(lng, lat){

        //改变中心点
        this.center.lng = lng;
        this.center.lat = lat;
			},
			//建筑物详情展示
      showBuildingDetail: function(marker){
				//TODO
				console.debug("展示建筑物详情 TODO");
        console.debug(marker);

        if(this.currentBuilding){

          this.currentBuilding.unSelect();

          if(this.currentBuilding.name !== marker.name){
            this.currentBuilding = marker;
            this.currentBuilding.select();
            this.buildingDetailOpened = true;
					}else{
            this.currentBuilding = null;
            this.buildingDetailOpened = false;
					}

				}else{

          this.currentBuilding = marker;
          this.currentBuilding.select();
          this.buildingDetailOpened = true;
				}

			},
      heatmapToggle: function(state){
        this.heatmapOpend = state;
        if(!this.heatmapOpend){
          for(let index in this.heatmaps){
            this.heatmaps[index].hide();
          }
          this.currentIndex = 0;
				}else{
          this.heatmaps[this.currentIndex].show();
				}

			},

      heatmapChoose: function(currentIndex){
				for(let index in this.heatmaps){
				  if(index == currentIndex){
				    this.heatmaps[index].show();
					}else{
            this.heatmaps[index].hide();
					}
				}
				this.currentIndex = currentIndex;
			}

		},
    mounted: function() {

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

        //数据实时加载

			}
		}
	}
</script>
<style scoped>
	#container{
		width: 100%;
		height: 100%;
	}
	.building-card{

		text-align: justify;

		position: absolute;
		z-index: 101;

		left: 20px;
		bottom: 30px;
		width: 710px;
		height: 166px;

		opacity: 0.9;
		background: #FFFFFF;
		box-shadow: 0 2px 6px 0 rgba(0,0,0,0.10);
		border-radius: 12px;

		display: flex;
		align-items: center;

	}
	.building-card__head{

		position: relative;
		margin-left: 14px;

		width: 138px;
		height: 138px;
		background-image: url("http://pqgihe8li.bkt.clouddn.com/shop_4.png");
		background-size: contain;

	}
	.building-card__body{

		position: relative;

		padding-top: 24px;
		padding-left: 18px;
		padding-bottom: 27px;

	}
	.building-card__body__title{

		height: 42px;

		display: flex;
		align-items: center;

	}
	.building-card__body__title__name{

		width: 466px;

		font-family: PingFangSC-Regular;
		font-size: 30px;
		color: #262626;

	}
	.building-card__body__title__icon{
		margin-left: 20px;
		background-image: url("../../assets/images/map/shopmap_chat@3x.png");
		background-size: contain;
		width: 34px;
		height: 34px;
	}
	.building-card__body__attributes{
		margin-top: 19px;
	}
	.building-card__body__attributes_line{
		display: flex;
	}
	.building-card__body__attributes_line span{
		width: 233px;
		font-family: PingFangSC-Regular;
		font-size: 20px;
		color: #8D93A4;
		text-align: justify;
	}

	.map-bar{
		z-index: 100;
		position: absolute;
		left: 24px;
		top: 24px;

		display: flex;
		align-items: center;
	}
	.map-bar__search{

		position: relative;

		background-image: url("../../assets/images/map/search@3x 2.png");
		background-size: cover;
		width: 610px;
		height: 78px;
		background-repeat: no-repeat;

	}
	.map-bar__rank{

		position: relative;
		padding-left: 16px;

		background-image: url("../../assets/images/map/shopmap_shop.png");
		background-size: contain;
		width: 84px;
		height: 84px;
	}

	.heatmap{

		position: absolute;
		z-index: 100;
		right: 16px;
		bottom: 130px;

		background-image: url("../../assets/images/map/shopmap_thermal.png");
		background-size: contain;
		width: 96px;
		height: 96px;
	}

	.noheatmap{
		position: absolute;
		z-index: 100;
		right: 16px;
		bottom: 130px;

		background-image: url("../../assets/images/map/shopmap_map.png");
		background-size: contain;
		width: 96px;
		height: 96px;
	}

	.heatmap-bar{
		position: absolute;
		z-index: 100;
		left: 175px;
		bottom: 44px;

		display: flex;
		width: 420px;
	}
	.heatmap-bar__btn{

		position: relative;

		width: 118px;
		height: 46px;
		margin-right: 20px;

		opacity: 0.9;
		background: rgba(255,255,255,0.70);
		box-shadow: 0 0 6px 0 rgba(0,0,0,0.10);
		border-radius: 22.4px;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.heatmap-bar__btn_active{
		font-family: PingFangSC-Regular;
		font-size: 20px;
		color: #FFFFFF;
		text-align: center;
		background: #262626;
		border-radius: 22.4px;
	}

</style>