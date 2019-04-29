var dataList = [
  {
    id: '1',
    salesRank: 1,
    revenueRank: 5,
    strike: 642.32,
    strikeNum: 102,
    gross: 212.09,
    netProfit: 143.43,
    stock: 98,
    mprate: '105%',
    sinkToPin: 2
  },{
    id: '2',
    salesRank: 2,
    revenueRank: 4,
    strike: 642.32,
    strikeNum: 102,
    gross: 212.09,
    netProfit: 143.43,
    stock: 98,
    mprate: '105%',
    sinkToPin: 2
  },{
    id: '3',
    salesRank: 3,
    revenueRank: 3,
    strike: 642.32,
    strikeNum: 102,
    gross: 212.09,
    netProfit: 143.43,
    stock: 98,
    mprate: '105%',
    sinkToPin: 2
  },{
    id: '4',
    salesRank: 4,
    revenueRank: 2,
    strike: 642.32,
    strikeNum: 102,
    gross: 212.09,
    netProfit: 143.43,
    stock: 98,
    mprate: '105%',
    sinkToPin: 2
  },{
    id: '5',
    salesRank: 5,
    revenueRank: 1,
    strike: 642.32,
    strikeNum: 102,
    gross: 212.09,
    netProfit: 143.43,
    stock: 98,
    mprate: '105%',
    sinkToPin: 2
  },{
    id: '6',
    salesRank: 6,
    revenueRank: 6,
    strike: 642.32,
    strikeNum: 102,
    gross: 212.09,
    netProfit: 143.43,
    stock: 98,
    mprate: '105%',
    sinkToPin: 2
  }
];  // 商品分析数据

var compareList = [  // 对比商品列表
  {
    name: 'iPhone X',
    image: require('@/assets/images/demo/goods_1.png'),
    id: '1',
    for: 'breakfast'
  },{
    name: '新西兰矿泉水',
    image: require('@/assets/images/demo/goods_2.png'),
    id: '2',
    for: 'breakfast'
  },{
    name: '维他柠檬茶',
    image: require('@/assets/images/demo/goods_3.png'),
    id: '3',
    for: 'breakfast'
  },{
    name: '法丽兹曲奇饼干',
    image: require('@/assets/images/demo/goods_4.png'),
    id: '4',
    for: 'lunch'
  },{
    name: '榴莲',
    image: require('@/assets/images/demo/goods_5.png'),
    id: '5',
    for: 'lunch'
  },{
    name: '农夫山泉',
    image: require('@/assets/images/demo/goods_6.png'),
    id: '6',
    for: 'lunch'
  },{
    name: '红牛',
    image: require('@/assets/images/demo/goods_7.png'),
    id: '7',
    for: 'lunch'
  },{
    name: '电风扇',
    image: require('@/assets/images/demo/goods_8.png'),
    id: '8',
    for: 'lunch'
  },{
    name: '原味瓜子',
    image: require('@/assets/images/demo/goods_9.png'),
    id: '9',
    for: 'lunch'
  },{
    name: '张君雅小妹妹',
    image: require('@/assets/images/demo/goods_10.png'),
    id: '10',
    for: 'lunch'
  },{
    name: '法丽兹曲奇饼干',
    image: require('@/assets/images/demo/goods_11.png'),
    id: '11',
    for: 'lunch'
  },{
    name: '脉动',
    image: require('@/assets/images/demo/goods_12.png'),
    id: '12',
    for: 'lunch'
  },{
    name: '法丽兹葱油饼',
    image: require('@/assets/images/demo/goods_13.png'),
    id: '13',
    for: 'lunch'
  },{
    name: '椰树牌椰汁',
    image: require('@/assets/images/demo/goods_14.png'),
    id: '14',
    for: 'lunch'
  },{
    name: '乐事薯片',
    image: require('@/assets/images/demo/goods_15.png'),
    id: '15',
    for: 'lunch'
  },{
    name: '饼干套装',
    image: require('@/assets/images/demo/goods_16.png'),
    id: '16',
    for: 'lunch'
  }
];

// 方法
// 获取商品分析数据
function getGoodsAnalysisData({id}) {
  if (id) {
    for (let item of dataList) {
      if (item.id === id) {
        return Promise.resolve({
          data: item
        });
      }
    }
  } else {
    return Promise.resolve({
      data: dataList[0]
    });
  }
}

// 获取对比商品列表
function getCompareGoodsList() {
  let data = {
    "早餐": [],
    "午餐": []
  };
  
  for (let item of compareList) {
    item['selected'] = false;
    if (item.for === 'breakfast') {
      data['早餐'].push(item);
    } else if (item.for === 'lunch') {
      data['午餐'].push(item);
    } else {
      console.debug('未识别的分类');
    }
  }
  
  return Promise.resolve({
    data: data
  });
}

var ReportApi = {
  getGoodsAnalysisData: getGoodsAnalysisData,
  getCompareGoodsList: getCompareGoodsList
};

export {
  ReportApi
}
