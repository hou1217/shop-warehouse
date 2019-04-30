import Vue from 'vue'
import Vuex from 'vuex'

//import createLogger from 'vuex/dist/logger'
import mutations from './mutations.js'
import actions from './actions.js'
// import emojis from '@/assets/json/emoji/map'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
const state = {
  //category数据
  categoryList:[
    {"title":"饮用水","value":[{"id":"12","headId":"demo1.png","name":"脉动（Mizone）青柠口味 维生素功能饮料 600ml","goodNum":"98","monthNum":"43","price":"5.50","labels":["满25减5"]}]},
    {"title":"茶饮料","value":[{"id":"13","headId":"demo1.png","name":"康师傅冰红茶500ml","goodNum":"96","monthNum":"52","price":"4.50","labels":["满25减5"]}]},
    {"title":"碳酸饮料","value":[{"id":"15","headId":"demo1.png","name":"可口可乐 Coca-Cola 汽水 碳酸饮料 330ml","goodNum":"99","monthNum":"45","price":"4.20","labels":["满25减5"]}]},
    {"title":"果汁","value":[{"id":"14","headId":"demo1.png","name":" 椰树 正宗鲜榨椰汁 ","goodNum":"90","monthNum":"50","price":"5.50","labels":["满25减5"]}]},
    {"title":"牛奶","value":[{"id":"3","headId":"demo1.png","name":"维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶","goodNum":"95","monthNum":"12","price":"59.95","labels":["满25减5"]}]},
    {"title":"其他","value":[{"id":"9","headId":"demo1.png","name":"瓜子","goodNum":"85","monthNum":"41","price":"8.88","labels":["满25减5"]}]}
  ],
  //店铺数据
  stockGoodsList:[
    {"id":5,"headId":null,"name":"榴莲泰国进口金枕头 新鲜水果生鲜孕妇水果 9-10斤（1-2个）","price":159,"salesNum":13,"profit":24.65,"stockNum":39,"labels":"满25减5","props":103,"type":"1","ratio":4},
    {"id":4,"headId":null,"name":"诺梵 纯黑可可脂苦巧克力礼盒100%可可含量特苦高纯黑巧休闲零食婚庆喜糖130g","price":30.12,"salesNum":21,"profit":2.65,"stockNum":43,"labels":"满25减5","props":106,"type":"2","ratio":8},
    {"id":3,"headId":null,"name":"维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶","price":59.95,"salesNum":4,"profit":8.5,"stockNum":12,"labels":"满25减5","props":110,"type":"3","ratio":4},
    {"id":2,"headId":null,"name":"法国原装进口 依云（evian）天然矿泉水 500ml*24瓶 整箱 新老包装替换，随机发货","price":49.95,"salesNum":3,"profit":8.5,"stockNum":8,"labels":"满25减5","props":105,"type":"3","ratio":2},
    {"id":1,"headId":null,"name":"Apple 苹果 iPhone XR 手机【全新国行 带票 全网通版】（上海可门店自提） 黑色 全网通 128GB","price":8322,"salesNum":3,"profit":222,"stockNum":8,"labels":"满25减5","props":105,"type":"1","ratio":2}
  ],
  //商品总仓数据
  generalGoodsList:[
    {"id":5,"headId":null,"name":"榴莲泰国进口金枕头 新鲜水果生鲜孕妇水果 9-10斤（1-2个）","price":159,"salesNum":39,"profit":24.65,"stockNum":390,"labels":"满25减5","props":103,"type":"1","ratio":4,"returnRate":2,"hasGoods":1,"dropVisible":0,"shopStockNum":23,"salesNumToday":13,"otherGoods":[{"id":1},{"id":2}]},
    {"id":4,"headId":null,"name":"诺梵 纯黑可可脂苦巧克力礼盒100%可可含量特苦高纯黑巧休闲零食婚庆喜糖130g","price":30.12,"salesNum":35,"profit":2.65,"stockNum":430,"labels":"满25减5","props":106,"type":"2","ratio":8,"returnRate":3,"hasGoods":0,"dropVisible":0,"shopStockNum":34,"salesNumToday":21,"otherGoods":[{"id":1},{"id":2}]},
    {"id":3,"headId":null,"name":"维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶","price":59.95,"salesNum":25,"profit":8.5,"stockNum":120,"labels":"满25减5","props":110,"type":"3","ratio":4,"returnRate":3,"hasGoods":1,"dropVisible":0,"shopStockNum":7,"salesNumToday":4,"otherGoods":[{"id":1},{"id":2}]},
    {"id":2,"headId":null,"name":"法国原装进口 依云（evian）天然矿泉水 500ml*24瓶 整箱 新老包装替换，随机发货","price":49.95,"salesNum":54,"profit":8.5,"stockNum":80,"labels":"满25减5","props":105,"type":"3","ratio":2,"returnRate":4,"hasGoods":0,"dropVisible":0,"shopStockNum":4,"salesNumToday":3,"otherGoods":[{"id":1},{"id":2}]},
    {"id":1,"headId":null,"name":"Apple 苹果 iPhone XR 手机【全新国行 带票 全网通版】（上海可门店自提） 黑色 全网通 128GB","price":8322,"salesNum":54,"profit":222,"stockNum":80,"labels":"满25减5","props":105,"type":"1","ratio":2,"returnRate":5,"hasGoods":0,"dropVisible":0,"shopStockNum":5,"salesNumToday":3,"otherGoods":[{"id":1},{"id":2}]}
  ],
  //最佳伴侣
  mateList:[
    {"id":1,"headId":"goods_1.png","name1":"iphone","name2":"矿泉水","price":8222,"salesNum":4,"profit":222,"stockNum":8,"labels":"满25减5","props":95,"type":"1","ratio":2},
    {"id":2,"headId":null,"name1":"矿泉水","name2":"维他饮料","price":23.22,"salesNum":54,"profit":2.22,"stockNum":8,"labels":"满25减5","props":93,"type":"3","ratio":2},
    {"id":3,"headId":null,"name1":"维他饮料","name2":"巧克力","price":4.54,"salesNum":25,"profit":1.12,"stockNum":12,"labels":"满25减5","props":90,"type":"3","ratio":4},
    {"id":4,"headId":null,"name1":"巧克力","name2":"榴莲","price":30.12,"salesNum":35,"profit":2.65,"stockNum":43,"labels":"满25减5","props":86,"type":"2","ratio":8},
    // {"id":5,"headId":null,"name1":"榴莲","name2":"白酒","price":21.12,"salesNum":39,"profit":4.65,"stockNum":39,"labels":"满25减5","props":83,"type":"1","ratio":4}
  ],
  //商品详情数据
  dataDetailList : [  
    {
      id: '1',
      name: 'Apple 苹果 iPhone XR 手机【全新国行 带票 全网通版】（上海可门店自提） 黑色 全网通 128GB',
      headIds: [
        require('@/assets/images/demo/1.png'),
        require('@/assets/images/demo/2.png'),
        require('@/assets/images/demo/3.png')
      ],
      price: 8322,
      profit: 222,
      purchase: 23,
      warehouse: 80,
      details: [
        require('@/assets/images/img1@2x.png'),
        require('@/assets/images/img2@2x.png'),
        require('@/assets/images/img3@2x.png')
      ],
      similars: [{
        headId: require('@/assets/images/demo/comment_4.png'),
        name: 'Apple iPhone XR (A2108) 128GB 黑色 移动联通电信4G手机 双卡双待',
        price: 39.6
      }, {
        headId: require('@/assets/images/demo/comment_5.png'),
        name: 'Apple iPhone XR (A2108) 128GB 黑色 移动联通电信4G手机 双卡双待',
        price: 39.6
        
      }, {
        headId: require('@/assets/images/demo/comment_6.png'),
        name: 'Apple iPhone XR (A2108) 128GB 黑色 移动联通电信4G手机 双卡双待',
        price: 39.6
        
      }]
    }, {
      id: '2',
      name: '法国原装进口 依云（evian）天然矿泉水 500ml*24瓶 整箱 新老包装替换，随机发货',
      headIds: [
        require('@/assets/images/demo/4.png'),
        require('@/assets/images/demo/5.png'),
        // require('@/assets/images/demo/6.png')
      ],
      price: 49.95,
      profit: 8.5,
      purchase: 33,
      warehouse: 80,
      details: [
        require('@/assets/images/img1@2x.png'),
        require('@/assets/images/img2@2x.png'),
        require('@/assets/images/img3@2x.png')
      ],
      similars: [{
        headId: require('@/assets/images/demo/comment_4.png'),
        name: '法国原装进口 依云（evian）天然矿泉水 330ml*20整箱玻璃瓶',
        price: 39.6
      }, {
        headId: require('@/assets/images/demo/comment_5.png'),
        name: '法国原装进口 依云（evian）天然矿泉水 330ml*20整箱玻璃瓶',
        price: 39.6
        
      }, {
        headId: require('@/assets/images/demo/comment_6.png'),
        name: '法国原装进口 依云（evian）天然矿泉水 330ml*20整箱玻璃瓶',
        price: 39.6
        
      }]
    }, {
      id: '3',
      name: '维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶',
      headIds: [
        require('@/assets/images/demo/6.png'),
        require('@/assets/images/demo/7.png'),
      ],
      price: 59.95,
      profit: 8.5,
      purchase: 23,
      warehouse: 120,
      details: [
        require('@/assets/images/img1@2x.png'),
        require('@/assets/images/img2@2x.png'),
        require('@/assets/images/img3@2x.png')
      ],
      similars: [{
        headId: require('@/assets/images/demo/comment_4.png'),
        name: '维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶',
        price: 39.6
      }, {
        headId: require('@/assets/images/demo/comment_5.png'),
        name: '维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶',
        price: 39.6
        
      }, {
        headId: require('@/assets/images/demo/comment_6.png'),
        name: '维他奶（vitasoy） 维他柠檬茶饮料 维他奶出品饮品 250ml*24盒装 锡兰红茶',
        price: 39.6
        
      }]
    }, {
      id: '4',
      name: '诺梵 纯黑可可脂苦巧克力礼盒100%可可含量特苦高纯黑巧休闲零食婚庆喜糖130g',
      headIds: [
        require('@/assets/images/demo/8.png'),
        require('@/assets/images/demo/9.png'),
      ],
      price: 30.12,
      profit: 2.65,
      purchase: 33,
      warehouse: 430,
      details: [
        require('@/assets/images/img1@2x.png'),
        require('@/assets/images/img2@2x.png'),
        require('@/assets/images/img3@2x.png')
      ],
      similars: [{
        headId: require('@/assets/images/demo/comment_4.png'),
        name: '诺梵 纯黑可可脂苦巧克力礼盒100%可可含量特苦高纯黑巧休闲零食婚庆喜糖130g',
        price: 39.6
      }, {
        headId: require('@/assets/images/demo/comment_5.png'),
        name: '诺梵 纯黑可可脂苦巧克力礼盒100%可可含量特苦高纯黑巧休闲零食婚庆喜糖130g',
        price: 39.6
        
      }, {
        headId: require('@/assets/images/demo/comment_6.png'),
        name: '诺梵 纯黑可可脂苦巧克力礼盒100%可可含量特苦高纯黑巧休闲零食婚庆喜糖130g',
        price: 39.6
        
      }]
    }, {
      id: '5',
      name: '榴莲泰国进口金枕头 新鲜水果生鲜孕妇水果 9-10斤（1-2个）',
      headIds: [
        require('@/assets/images/demo/10.png'),
        require('@/assets/images/demo/11.png'),
      ],
      price: 159,
      profit: 24.65,
      purchase: 45,
      warehouse: 390,
      details: [
        require('@/assets/images/img1@2x.png'),
        require('@/assets/images/img2@2x.png'),
        require('@/assets/images/img3@2x.png')
      ],
      similars: [{
        headId: require('@/assets/images/demo/comment_4.png'),
        name: '榴莲泰国进口金枕头 新鲜水果生鲜孕妇水果 9-10斤（1-2个）',
        price: 39.6
      }, {
        headId: require('@/assets/images/demo/comment_5.png'),
        name: '榴莲泰国进口金枕头 新鲜水果生鲜孕妇水果 9-10斤（1-2个）',
        price: 39.6
        
      }, {
        headId: require('@/assets/images/demo/comment_6.png'),
        name: '榴莲泰国进口金枕头 新鲜水果生鲜孕妇水果 9-10斤（1-2个）',
        price: 39.6
        
      }]
    }
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
