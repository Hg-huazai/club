// pages/news/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar1:[
      { name: '活动', icon: 'icon-huodong', url: '/pages/home/index/index'},
      { name: '消息', icon: 'icon-xiaoxi6', url: '/pages/news/index/index'},
      { name: '我的', icon: 'icon-wodedangxuan', url: '/pages/member/index/index'},
    ],
    tabbar2: [
      { name: '活动', icon: 'icon-huodong', url: '/pages/home/index/index'},
      { name: '嘉宾', icon: 'icon-jiabin', url: '/pages/vip/index/index' },
      { name: '消息', icon: 'icon-xiaoxi6', url: '/pages/news/index/index'},
      { name: '我的', icon: 'icon-wodedangxuan', url: '/pages/member/index/index'},
    ],
    show: true,
    curren: 0,
    tabbar: false,
    tabcurren: 2,
  },
  tabbar(e){
    // console.log(e)
    this.setData({
      curren: e.currentTarget.dataset.curren
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.tabbar)
    this.setData({
      tabcurren: options.tabbar
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