let defaultiIp = require('../../default.js');
let app = getApp();
let ip1 = defaultiIp.ip1;
let ip2 = defaultiIp.ip2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isLogin: true,
   uname:"",
   pwd:"",
  },
  // 监听输入框事件
  input(e){
   
      
    if(e.target.dataset.id=="uname"){
      this.setData({
        uname : e.detail.value
      })
    }else{
      this.setData({
        pwd: e.detail.value
      })
    }
    if (this.data.uname !== "" && this.data.pwd !== "") {
      this.setData({
        isLogin: false
      })
    }else{
      this.setData({
        isLogin: true
      })

    }
      
    
  },
  //  登录
  login(){
    wx.showToast({
      title: '登录中',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(()=>{
      wx.request({
        url: ip2 + '/user/find',
        data: {
          uname: this.data.uname,
          pwd: this.data.pwd,
          findType: "exact"
        },
        success: (res) => {
          console.log(res.data)
          // 登录成功
          if (res.data.length > 0) {
            app.globalData.userInfo = res.data[0]
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000
            });
            wx.navigateBack();
          }else{
            wx.showToast({
              title: '登录失败，账号或密码不正确，请重新输入',
              icon: 'none',
              duration: 1000
            });

          }

        }
      })
    },1000)
   
  },
  // 前往注册
  reg(){
    wx.navigateTo({
      url: '../reg/reg',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app)
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