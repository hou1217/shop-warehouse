import Vue from 'vue'
export default{
  SET_TICKET(state,payload){
    console.log(payload);
    if (!payload["WALLAN-TOKEN"]) throw `设置token异常，WALLAN-TOKEN 为空`;
    if (!payload["WALLAN-DEVICENUM"]) throw `设置token异常，WALLAN-DEVICENUM 为空`;
    state.ticket = payload;
  },
  
  setPurchaseOrder(state, payload) {
    console.debug('setPurchaseOrder');
    // console.debug(state);
    // console.debug(payload);
    if (payload) {
      state.purchaseOrder.push(payload);
    }
  },
  
  delPurchaseOrder(state, payload) {
    for (let i = 0; i < state.purchaseOrder.length; i++) {
      for (let d of payload) {
        if (state.purchaseOrder[i].id === d.id) {
          state.purchaseOrder.splice(i, 1);
        }
      }
    }
  }
}
