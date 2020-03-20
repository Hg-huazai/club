// pages/news/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    tabbar: false,
    tabcurren: 2,
    info: [
      { name: '源子柔1', content: '你好，我可以认识你吗', url:'/static/home/images/active_03.png'},
      { name: '源子柔2', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
      { name: '源子柔3', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
      { name: '源子柔4', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
      { name: '源子柔5', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
      { name: '源子柔6', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
    ]
  },
  itemtap(e){
    console.log(e)
    var id = e.currentTarget.dataset
    console.log(id)
    wx.navigateTo({
      url: '../message/message?id='+id,
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