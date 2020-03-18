// pages/member/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: false,
    tabcurren: 3,
  },

  // 个人动态
  tapIndex(e) {
    console.log("个人主页");
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data);
        if (res.data) {
          openid = res.data;
          var url = util.U({ c: 'yqw/meet/user', a: 'checkUserUtil' },
            app.globalData.url);
          util.basePost(url, { openid: res.data, appid: app.data.appId }, function (res) {
            console.log(res)
            if (res.data.user == '1') {
              wx.navigateTo({
                url: '/pages/member/info/info?openid=' + openid
              })
            } else {
              //跳转到填写用户资料
              wx.showModal({
                title: '确认',
                content: '请先填写个人资料',
                confirmText: "确定",
                cancelText: "取消",
                success: function (res) {
                  console.log(res);
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/useredit/useredit',
                    })
                  }
                }
              });
            }


          });
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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