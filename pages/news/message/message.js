// pages/news/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: true,
    rightArr: [],
    concent: '',
    textvalue: '',
  },
  liketap(){
    var that = this
    if(this.data.color){
      wx.showToast({
        title: '比心成功',
        icon: 'success',
        duration: 2000
      })
      that.setData({
        color: false
      })
    }else {
      wx.showToast({
        title: '已取消比心',
        icon: 'success',
        duration: 2000
      })
      that.setData({
        color: true
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  // 表单数据
  formsubmit(e){
    console.log(e)
    var concent = e.detail.value.textarea
    // console.log(concent)
    this.setData({
      concent: concent
    })
  },
  // 点击发送
  submittap(){
    if(!this.data.concent ==''){
      var rightArr = this.data.rightArr
      // console.log(nowcontent)
      var nowcontent = this.data.concent
      // console.log(nowcontent)
      rightArr.push(nowcontent)
      console.log(rightArr)
      this.setData({
        // nowcontent = this.data.concent
        rightArr: rightArr,
        textvalue: '',
      })
    }
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