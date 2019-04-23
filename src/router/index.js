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
      path: '/goodDetail',
      name: 'goodDetail',
      component: () => import('@/views/goodDetail/GoodDetail')
    },
    {
      path: '/stockedGoodsReport',
      name: 'stockedGoodsReport',
      component: () => import('@/views/stockedGoodsReport/StockedGoodsReport')
    },
    {
      path: '/noStockedGoodsReport',
      name: 'noStockedGoodsReport',
      component: () => import('@/views/noStockedGoodsReport/NoStockedGoodsReport')
    },
    {
      path: '/compareSelect',
      name: 'compareSelect',
      component: () => import('@/views/compareSelect/CompareSelect')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
