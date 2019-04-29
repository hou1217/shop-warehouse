import Vue from 'vue'
import Vuex from 'vuex'

//import createLogger from 'vuex/dist/logger'
import mutations from './mutations.js'
import actions from './actions.js'
// import emojis from '@/assets/json/emoji/map'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
const state = {
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
