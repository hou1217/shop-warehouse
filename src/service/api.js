import axios from 'axios'
import router from '../router/index.js'
const APP_HOST = process.env.VUE_APP_APP_HOST;
const TEST_HOST = process.env.VUE_APP_TEST_HOST;

import store from '../store/index'

// axios响应拦截器
axios.interceptors.response.use((res)=> {
  console.log(res);
  if(res.data.state === 200){
    return res.data.data
  }else{
    return Promise.reject(res.data)
  }
}, (error)=> {
  console.log(error.response);
  return Promise.reject(error)
})
const getApi = function (url, params) {
  return  axios({
    method: 'GET',
    url: APP_HOST+url,
    data:params,
    // headers:{
    //   'WALLAN-TOKEN' : JSON.parse(localStorage.getItem('ticket'))["WALLAN-TOKEN"],
    //   'WALLAN-DEVICENUM': JSON.parse(localStorage.getItem('ticket'))["WALLAN-DEVICENUM"]
    // }
  })
}
const testApi = function (url, params) {
  return  axios({
    method: 'GET',
    url: TEST_HOST+url,
    data:params,
    // headers:{
    //   'WALLAN-TOKEN' : JSON.parse(localStorage.getItem('ticket'))["WALLAN-TOKEN"],
    //   'WALLAN-DEVICENUM': JSON.parse(localStorage.getItem('ticket'))["WALLAN-DEVICENUM"]
    // }
  })
}
const testGetApi = function(url,params){
  if(url.includes('/stock/')){
    return {
      cards:store.state.stockGoodsList
    }
  }
  else if(url.includes('/generalStock/')){
    return{
      cards:store.state.generalGoodsList
    }
  }
  else if (url.includes('/shop/order')) {
    console.debug(params);
    if (params.state === 'all' || params.state === '') {
      return{
        data: store.state.orderList
      }
    } else {
      let arr = [];
      for (let item of store.state.orderList) {
        if (item.state === params.state) {
          arr.push(item);
        }
      }
      return {
        data: arr
      };
    }
  }
  else if (url.includes('/order/detail')) {
    for (let item of store.state.orderList) {
      if (item.id == params.orderId) {
        return {
          data: item
        }
      }
    }
  }
  else if (url.includes('/order/list')) {
    console.debug(params.ids);
    let arr = [];
    for (let i = 0; i < store.state.stockGoodsList.length; i++) {
      for (let item of params.ids) {
        if (item.id == store.state.stockGoodsList[i].id) {
          arr.push(store.state.stockGoodsList[i]);
        }
      }
    }
    return {
      data: arr
    }
  }
}
const fetchApi = function (url, params) {
  return  axios({
    method: 'POST',
    url: APP_HOST+url,
    data:params,
    // headers:{
    //   'WALLAN-TOKEN' : JSON.parse(localStorage.getItem('ticket'))["WALLAN-TOKEN"],
    //   'WALLAN-DEVICENUM': JSON.parse(localStorage.getItem('ticket'))["WALLAN-DEVICENUM"]
    // }
  })
}
const APIs = {
  //获取分类数据列表
  getCategoryList: params => testApi('/categoryList',params.params),
  //获取stock列表
  getStockList: params => testGetApi(`/stock/${params.params.type}?order=${params.params.order}&isAsc=${params.params.isAsc}`,params.params),
  //获取商品总仓列表
  getGeneralStockList: params => testGetApi(`/generalStock/${params.params.type}?order=${params.params.order}&isAsc=${params.params.isAsc}`,params.params),

  //店铺报表--
  //获取单品排行
  getRankList: params => getApi('/rankList',params.params),
  //获取最佳伴侣
  getMateList: params => testApi('/mateList',params.params),
  //销量
  getGoodsSalesNum: params => getApi(`/report/goodsSalesNum/${params.params.number}`,params.params),
  //动销率
  getSalesRate: params => getApi(`/report/salesRate/${params.params.number}`,params.params),
  //库销比
  getSalesRatio: params => getApi(`/report/salesRatio/${params.params.number}`,params.params),
  //历史记录
  getHistoryRecord: params =>  getApi('/historyRecord',params.params),
  getHistoryRecord1: params =>  getApi('/historyRecord1',params.params),

  //总仓报表
  getClassifiedNums: params =>  getApi('/report/classifiedNums',params.params),
  getSectionSales: params =>  getApi('/report/sectionSales',params.params),
  getClassifiedProfit: params =>  getApi('/report/classifiedProfit',params.params),
  
  // 获取店铺订单列表
  getShopOrderList: params => testGetApi('/shop/order', params.params),
  // 获取订单详情
  getOrderDetail: params => testGetApi('/order/detail', params.params),
  // 获取进货清单
  getGoodsDetails: params => testGetApi('/order/list', params.params),
}
export default APIs
