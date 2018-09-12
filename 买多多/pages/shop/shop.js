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
     shopInfo : null ,
    currentTab : 0 ,
    scrollTop: 0,
    goodsList:[],
    isCollection:false

  },
  Collection(){
    let obj = this.data.shopInfo;
    obj.fans = obj.fans-0+1;
    this.setData({
      isCollection:true,
      shopInfo: obj
    })
    wx:wx.request({
      url: ip2+'/shops/update',
      data: {
        _id: this.data.shopInfo._id,
        fans: this.data.shopInfo.fans
      },
      
    })
  },
  //滚动监听
  onPageScroll: function (e) {
    // console.log(e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  // 跳转搜索页面
  search() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //  前往商品页面
  go_details(e) {

    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.id
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
   wx.request({
     url: ip2+'/shops/find',
     data:{
       _id: options.id
     },
     success:(res)=>{
       res.data.backimg = res.data.backimg.replace(/[\\]/g, '/')
       res.data.logo = res.data.logo.replace(/[\\]/g, '/')
       res.data.img = res.data.img.map(item => item.replace(/[\\]/g, '/'))
     this.setData({
       shopInfo: res.data,
       currentTab : options.currentId
     })
       console.log(this.data.shopInfo)
     }
   })
    this.loadGood(options.id)
  },
  // 加载商品
  loadGood(id){
    wx.request({
      url: ip2 + '/goods/find',
      data: {
        shops: id
      },
      success: (res) => {
        res.data.forEach( item =>{
          item.indexImg =  item.indexImg.replace(/[\\]/g, '/')
        })
          this.setData({
           goodsList : [...res.data]
        })
        console.log(this.data.goodsList)
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