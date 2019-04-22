import Vue from 'vue'
export default{
  SET_TICKET(state,payload){
    console.log(payload); 
    if (!payload["WALLAN-TOKEN"]) throw `设置token异常，WALLAN-TOKEN 为空`;
    if (!payload["WALLAN-DEVICENUM"]) throw `设置token异常，WALLAN-DEVICENUM 为空`;
    state.ticket = payload;
  }
}