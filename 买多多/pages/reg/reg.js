let defaultiIp = require('../../default.js');
let app = getApp();
let ip1 = defaultiIp.ip1;
let ip2 = defaultiIp.ip2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: true,
    uname:"",
    pwd:"",
    isLogin: true,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  input(e){
    if (e.target.dataset.id == "uname") {
      this.setData({
        uname: e.detail.value
      })
    } else {
      this.setData({
        pwd: e.detail.value
      })
    }
    if (this.data.uname !== "" && this.data.pwd !== ""&&this.data.isAgree) {
      this.setData({
        isLogin: false
      })
    } else {
      this.setData({
        isLogin: true
      })

    }
  },
  //  注册
  reg() {
    let params = {
      uname: this.data.uname,
      pwd: this.data.pwd,
      "nickName": "多宝宝",
      "head": "",
      "gender": "",
      "area": "",
      address:{
        "phone": "",
        'acctName':"",
        "address": "",
      },
      "favorite": [],
      "favoriteShops": [],
      "history": [],
      "order": [],
      "coupon": [],
      "shopCar": [],
    }
    wx.showToast({
      icon: 'loading',
      duration: 500
    });
    setTimeout(() => {
      wx.request({
        url: ip2 + '/user/add',
        data: params, 
        success: (res) => {
          console.log(res.data)
          params._id = res.data
          app.globalData.userInfo = params;
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 1000
            });
          wx.switchTab({
            url: '../mine/mine'
          })
        }
      })
    }, 500)

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.chooseAddress({
    //   success: function (res) {
    //     console.log(res.userName)
    //     console.log(res.postalCode)
    //     console.log(res.provinceName)
    //     console.log(res.cityName)
    //     console.log(res.countyName)
    //     console.log(res.detailInfo)
    //     console.log(res.nationalCode)
    //     console.log(res.telNumber)
    //   }
    // }),
 
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