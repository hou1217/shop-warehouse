import Vue from 'vue'
export default{
  SET_TICKET(state,payload){
    console.log(payload);
    if (!payload["WALLAN-TOKEN"]) throw `设置token异常，WALLAN-TOKEN 为空`;
    if (!payload["WALLAN-DEVICENUM"]) throw `设置token异常，WALLAN-DEVICENUM 为空`;
    state.ticket = payload;
  },
  // GET_STOCK_LIST(state,payload){
  //   console.log(state.stockGoodsList);
  // }
  setPurchaseOrder(state, payload) {
    console.debug('setPurchaseOrder');
    // console.debug(state);
    // console.debug(payload);
    if (payload) {
      state.purchaseOrder.push(payload);
    }
  },
  
  delPurchaseOrder(state, payload) {
    console.debug('delPurchaseOrder');
    console.debug(payload);
    for (let i = 0; i < state.purchaseOrder.length; i++) {
      for (let d of payload) {
        if (state.purchaseOrder[i].id === d.id) {
          state.purchaseOrder.splice(i, 1);
        }
      }
    }
  },
  
  createOrder(state, payload) {
    console.debug(payload);
    let goods = [];
    for (let item of payload.list) {
      goods.push({id: item});
    }
    let length = state.orderList.length;
    let data = {
      id: 100000000001 + length,
      state: 'confirm',
      consignee: {
        name: 'jd_542542',
        phone: 15643223300,
        address: '上海浦东新区耀华路488号信建大厦806室上海浦东新区耀华路488号信建大厦806室'
      },
      goods: goods,
      message: payload.message,
      createdAt: '2018-09-18 16:46',
      dispatchData: {
        date: '今天',
        timeRange: '10:00-11:00'
      }
    };
    state.orderList.push(data);
  },
  
  editPurchaseOrder(state, payload) {
    if (payload.list) {
      state.purchaseOrder = [];
      for (let item of payload.list) {
        state.purchaseOrder.push(item);
      }
    }
  },
}
