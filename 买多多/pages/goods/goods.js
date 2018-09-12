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
    goodsInfo: null,
    shopsInfo: null,
    showModalStatus: false,
    animationData: {},
    norms: [],
    num: 1,
    houseImg: '../../img/house.png',
    types: "",
    norm1: "",
    norm2: "",
    isSee: false,
    modelType: "", //弹出层是购物车还是下单
    isType: false, //是否是一个类型

  },
  //  选择规格
  select_norms(e) {
    setTimeout(() => {
      if (this.data.isType) {
        this.setData({
          norm1: e.currentTarget.dataset.type,
        })
      } else {
        this.setData({
          norm2: e.currentTarget.dataset.type,
        })
      }
      console.log(this.data.norm1, this.data.norm2)
    }, 100)

  },
  //  规格类型
  select_type(e) {
    if (this.data.types == "") {
      this.setData({
        isType: true,
        types: e.currentTarget.dataset.type
      })
    } else if (e.currentTarget.dataset.type == this.data.types) {
      this.setData({
        isType: true,
      })
    } else {
      this.setData({
        isType: false,
      })
    }
  },
  dec() {
    if (this.data.num > 1)
      this.setData({
        num: this.data.num - 1
      })
  },
  add() {
    this.setData({
      num: this.data.num + 1
    })

  },
  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    wx.request({
      url: ip2 + '/goods/find',
      data: {
        _id: options.id
      },
      success: (res) => {
        console.log(res.data)

        let arr = res.data.norms.map(item => {
          return {
            types: item.split(":")[0],
            list: item.split(":")[1].split('-')
          }
        })
        console.log(arr)
        res.data.img = res.data.img.map(item => item.replace(/[\\]/g, '/'))
        res.data.indexImg = res.data.indexImg.replace(/[\\]/g, '/')
        res.data.infoImg = res.data.infoImg.map(item => item.replace(/[\\]/g, '/'))
        console.log(res.data)
        this.setData({
          goodsInfo: res.data,
          norms: arr
        })

        wx.request({
          url: ip2 + '/shops/find',
          data: {
            _id: res.data.shops
          },
          success: (msg) => {
            let obj = msg.data
            obj.logo = obj.logo.replace(/[\\]/g, '/')
            this.setData({
              shopsInfo: obj
            })


          }
        })
      }
    })
  },
  // 收藏商品
  house_goods() {
    this.setData({
      houseImg: '../../img/house1.png'
    })
    console.log('JS内容待续')
  },
  //  前往商店
  goShop(e) {
    wx.navigateTo({
      url: '../shop/shop?currentId=' + e.currentTarget.dataset.id + "&id=" + this.data.shopsInfo._id
    })

  },
  // 弹出框确定按钮
  sure(e) {
    if (this.data.norm1 == "") {
      wx.showToast({
        title: '请选择商品属性',
        icon: 'none',
        duration: 1000
      });
    } else {
      if (app.globalData.userInfo) { //判断是否登录
        if (e.currentTarget.dataset.id == "shopcar") { // 判断是购物车  还是下订单购买

          wx.showToast({
            title: '添加到购物车~',
            icon: 'success',
            duration: 1000
          });
          this.hideModal();
          let params = {
            id: app.globalData.userInfo.shopCar.length+1,
            goodsId: this.data.goodsInfo._id,
            shopId: this.data.shopsInfo._id,
            goodsImg: this.data.goodsInfo.indexImg,
            goodsName: this.data.goodsInfo.name,
            shopName: this.data.shopsInfo.name,
            goodsNorms: this.data.norm1 + "  " + this.data.norm2,
            goodsNum: this.data.num,
            goodsPrice: this.data.goodsInfo.price,
            goodsSalePrice: this.data.goodsInfo.salePrice,
            goodsExpress: this.data.goodsInfo.express,
            state: "false"
          }
          app.globalData.userInfo.shopCar.push(params)
          console.log(app.globalData.userInfo.shopCar)
          wx: wx.request({
            url: ip2 + '/user/update',
            data: {
              _id: app.globalData.userInfo._id,
              shopCar: app.globalData.userInfo.shopCar
            },
            success: function(res) {},

          })

        } else {
          let param = {
            total: this.data.num * (this.data.goodsInfo.salePrice ? this.data.goodsInfo.salePrice : this.data.goodsInfo.price) + (this.data.goodsInfo.express-0),
            order: [{
              shopId: this.data.shopsInfo._id,
              goodsId: this.data.goodsInfo._id,
              goodsImg: this.data.goodsInfo.indexImg,
              goodsName: this.data.goodsInfo.name,
              goodsNorms: this.data.norm1 + "  " + this.data.norm2,
              goodsPrice: this.data.goodsInfo.price,
              goodsSalePrice: this.data.goodsInfo.salePrice,
              goodsNum: this.data.num,
              goodsExpress: this.data.goodsInfo.express
            }]
          }
          wx.navigateTo({
            url: '../order/order?order=' + JSON.stringify(param)
          })

          console.log(param)
        }
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1000
        });
        wx.navigateTo({
          url: '../login/login'
        })
      }
    }
  },
  //显示对话框
  showModal: function(e) {
    if (e.currentTarget.dataset.id) {
      this.setData({
        isSee: true
      })
    } else {
      this.setData({
        isSee: false
      })
    }
    this.setData({
      modelType: e.currentTarget.dataset.type
    })

    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
      norm1: "",
      norm2: "",
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 0)
  },
  //隐藏对话框
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
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