import axios from 'axios'
import router from '../router/index.js'
const APP_HOST = process.env.VUE_APP_APP_HOST;
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
  getCategoryList: params => getApi('/categoryList',params.params),
  //获取stock列表
  getStockList: params => getApi('/stock',params.params),
  //获取商品总仓列表
  getGeneralStockList: params => getApi('/generalStock',params.params),

  //店铺报表--
  //获取单品排行
  getRankList: params => getApi('/rankList',params.params),
  //获取最佳伴侣
  getMateList: params => getApi('/mateList',params.params),
  //销量
  getGoodsSalesNum: params => getApi('/report/goodsSalesNum',params.params),
  //动销率
  getSalesRate: params => getApi('/report/salesRate',params.params),
  //库销比
  getSalesRatio: params => getApi('/report/salesRatio',params.params),
  //历史记录
  getHistoryRecord: params =>  getApi('/historyRecord',params.params),
  getHistoryRecord1: params =>  getApi('/historyRecord1',params.params),

  //总仓报表
  getClassifiedNums: params =>  getApi('/report/classifiedNums',params.params),
  getSectionSales: params =>  getApi('/report/sectionSales',params.params),
  getClassifiedProfit: params =>  getApi('/report/classifiedProfit',params.params),
}
export default APIs