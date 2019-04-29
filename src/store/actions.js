import APIs from '@/service/api'
import mutations from './mutations'
export default{
  async REQUEST_API({ commit },{ api, ...payload }) {
    const undefinedApiError = {
      code: -1,
      msg: '未定义接口',
      data: null
    }
    console.log(`Request API: ${api}`);
    let response = null;
    if (APIs[api]) {
      response = await APIs[api](payload);
    }else{
      response = undefinedApiError
    }
    return response
  },
  
  getPurchaseOrderList(context) {
    console.debug('action getPurchaseOrderList');
    return Promise.resolve({
      data: context.state.purchaseOrder
    });
  },
  deletePurchaseOrder(context, payload) {
    console.debug('deletePurchaseOrder');
    console.debug(payload);
    context.commit('delPurchaseOrder', payload);
  },
}
