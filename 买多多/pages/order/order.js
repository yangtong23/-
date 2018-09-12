let defaultiIp = require('../../default.js');
let app = getApp();
let ip1 = defaultiIp.ip1;
let ip2 = defaultiIp.ip2;
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip1,
    shopList : [] ,
    goodsList:[],
    userInfo:{},
    address:{
      name:"",
      phone:"",
      details:"",
      total:0,

      showPayPwdInput: false,  //是否展示密码输入层
      pwdVal: '',  //输入的密码
      payFocus: true, //文本框焦点
    },
  },
  // 前往收货地址
  address(){
    wx.chooseAddress({
      success:  (res)=> {
        this.setData({
          address:{
            name: res.userName,
            phone: res.telNumber,
            details: res.provinceName + res.cityName + res.detailInfo
          }
        })
      }
    })
  },
  // 支付
  balance(){
    if (this.data.address.name) {
    wx.showActionSheet({
      itemList: ['微信支付', '支付宝', '信用卡'],
      success:  (res) =>{
        if (!res.cancel) {
          if(res.tapIndex==0){
                this.showInputLayer();
          }
        }
      }
      
    })
  }else{
    wx: wx.showToast({
      title: '请先选择收货地址',
      icon: 'none',
      duration: 1000,

    })
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let str = decodeURIComponent( options.order );
    let obj = JSON.parse(str)
    
    console.log(obj)
    let goodsList = [...obj.order];
    let shopList = obj.order.map(item => item.shopId);
    shopList = new Set(shopList) ;
    shopList = [...shopList] ;
    let shops = [] ;
    for (let item of shopList){
         wx:wx.request({
           url: ip2+'/shops/find',
           data: { _id:item},
           success: function(res) {
             res.data.logo = res.data.logo.replace(/[\\]/g, '/')
             shops.push(res.data)
           },
           
         })
    }
    setTimeout( ()=>{
       this.setData({
         shopList:[...shops],
         goodsList:[...goodsList],
         total: obj.total
       })
      console.log(this.data.shopList,this.data.goodsList)
    },500)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.showInputLayer();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo = app.globalData.userInfo;
    this.setData({
       userInfo,
    })
  },
  /**
  * 显示支付密码输入层
  */
  showInputLayer: function () {
    
    this.setData({ showPayPwdInput: true, payFocus: true });
    
  },
  /**
 * 添加订单
 */
  add_order(){
   let params={
     userId: this.data.userInfo._id,
     address: this.data.address,
     total :this.data.total,
     shopList: this.data.shopList,
     goodsList: this.data.goodsList,
     creatTime: util.formatTime(new Date()),
     sendTime: "",
     successTime: "",
     state: 1,
     isAssess: false
 }
   wx:wx.request({
     url: ip2+'/order/add',
     data: params,
  })
  },
  /**
 * 隐藏支付密码输入层
 */
  hidePayLayer: function () {

    var val = this.data.pwdVal;

    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' },  ()=> {
      console.log(val)
      if (val=="123456"){
        // 去除购物车中已下订单的商品
        let arr = []
        let r =this.data.goodsList
        let a = app.globalData.userInfo.shopCar
        for (let i = 0; i < a.length; i++) {
          let flag = true;
          let temp = a[i];
          for (let j = 0; j < r.length; j++) {
            if (temp.id === r[j].id) {
              flag = false;
              break;
            }
          }
          if (flag) {
            arr.push(temp);
          }
        }
        arr.forEach((item,index)=>{
          item.id = index+1;
        })
        console.log(arr)
        app.globalData.userInfo.shopCar = [...arr]   //改变购物车内商品
        wx:wx.request({
          url: ip2+'/user/update',
          data: {
            _id: app.globalData.userInfo._id,
            shopCar:[...arr]
          },
          
        })
        this.add_order();
      wx.navigateTo({
          url: '../success/success?id=' + this.data.total
        })
      }else if (val.length<6){
        console.log('关闭')
      }
      else{
        wx.showModal({
          title: '',
          content: '支付密码有误',
          confirmText: "重新输入",
          cancelText: "忘记密码",
          success:  (res)=> {
            console.log(res);
            if (res.confirm) {
              this.showInputLayer();
            } else {
              console.log('用户点击辅助操作')
            }
          }
        });
      }
    });

  },
  /**
  * 获取焦点
  */
  getFocus: function () {
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({ pwdVal: e.detail.value });

    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
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