let timer;
let defaultiIp = require('../../default.js');

let ip1 = defaultiIp.ip1;
let ip2 = defaultiIp.ip2;
Page({
  data: {
    imgUrls: [

      '../../img/15.jpg',
      '../../img/8.jpg',
      '../../img/9.jpg',
      '../../img/12.jpg',
      '../../img/14.jpg',
      '../../img/5.jpg',
    ],
    textList: [
      "ipone 9 九月问世,性能惊人",
      "5G手机来了,4G手机还有必要买吗？",
      "小米曝光新手机参数,就剩价格没说了",
      "为什么懂电脑的人不买i7处理器",
      "多多会员低至10元"
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    interval1: 3000,
    duration: 500,
    indicatorAactiveCcolor: "white",
    indicatorColor: "#797979",
    iconList: [{
        src: "../../img/a1.png",
        text: '多多超市'
      },
      {
        src: "../../img/a2.png",
        text: '全球购'
      },
      {
        src: "../../img/a3.png",
        text: '潮流大牌'
      },
      {
        src: "../../img/a4.png",
        text: '生鲜水果'
      },
      {
        src: "../../img/a5.png",
        text: '送货到家'
      },
      {
        src: "../../img/a6.png",
        text: '充值缴费'
      },
      {
        src: "../../img/a7.png",
        text: '10元拼'
      },
      {
        src: "../../img/a8.png",
        text: '优惠劵'
      },
      {
        src: "../../img/a9.png",
        text: '赚钱'
      },
      {
        src: "../../img/a10.png",
        text: '全部'
      },

    ],
    activeHour: new Date().getHours(),
    hours: "",
    minutes: "",
    seconds: "",
    secKillGoods: [],
    groomGoods: [],
    ip1: ip1,
    page: 2,
    more: false,
    isLoad: false,
    scrollTop:0,
    upLoad :false
  },
  onLoad() {
   
    this.timing();
    this.secKill();
    this.findGood(2);

  },
  // 挑战搜索页面
  search(){
    wx.navigateTo({
      url: '../search/search'
    })
  },
  //  前往商品页面
  go_details(e){
    
    wx.navigateTo({
      url: '../goods/goods?id=' + e.currentTarget.dataset.id
    })
  },
  //  调取秒杀商品
  secKill() {
    wx.request({
      url: ip2 + '/goods/find', //仅为示例，并非真实的接口地址
      data: {
        page: 1,
        rows: 4
      },
      success: (res) => {
        let arr = [...res.data.rows];
        arr.forEach(item => item.indexImg = item.indexImg.replace(/[\\]/g, '/'))
        this.setData({
          secKillGoods: [...res.data.rows]
        })
        console.log(this.data.secKillGoods)
      }
    })

  },
  // 调取商品
  findGood(page = 2) {
    let bofore_length = this.data.groomGoods.length;
    let after_length;
    wx.request({
      url: ip2 + '/goods/find', //仅为示例，并非真实的接口地址
      data: {
        page: page,
        rows: 4
      },
      success: (res) => {
        let arr = [...res.data.rows];
        arr.forEach(item => item.indexImg = item.indexImg.replace(/[\\]/g, '/'))
        this.setData({
          groomGoods: [...this.data.groomGoods, ...res.data.rows]
        })
        after_length = this.data.groomGoods.length
        if (bofore_length == after_length) {
          this.setData({
            more: true,
            isLoad: false

          })
        }

        console.log(this.data.groomGoods, bofore_length, after_length)

      }
    })
  },
  //  秒杀计时器
  timing() {
    let activeMinutes = new Date().getMinutes() + 60; //本地时间分钟数
    let activesecond = activeMinutes * 60; //转换为秒数

    timer = setInterval(() => {
      activesecond--;
      let hour = Math.floor(activesecond / 3600);
      let minute = Math.floor(activesecond % 3600 / 60);
      let second = activesecond % 60;

      this.setData({
        hours: (hour > 0 ? "01" : "00"),
        minutes: (minute > 9 ? minute : "0" + minute),
        seconds: (second > 9 ? second : "0" + second)

      })
      if (activesecond < 1) {
        clearInterval(timer)
      }

    }, 1000)

  },
  // 页面隐藏
  onHide: function () {
    // clearInterval(timer); //  清除定时器
  },
  // 卸载阶段
  onUnload() {
    clearInterval(timer); //  清除定时器
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function() {
    this.setData({
      more: false,
      isLoad: true
    })
    setTimeout(() => {
      this.setData({
        page: this.data.page + 1,
        isLoad: true
      })
      this.findGood(this.data.page);
    }, 200)

},
   //滚动监听
  onPageScroll: function (e) {
    // console.log(e.scrollTop)
    this.setData({
      scrollTop: e.scrollTop
    })
  },
 
  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      upLoad: true
    })
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
     wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },

})