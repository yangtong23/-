//logs.js
const util = require('../../utils/util.js')
let defaultiIp = require('../../default.js');
let app = getApp();
let ip1 = defaultiIp.ip1;
let ip2 = defaultiIp.ip2;

Page({
  data: {
    ip1,
    showCar:true,
    groomGoods:[],
    goodsList:[],
    total:0,
    totalNum:0,
    selectAll : false
  },
  // 结账
  balance(){
  let arr = this.data.goodsList.filter(item => item.state =="true")
console.log(arr)
    let param = {
      total: this.data.total,
      order: [...arr]
    }
    wx.navigateTo({
      url: '../order/order?order=' + encodeURIComponent(  JSON.stringify(param) )
    })
  },
  //  前往商品页面
  go_details(e) {

    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.id
    })
  },
  onLoad: function () {
    console.log(util.formatTime(new Date()))

    wx.request({
      url: ip2 + '/goods/find', //仅为示例，并非真实的接口地址
      data: {
        page: 1,
        rows: 12
      },
      success: (res) => {
        let arr = [...res.data.rows];
        arr.forEach(item => item.indexImg = item.indexImg.replace(/[\\]/g, '/'))
        this.setData({
          groomGoods: [...this.data.groomGoods, ...res.data.rows]
        })
    }
    })
  },
  onShow(){
    // 判断是否登录 或 购物车里是否有商品
    if (!app.globalData.userInfo || app.globalData.userInfo.shopCar.length == 0){
      this.setData({
        showCar: true
      })
    }else{
      this.setData({
        showCar: false,
        goodsList: [...app.globalData.userInfo.shopCar]
      })
       this.blance();
    }
  },
  // 全选商品
  select_all(){
    let arr = this.data.goodsList;
  if(this.data.selectAll){
   arr.forEach( item => item.state = "false") 
    this.setData({
      selectAll : false ,
      goodsList:[...arr]
    })
    }else{
    arr.forEach(item => item.state = "true")
    this.setData({
      selectAll: true,
      goodsList: [...arr]
    })

    }
    this.blance();
  },
  // 计算总价格
  blance(){
    let total = this.data.goodsList.reduce((a, item) => {
      if (item.state == "true") {
        if (item.goodsSalePrice) {
          return a + (item.goodsSalePrice * item.goodsNum)
        } else {
          return a + (item.goodsPrice * item.goodsNum)
        }
      } else {
        return a
      }
    }, 0)
    let totalNum = this.data.goodsList.reduce((a, item) => {
      if (item.state == "true") {
        return a +  item.goodsNum
      } else {
        return a
      }
    }, 0)
  
    this.setData({
      total: total.toFixed(2),
      totalNum
    })
  },
  //  勾选商品
  select: function(e) {
    console.log(e.currentTarget.dataset.id);
    this.data.goodsList[e.currentTarget.dataset.id].state = this.data.goodsList[e.currentTarget.dataset.id].state =="true" ? "false" :"true"
    this.setData({
      goodsList:[...this.data.goodsList],
      
    })
    this.blance();
    console.log(this.data.goodsList)
  },
  // 增加商品数量
  add(e){
    let arr = this.data.goodsList;
    arr[e.currentTarget.dataset.id].goodsNum += 1-0;
      this.setData({
        goodsList: [...arr]
      })
    this.changeNum();
    this.blance();
  },
  // 减少
  dec(e){
    console.log(e)
    let arr = this.data.goodsList ;
    if (arr[e.currentTarget.dataset.id].goodsNum>1){
      arr[e.currentTarget.dataset.id].goodsNum -=1;
      this.setData({
        goodsList: [...arr]
      })
    }
    this.changeNum();
    this.blance();
  },
  // 改变数据库中购物车商品数量
  changeNum(){
    wx:wx.request({
      url: ip2+'/user/update',
      data: {
        _id: app.globalData.userInfo._id,
        shopCar:this.data.goodsList
      },
     })
  }

})
