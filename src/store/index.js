import Vue from 'vue'
import Vuex from 'vuex'

//import createLogger from 'vuex/dist/logger'
import mutations from './mutations.js'
import actions from './actions.js'
// import emojis from '@/assets/json/emoji/map'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
const state = {
  //店铺数据
  stockGoodsList:[
    {"id":5,"headId":null,"name":"榴莲泰国进口金枕头 新鲜水果生鲜孕妇水果 9-10斤（1-2个）","price":21.12,"salesNum":39,"profit":4.65,"stockNum":39,"labels":"满25减5","props":103,"type":"1","ratio":4},
    {"id":4,"headId":null,"name":"诺梵 纯黑可可脂苦巧克力礼盒100%可可含量特苦高纯黑巧休闲零食婚庆喜糖130g","price":30.12,"salesNum":35,"profit":2.65,"stockNum":43,"labels":"满25减5","props":106,"type":"2","ratio":8},
    {"id":3,"headId":null,"name":"维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶","price":4.54,"salesNum":25,"profit":1.12,"stockNum":12,"labels":"满25减5","props":110,"type":"3","ratio":4},
    {"id":2,"headId":null,"name":"法国原装进口 依云（evian）天然矿泉水 500ml*24瓶 整箱 新老包装替换，随机发货","price":23.22,"salesNum":54,"profit":2.22,"stockNum":8,"labels":"满25减5","props":105,"type":"3","ratio":2},
    {"id":1,"headId":null,"name":"Apple 苹果 iPhone XR 手机【全新国行 带票 全网通版】（上海可门店自提） 黑色 全网通 128GB","price":8322,"salesNum":54,"profit":222,"stockNum":8,"labels":"满25减5","props":105,"type":"1","ratio":2}
  ],
  //商品总仓数据
  generalGoodsList:[
    {"id":5,"headId":null,"name":"榴莲泰国进口金枕头 新鲜水果生鲜孕妇水果 9-10斤（1-2个）","price":21.12,"salesNum":39,"profit":4.65,"stockNum":39,"labels":"满25减5","props":103,"type":"1","ratio":4,"returnRate":2,"hasGoods":1,"dropVisible":0,"shopStockNum":23,"salesNumToday":13,"otherGoods":[{"id":1},{"id":2}]},
    {"id":4,"headId":null,"name":"诺梵 纯黑可可脂苦巧克力礼盒100%可可含量特苦高纯黑巧休闲零食婚庆喜糖130g","price":30.12,"salesNum":35,"profit":2.65,"stockNum":43,"labels":"满25减5","props":106,"type":"2","ratio":8,"returnRate":3,"hasGoods":1,"dropVisible":0,"shopStockNum":34,"salesNumToday":21,"otherGoods":[{"id":1},{"id":2}]},
    {"id":3,"headId":null,"name":"维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶","price":4.54,"salesNum":25,"profit":1.12,"stockNum":12,"labels":"满25减5","props":110,"type":"3","ratio":4,"returnRate":3,"hasGoods":1,"dropVisible":0,"shopStockNum":7,"salesNumToday":4,"otherGoods":[{"id":1},{"id":2}]},
    {"id":2,"headId":null,"name":"法国原装进口 依云（evian）天然矿泉水 500ml*24瓶 整箱 新老包装替换，随机发货","price":23.22,"salesNum":54,"profit":2.22,"stockNum":8,"labels":"满25减5","props":105,"type":"3","ratio":2,"returnRate":4,"hasGoods":0,"dropVisible":0,"shopStockNum":4,"salesNumToday":3,"otherGoods":[{"id":1},{"id":2}]},
    {"id":1,"headId":"goods_1.png","name":"Apple 苹果 iPhone XR 手机【全新国行 带票 全网通版】（上海可门店自提） 黑色 全网通 128GB","price":8322,"salesNum":54,"profit":222,"stockNum":8,"labels":"满25减5","props":105,"type":"1","ratio":2,"returnRate":5,"hasGoods":0,"dropVisible":0,"shopStockNum":5,"salesNumToday":3,"otherGoods":[{"id":1},{"id":2}]}
  ],
  ticket: null,
  //emojis: emojis.emojis,
  userData: {
    nickname: 'jd_139083yda',
    phone: 15643223300,
    address: '上海浦东新区耀华路488号信建大厦806室上海浦东新区耀华路488号信建大厦806室'
  },
  purchaseOrder: [],
  orderList: [],
  
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
