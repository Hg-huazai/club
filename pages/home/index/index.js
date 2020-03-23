// pages/home/index/ceshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar1: [
      { name: '活动', icon: 'icon-huodong', state: 1 },
      { name: '消息', icon: 'icon-xiaoxi6', state: 3 },
      { name: '我的', icon: 'icon-wodedangxuan', state: 4 },
    ],
    tabbar2: [
      { name: '活动', icon: 'icon-huodong', state: 1 },
      { name: '嘉宾', icon: 'icon-jiabin', state: 2 },
      { name: '消息', icon: 'icon-xiaoxi6', state: 3 },
      { name: '我的', icon: 'icon-wodedangxuan', state: 4 },
    ],
    tabcurren: 0,
    state: 1,
    tabbar: false,    //没有嘉宾为true/有为false
  },

  tabbar(e) {
    // console.log(e)
    // var that = this
    var index = e.currentTarget.dataset.curren
    
    // console.log(state.state)
    if(this.data.tabbar){
      // 循环没有嘉宾的tabbar
      var state1 = this.data.tabbar1[index].state
      console.log(1)
      this.setData({
        tabcurren: e.currentTarget.dataset.curren,
        state: state1,
      })
    }else {
      // 循环有嘉宾的tabbar
      var state = this.data.tabbar2[index].state
      console.log(2)
      this.setData({
        tabcurren: e.currentTarget.dataset.curren,
        state: state,
      })
    }
    
    // state.state
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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