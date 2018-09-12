let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[{
        text: "待付款",
        url:'../../img/apply.png'
     },
      {
        text: "待发货",
        url: '../../img/send.png'
      },
      {
        text: "待收货",
        url: '../../img/accept.png'
      },
      {
        text: "待评价",
        url: '../../img/comment.png'
      },
      {
        text: "售后",
        url: '../../img/shopafter.png'
      },
    ],
    houseList: [{
      text: "优惠券",
      url: '../../img/coupon.png'
    },
    {
      text: "商品收藏",
      url: '../../img/house_goods.png'
    },
    {
      text: "商铺收藏",
      url: '../../img/house_shop.png'
    },
    {
      text: "足迹",
      url: '../../img/footprint.png'
    },
    ],
    welfareList: [{
      text: "打卡领红包",
      url: '../../img/sign.png'
    },
    {
      text: "砍价免费拿",
      url: '../../img/free.png'
    },
    {
      text: "一分抽奖",
      url: '../../img/lucky.png'
    },
    {
      text: "开宝箱领钱",
      url: '../../img/box.png'
    },
    {
      text: "收货地址",
      url: '../../img/box.png'
    },
    {
      text: "开宝箱领钱",
      url: '../../img/address.png'
    },
    {
      text: "我的评价",
      url: '../../img/my_comment.png'
    },
    {
      text: "设置",
      url: '../../img/set.png'
    },
    ],
    userInfo:null,
    isLogin : false
  },
 
  login(){
           wx.navigateTo({
             url: '../login/login',
             })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  order(){
    if (app.globalData.userInfo){
      wx.navigateTo({
        url: '../allOrder/allOrder',
      })
    }else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
    
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
  if(app.globalData.userInfo){
    this.setData({
      isLogin : true,
      userInfo: app.globalData.userInfo
    })
  }else{
    this.setData({
      isLogin: false
    })
  }
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