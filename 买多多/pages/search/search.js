let defaultiIp = require('../../default.js');

let ip1 = defaultiIp.ip1;
let ip2 = defaultiIp.ip2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip1,
    value :"女装",
    disHistory  : "0" ,
    shopList :[],
    goodsList:[],
    history:[],
    result:[]
  },
  // 前往店铺
  go_shop(e){
    wx.navigateTo({
      url: '../shop/shop?id=' + e.currentTarget.dataset.id
    })
  },
//  前往商品页面
  go_details(e) {
  wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.id
    })
  },
  // 输入文字预搜索
 loadInput(e){
  if(e.detail.value){
     this.setData({
       value: e.detail.value,
       disHistory:"1"
     })
     wx:wx.request({
       url: ip2+'/shops/find',
       data: { name: e.detail.value },
       success: (res)=> {
         res.data.forEach(item => item.logo = item.logo.replace(/[\\]/g, '/'))
          this.setData({
            shopList :[...res.data]
          })
       }
    })
    wx: wx.request({
      url: ip2 + '/goods/find',
      data: { name: e.detail.value },
      success:  (res)=> {
        this.setData({
          goodsList: [...res.data]
        })
      }
    })
  }else{
    this.setData({
      value: e.detail.value,
      disHistory: "0"
    })
  }
  console.log(this.data.shopList,this.data.goodsList)
 },
//  搜索函数
search_btn(param){
  wx: wx.request({
    url: ip2 + '/goods/find',
    data: { name: param },
    success: (res) => {
      res.data.forEach(item => {
        item.indexImg = item.indexImg.replace(/[\\]/g, '/')
      })
      this.setData({
        result: [...res.data],
        disHistory: "2"
      })
      console.log(this.data.result)
    }
  })
 
},
//  搜索
  search(){
    let arr =[...this.data.history, this.data.value] ;
     let set1 = new Set(arr);
     let arr2 = [...set1]
     console.log(arr,set1,arr2)
    wx.setStorage({
      key: "history",
      data: [...arr2]          // 将搜索历史保存到缓存中
    })
    this.setData({
      history: [...arr2],     // 将搜索历史保存到data中
            })
    this.search_btn(this.data.value);
  },
  // 通过历史结果搜索
  search_history(e){
    this.search_btn(e.currentTarget.dataset.id);  //传递历史结果的值进行搜索
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'history',
      success:  (res) =>{
        this.setData({
          history: [...res.data]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})