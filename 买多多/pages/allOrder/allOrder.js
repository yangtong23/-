let defaultiIp = require('../../default.js');
let app = getApp();
let ip1 = defaultiIp.ip1;
let ip2 = defaultiIp.ip2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip1,
    currentTab: 0,
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx:wx.request({
     url: ip2+'/order/find',
     data: {
       userId: app.globalData.userInfo._id
     },
     header: {},
     success: (res)=> {
       this.setData({
         orderList: [...res.data]
       })
      console.log(this.data.orderList)
     },
  })
   
  },
  // 切换选项
  swichNav: function (e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })

  },
//  取消订单
  cancel_order(e){
    console.log(e)
    wx.showModal({
      title: '',
      content: '确认取消？',
      confirmText: "确定",
      cancelText: "取消",
      success: (res) => {
        console.log(res);
        if (res.confirm) {
          let id = e.currentTarget.dataset.id;
          let arr = this.data.orderList.filter(item=> item._id != id)
          this.setData({
            orderList: [...arr]
          })
          wx:wx.request({
            url: ip2+'/order/del',
            data: { _id: id},
            
          })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
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