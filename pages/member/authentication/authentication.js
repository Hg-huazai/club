// pages/member/authentication/authentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlimg1: '',
    urlimg2: '',
    show1: false,
    show2: false,
    renzheng: '提交认证'
  },
  // 点击上传图片
  imgtap1(){
    var that = this
    wx.chooseImage({
      success: function(res) {
        // console.log(res.tempFilePaths)
        console.log(res)
        that.setData ({
          urlimg1: res.tempFilePaths,
          show1: true
        })
      },
    })
  },
  imgtap2() {
    var that = this
    wx.chooseImage({
      success: function (res) {
        // console.log(res.tempFilePaths)
        console.log(res)
        that.setData({
          urlimg2: res.tempFilePaths,
          show2: true
        })
      },
    })
  },

  // 点击关闭
  closetap1() {
    var that = this
    wx.showModal({
      title: '您确定取消图片上传吗',
      content: '您再考虑一下',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          that.setData({
            urlimg1: '',
            show1: false
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  // 点击提交认证
  renzhengtab(e){
    // wx.showLoading({
    //   title: '等待审核',
    // })
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)

    this.setData({
      renzheng: "审核中..."
    })
  },

  closetap2 (){
    var that = this
    wx.showModal({
      title: '您确定取消图片上传吗',
      content: '您再考虑一下',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          that.setData({
            urlimg2: '',
            show2: false
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },

  // 表单获取数据
  formtijiao(e){
    console.log(e)
    // console.log('获取表单数据')
    var shenfenzheng = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    var nameReg = /^[\u4E00-\u9FA5]{2,4}$/
    var name = e.detail.value.name
    var number = e.detail.value.number
    if (nameReg.test(name)){
      //认证身份证
      if (shenfenzheng.test(number)){
       
      }else {
        // 身份证错误
        wx.showModal({
          title: '身份证输入有误或为空',
          content: '请重新输入身份证号码',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }else {
      // 请输入合法姓名!
      wx.showModal({
        title: '输入的姓名不合法或为空',
        content: '请重新输入姓名',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
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