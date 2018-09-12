let defaultiIp = require('../../default.js');

let ip1 = defaultiIp.ip1;
let ip2 = defaultiIp.ip2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip1,
    goodsType: [{
        id: '5b87babeeea0e41478ea5f64',
        text: "美妆护肤"
      },
      {
        id: '5b87bac2eea0e41478ea5f65',
        text: "家具建材"
      },
      {
        id: '5b87bbfbeea0e41478ea5f66',
        text: "干果炒货"
      },
      {
        id: '5b87c4a5eea0e41478ea5f77',
        text: "水果甜品"
      },
      {
        id: '5b87c858eea0e41478ea5f7d',
        text: "夏日衣裙"
      },
      {
        id: '5b87c86deea0e41478ea5f7e',
        text: "钟表奢品"
      },
    ],
    goods: [],
    defaultSelect: '5b87babeeea0e41478ea5f64',
    isLoad: false,


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
  
  // 展示商品
  show_goods(id) {
    this.setData({
      isLoad: true,
      defaultSelect: id,
      goods: []
    })
    setTimeout(() => {
      wx.request({
        url: ip2 + '/goods/find', //仅为示例，并非真实的接口地址
        data: {
          shops: id
        },
        success: (res) => {
          let arr = [...res.data];
          arr.forEach(item => item.indexImg = item.indexImg.replace(/[\\]/g, '/'))
          this.setData({
            goods: [...arr],
            isLoad: false
          })
          console.log(this.data.goods)
        }
      })

    }, 200)

  },
  // 选择不同类型
  load_goods(e) {
    this.show_goods(e.target.dataset.id)
  },
  // 生命周期函数--监听页面加载

  onLoad: function() {

    this.show_goods(this.data.defaultSelect)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})