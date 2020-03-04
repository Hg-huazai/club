// pages/home/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    icon: true,
    name: '广州',
    city: [
      { name: '广州', icon: 'chengshiguanli-zaiban', src: '/static/home/images/images/city1_03.png', state:1},
      { name: '深圳', icon: 'chengshiguanli-hecha', src: '/static/home/images/images/city1_05.png', state: 2 },
      { name: '杭州', icon: 'hangzhou_fense', src: '/static/home/images/images/city1_07.png', state: 3 },
      { name: '长沙', icon: 'chengdu_fense', src: '/static/home/images/images/city1_09.png', state: 4 },
      { name: '佛山', icon: 'chengshiicon-da', src: '/static/home/images/images/city2_03.png', state: 5 },
      { name: '东莞', icon: 'zhihuichengshi', src: '/static/home/images/images/city2_05.png', state: 6 },
      { name: '中山', icon: 'chengshi1', src: '/static/home/images/images/city2_07.png', state: 7 },
      { name: '惠州', icon: 'guanlianchengshi', src: '/static/home/images/images/city2_09.png', state: 8 },
    ]
  },
  citytap (){
    // console.log("city")
    this.setData({
      show:false,
      icon: false
    })
  },
  bgtap(){
    // console.log("bg")
    this.setData({
      show: true,
      icon: true
    })
  },
  closetap(){
    // console.log('点击关闭')
    this.setData({
      show:true,
      icon: true
    })
  },
  // 点击了所属的城市
  nametap(e){
    // console.log('城市')
    // console.log(e)
    // console.log(e.currentTarget.dataset.state)
    var arr = this.data.city[e.currentTarget.dataset.state].name
    this.setData({
      show:true,
      icon: true,
      name: arr
    })
    // console.log(arr)
    wx.showToast({
      title: '您选择了'+arr,
      duration: 2000
    })
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