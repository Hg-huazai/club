// pages/vip/vip/vip.js
var util = require('../../../utils/util_7.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: 0,
    left: 0,
    curren1: 0,
    curren2: 0,
    show1: true,
    set1: '男',
    add: '广州',
    ageSmall: 18,
    ageMax: 26,
    tabbar: false,
    tabcurren: 1,
    set2: [
      { name: "男", state: 1 },
      { name: "女", state: 2 },
    ],
    city: [
      { name: "北京", state: 1 },
      { name: "上海", state: 2 },
      { name: "广州", state: 3 },
      { name: "深圳", state: 4 },
      { name: "杭州", state: 5 },
      { name: "成都", state: 6 },
      { name: "南京", state: 7 },
      { name: "天津", state: 8 },
      { name: "武汉", state: 9 },
      { name: "其他内地", state: 10 },
      { name: "港澳台", state: 11 },
      { name: "海外", state: 12 },
    ],
    starArray: ['不选', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座'],
    eduArray: ['大专', '本科', '硕士', '博士'],
    feeArray: ['不选', '5万以下', '5~10万', '10~20万', '20~30万', '30~50万', '50万以上'],
    page: 1,

    leftList: [],
    rightList: [],
    leftHight: 0,
    rightHight: 0,
  },
  settap(e) {
    // console.log("点击了性别")
    console.log(e)
    // var set1 = this.data.set2[e.currentTarget.dataset.state].name
    var set1 = this.data.set2[e.currentTarget.dataset.curren].name
    this.setData({
      curren1: e.target.dataset.curren,
      set1
    })
    // console.log(e.currentTarget.dataset.curren)
    // console.log(set1)
  },
  citytap(e) {
    // console.log(e)
    // console.log("点击了城市");
    // var arr = this.data.city[e.currentTarget.dataset.state].name
    var arr = this.data.city[e.currentTarget.dataset.curren1].name
    this.setData({
      add: arr,
      curren2: e.currentTarget.dataset.curren1
    })
    // console.log(e.currentTarget.dataset.state);
  },
  // 点击了筛选
  saixuantap() {
    // console.log("点击了筛选")
    this.setData({
      show1: !this.data.show1
    })
  },
  // 点击背景关闭筛选
  bgtap() {
    this.setData({
      show1: true
    })
  },
  // 触发最小年龄
  ageSmall(e) {
    // console.log(e);
    // console.log(e.detail.value); 
    var ageSmall = e.detail.value;
    this.setData({
      ageSmall: ageSmall
    })
    // console.log(ageSmall); 
  },
  // 触发最大年龄
  ageMax(e) {
    // console.log(e);
    // console.log(e.detail.value); 
    var ageMax = e.detail.value;
    this.setData({
      ageMax
    })
  },

  // // console.log('瀑布流')
  // diaoyongtap(){
  //   var that = this
  //   // 屏幕的宽度
  //   var width= wx.getSystemInfoSync().windowWidth
  //   // console.log('屏幕的宽度'+ width)

  //   // 获取h-box的高宽
  //   var query = wx.createSelectorQuery();
  //   query.select('.h-box').boundingClientRect()
  //   query.exec((res) => {
  //     // 获取box高度
  //     var boxHeight = res[0].height;
  //     // console.log(boxwidth) 
  //     // 获取box宽度
  //     var boxwidth = res[0].width; 
  //     // console.log(boxwidth)
  //   })

  //   // 所有的数组
  //   var list = that.data.list
  //   // console.log(list)

  //   //定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
  //   var leftH = that.data.leftHight
  //   var rightH = that.data.rightHight
  //   var leftData = [];
  //   var rightData = [];

  //   for (var i = 0; i < list.length; i++) {
  //     // 获取h-box的高宽
  //     var query = wx.createSelectorQuery();
  //     query.select('.h-box').boundingClientRect()
  //     query.exec((res) => {
  //       // 获取box高度
  //       var boxHeight = res[0].height;
  //       var currentItemHeight = boxHeight
  //       console.log(currentItemHeight)
  //     })
      
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadUsers();
    console.log(options)
    this.setData({
      tabcurren: options.tabbar
    })
    
  },

  loadUsers: function () {
    var that = this;
    var url = util.U({ c: 'yqw/meet/user', a: 'loadAllUserByPage' },
      app.globalData.url);
    var queryData = { page: that.data.page, appid: app.data.appId };
    util.basePost(url, queryData, function (res) {
      console.log(res.data)
      that.setData({
        list: res.data.list,
        hasMore: res.data.hasMore
      })
    });
  },

  //加载更多
  loadMore: function (e) {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    if (!this.data.hasMore) return

    var url = util.U({ c: 'yqw/meet/user', a: 'loadAllUserByPage' },
      app.globalData.url);
    var queryData = { page: ++that.data.page, appid: app.data.appId };
    util.basePost(url, queryData, function (res) {
      console.log(res.data)
      that.setData({
        list: that.data.list.concat(res.data.list),
        hasMore: res.data.hasMore
      })
    });

  },

  touserdetail: function (e) {
    var openid = e.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '/pages/vip/info/info?openid=' + openid
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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight + 50,
          windowWidth: res.windowWidth
        })
      }
    });
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