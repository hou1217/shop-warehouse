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
  // switch (url) {
  //   case '':
  // }
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
  // 总仓报表
  else if(url.includes('/report/classifiedNums')){
    await sleep(100);
    let data = [
      {"name":"美妆护理","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"面包甜点","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"特价套餐","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"休闲零食","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"湃客咖啡","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"精选饮料","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"冷藏乳饮","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"美味鲜食","value":Math.floor(Math.random() * 50 + 50)}
    ];
    // console.warn(data);
    return data
  }
  else if(url.includes('/report/sectionSales')){
    await sleep(100);
    let data = [
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
    ];
    // console.warn(data);
    return data
  }
  else if(url.includes('/report/classifiedProfit')){
    await sleep(100);
    let data = [
      {"name":"美妆护理","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"面包甜点","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"特价套餐","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"休闲零食","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"湃客咖啡","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"精选饮料","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"冷藏乳饮","value":Math.floor(Math.random() * 50 + 50)},
      {"name":"美味鲜食","value":Math.floor(Math.random() * 50 + 50)}
    ];
    // console.warn(data);
    return data
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
  getClassifiedNums: params =>  testGetApi('/report/classifiedNums',params.params),
  getSectionSales: params =>  testGetApi('/report/sectionSales',params.params),
  getClassifiedProfit: params =>  testGetApi('/report/classifiedProfit',params.params),
}
export default APIs
