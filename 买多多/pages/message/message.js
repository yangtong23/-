// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welfareList:[
      {
        text: "交易物流",
        url: '../../img/logistics.png'
      },
      {
        text: "通知",
        url: '../../img/notice.png'
      },
      {
        text: "互动",
        url: '../../img/chat.png'
      },
      ],
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})