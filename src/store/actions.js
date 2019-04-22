import APIs from '@/service/api'
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
  }
}
