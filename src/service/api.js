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
  //历史记录
  else if(url.includes('/historyRecord1')){
    await sleep(100);
    let data = [
      {"id":1,"headId":null,"title":"12","times":[{"totalSales":Math.floor(Math.random() * 900 + 100),"number":Math.floor(Math.random() * 30 + 1)}]},
      {"id":2,"headId":null,"title":"11","times":[{"totalSales":Math.floor(Math.random() * 900 + 100),"number":Math.floor(Math.random() * 30 + 1)},{"totalSales":Math.floor(Math.random() * 900 + 100),"number":Math.floor(Math.random() * 30 + 1)}]},
      {"id":3,"headId":null,"title":"10","times":[{"totalSales":Math.floor(Math.random() * 900 + 100),"number":Math.floor(Math.random() * 30 + 1)},{"totalSales":Math.floor(Math.random() * 900 + 100),"number":Math.floor(Math.random() * 30 + 1)}]},
      {"id":4,"headId":null,"title":"09","times":[{"totalSales":Math.floor(Math.random() * 900 + 100),"number":Math.floor(Math.random() * 30 + 1)},{"totalSales":Math.floor(Math.random() * 900 + 100),"number":Math.floor(Math.random() * 30 + 1)}]}
    ]
    return {
      kind:'day',
      cards: data
    }
  }
  else if(url.includes('/historyRecord')){
    await sleep(100);
    let data = [
      {"id":1,"headId":null,"name":"本","totalSales":Math.floor(Math.random() * 900 + 100)},
      {"id":2,"headId":null,"name":"上","totalSales":Math.floor(Math.random() * 900 + 100)},
      {"id":3,"headId":null,"name":"08","totalSales":Math.floor(Math.random() * 900 + 100)},
      {"id":4,"headId":null,"name":"07","totalSales":Math.floor(Math.random() * 900 + 100)}
    ]
    return {
      kind:'month',
      cards: data
    }
  }
  //店铺报表
  //x轴数据
  else if(url.includes('/getXData')){
    let type = params.timeType;
    console.log(type);
    let data = [];
    switch(type){
      case(0):
        data = ['8点','9点','10点','11点','12点'];
        break;
      case(1):
        data = ['16日','17日','18日','19日','20日'];
        break;
      case(2):
        data = ['4月6日','4月13日','4月20日'];
        break;
      case(3):
        data = ['2月20日','3月20日','4月20日'];
        break;
      case(4):
        data = ['11月','12月','1月','2月','3月'];
        break;
    }
    
    return data;
  }
  //销量
  else if(url.includes('/report/goodsSalesNum/')){
    let number = params.number;
    await sleep(100);
    let data = [
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)]
    ].filter((item,index) => index < number)
    return data
  }
  //动销率
  else if(url.includes('/report/salesRate/')){
    let number = params.number;
    await sleep(100);
    let data = [
      [Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50)],
      [Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50)],
      [Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50)],
      [Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50),Math.floor(Math.random() * 50 + 50)]
    ].filter((item,index) => index < number)
    return data
  }
  //库销比
  else if(url.includes('/report/salesRatio/')){
    let number = params.number;
    await sleep(100);
    let data = [
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)],
      [Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1),Math.floor(Math.random() * 10 + 1)]
    ].filter((item,index) => index < number)
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
  //x轴数据
  getXData: params => testGetApi('/getXData',params.params),
  //销量
  getGoodsSalesNum: params => testGetApi(`/report/goodsSalesNum/${params.params.number}`,params.params),
  //动销率
  getSalesRate: params => testGetApi(`/report/salesRate/${params.params.number}`,params.params),
  //库销比
  getSalesRatio: params => testGetApi(`/report/salesRatio/${params.params.number}`,params.params),
  //历史记录
  getHistoryRecord: params =>  testGetApi('/historyRecord',params.params),
  getHistoryRecord1: params =>  testGetApi('/historyRecord1',params.params),

  //总仓报表
  getClassifiedNums: params =>  testGetApi('/report/classifiedNums',params.params),
  getSectionSales: params =>  testGetApi('/report/sectionSales',params.params),
  getClassifiedProfit: params =>  testGetApi('/report/classifiedProfit',params.params),
}
export default APIs
