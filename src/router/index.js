import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/Home.vue'),
      redirect:'/home/category/3',
      children:[
        //分类商品
        {
          path: '/home/category/:type',
          name: 'category',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/category/GoodsCategory.vue')
        }
      ]
    },
    {
      path: '/stock/:type',
      name: 'stock',
      component: () => import('@/views/stock/ShopStock.vue'),
    },
    {
      path: '/goodsGeneralStock/:type',
      name: 'general',
      component: () => import('@/views/goodsGeneralStock/GoodsGeneralStock.vue'),
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: () => import('@/views/goodsDetail/GoodsDetail')
    },
   
    // 店铺报表
    {
      path: '/shopReport/:type',
      name: 'shopReport',
      meta:{ notScrollToTop: true },
      component: () => import('@/views/shopReport/ShopReport')
    },
    // 店铺报表-历史记录
    {
      path: '/historyRecord',
      name: 'historyRecord',
      component: () => import('@/views/shopReport/HistoryRecord')
    },
    // 店铺报表-店铺数据
    {
      path: '/shopData',
      name: 'shopData',
      component: () => import('@/views/shopReport/ShopData')
    },
    // 店铺报表-分类数据
    {
      path: '/classifiedData',
      name: 'classifiedData',
      component: () => import('@/views/shopReport/ClassifiedData')
    },
    // 店铺报表-单类数据
    {
      path: '/singleClassData',
      name: 'singleClassData',
      component: () => import('@/views/shopReport/SingleClassData')
    },
    // 店铺报表-已进货商品数据分析
     {
      path: '/stockedGoodsReport',
      name: 'stockedGoodsReport',
      component: () => import('@/views/shopReport/StockedGoodsReport')
    },
    // 未进货数据分析
    {
      path: '/noStockedGoodsReport',
      name: 'noStockedGoodsReport',
      component: () => import('@/views/noStockedGoodsReport/NoStockedGoodsReport')
    },
    //选择对比商品
    {
      path: '/compareSelect',
      name: 'compareSelect',
      component: () => import('@/views/compareSelect/CompareSelect')
    },
    // 总仓报表
    {
      path: '/warehouseReport',
      name: 'warehouseReport',
      component: () => import('@/views/warehouseReport/WarehouseReport')
    },
    // 进货单-列表
    {
      path: '/purchaseOrder',
      name: 'purchaseOrder',
      component: () => import('@/views/purchaseOrder/PurchaseOrder')
    },
      // 进货单-进货单管理
    {
      path: '/purchaseOrderManage',
      name: 'purchaseOrderManage',
      component: () => import('@/views/purchaseOrder/PurchaseOrderManage')
    },
      // 进货单-进货确认
    {
      path: '/purchaseOrderConfirm',
      name: 'purchaseOrderConfirm',
      component: () => import('@/views/purchaseOrder/PurchaseOrderConfirm')
    },
      // 进货单-进货订单详情
    {
      path: '/purchaseOrderDetail',
      name: 'purchaseOrderDetail',
      component: () => import('@/views/purchaseOrder/PurchaseOrderDetail')
    },
      // 进货单-进货清单列表
    {
      path: '/purchaseOrderList',
      name: 'purchaseOrderList',
      component: () => import('@/views/purchaseOrder/PurchaseOrderList')
    },
      // 进货单-下单状态
    {
      path: '/purchaseOrderStatus',
      name: 'purchaseOrderStatus',
      component: () => import('@/views/purchaseOrder/PurchaseOrderStatus')
    },
    // 店铺订单
    {
      path: '/shopOrder',
      name: 'shopOrder',
      component: () => import('@/views/shopOrder/ShopOrder')
    },
      // 主管-报表
    {
      path: '/generalManagerReport',
      name: 'generalManagerReport',
      component: () => import('@/views/generalManagerReport/GeneralManagerReport')
    },
      // 主管-地图
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/map/index')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if(to.meta.notScrollToTop){
        return
      }else{
        return {x: 0, y: 0}
      }
    }
  }
})
