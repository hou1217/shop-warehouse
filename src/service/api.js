import axios from 'axios'
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
//暂停函数
function sleep(ms){
  return new Promise((resolve)=>{
	setTimeout(resolve,ms);
  })
}
//排序函数
function compare(property,sort){
  return function(obj1,obj2){
      var value1 = obj1[property];
      var value2 = obj2[property];
      if(sort){
        return value1 - value2;     // 升序
      }else{
        return value2 - value1;     // 降序
      }
      
  }
}

const testGetApi = async function(url,params){
  if(url.includes('/categoryList')){
    await sleep(500);
    let data = store.state.categoryList;
    return {
      cards: data
    }
  }
  else if(url.includes('/stock/')){
    console.log(params)
    let type = params.type;
    let order = params.order;
    let sort = params.isAsc;
    console.log(sort);
    await sleep(500);
    //对数据进行筛选
    let data = type-1 === 0?store.state.stockGoodsList:store.state.stockGoodsList.filter(item=>{
      return item.type === String(type-1)
    });
    //对数据进行排序
    data = data.sort(compare(order,sort));
    console.warn(data);
    return {
      cards: data
    }
  }
  else if(url.includes('/generalStock/')){
    console.log(params)
    let type = params.type;
    let order = params.order;
    let sort = params.isAsc;
    // console.log(sort);
    await sleep(500);
    //对数据进行筛选
    let data = type-1 === 0?store.state.generalGoodsList:store.state.generalGoodsList.filter(item=>{
      return item.type === String(type-1)
    });
    //对数据进行排序
    data = data.sort(compare(order,sort));
    console.warn(data);
    return {
      cards: data
    }
  }
  else if(url.includes('/mateList')){
    await sleep(100);
    let data = store.state.mateList;
    return{
      cards: data
    }
  }
  else if(url.includes('/goodsDetail')){
    let id = params.id;
    console.log(id);
    await sleep(10);

    
    let array = store.state.dataDetailList;
    let data = null;
    data = array.filter(item => {
      return item.id === String(id)
    })
    return{
      data: data[0]
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
  else if (url.includes('/purchaseOrder/list')) {
    let arr = store.state.purchaseOrder;
    let data = [];
    if (arr.length) {
      data = arr.map(item => {
        item['activity'] = [];
        if (item.labels) {
          item['activity'].push(item.labels);
        }
        item['selected'] = false;
        return item;
      });
    }
    return {
      data: data
    };
  }
  else if (url.includes('/purchaseOrder/delete')) {
    console.debug('删除');
    console.debug(params);
    let list = params.list;
    store.commit('delPurchaseOrder', list);
  }
  else if (url.includes('/purchaseOrder/clear')) {
    console.debug('购物车结算');
    console.debug(params);
    let list = params.ids;
    let message = params.message;
    let del_list = [];
    for (let item of list) {
      del_list.push({id: item});
    }
    store.commit('createOrder', {list: list, message: message});  // 生成新订单
    store.commit('delPurchaseOrder', del_list);  // 清除订货单内结算的商品
    return {
      status: 200,
      data: {
        orderId: 100000000000 + store.state.orderList.length
      }
    }
  }
  else if (url.includes('/order/create')) {
    console.debug('立即购买');
    let list = [params.id];
    let message = params.message;
    store.commit('createOrder', {list: list, message: message});
    return {
      status: 200,
      data: {
        orderId: 100000000000 + store.state.orderList.length
      }
    }
  }
  else if (url.includes('/purchaseOrder/edit')) {
    console.debug('订货单信息修改');
    console.debug(params);
    store.commit('editPurchaseOrder', params);
    return {
      status: 200
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
  getCategoryList: params => testGetApi('/categoryList',params.params),
  //获取stock列表
  getStockList: params => testGetApi(`/stock/${params.params.type}?order=${params.params.order}&isAsc=${params.params.isAsc}`,params.params),
  //获取商品总仓列表
  getGeneralStockList: params => testGetApi(`/generalStock/${params.params.type}?order=${params.params.order}&isAsc=${params.params.isAsc}`,params.params),
  //获取商品详情
  getGoodsDetail: params => testGetApi(`/goodsDetail`,params.params),
  //店铺报表--
  //获取单品排行
  getRankList: params => getApi('/rankList',params.params),
  //获取最佳伴侣
  getMateList: params => testGetApi('/mateList',params.params),
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
  // 获取进货单列表（购物车列表）
  getPurchaseOrderList: params => testGetApi('/purchaseOrder/list', params.params),
  // 删除进货单列表数据
  deletePurchaseOrderList: params => testGetApi('/purchaseOrder/delete', params.params),
  // 购物车结算并创建订单
  clearPurchaseOrder: params => testGetApi('/purchaseOrder/clear', params.params),
  // 立即购买结算（创建订单）
  createOrder: params => testGetApi('/order/create', params.params),
  // 订货单修改
  editPurchaseOrder: params => testGetApi('/purchaseOrder/edit', params.params),
}
export default APIs
