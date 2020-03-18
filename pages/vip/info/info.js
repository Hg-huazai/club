var util = require('../../../utils/util_7.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like: false,
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    starArray: ['不选', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座'],
    eduArray: ['大专', '本科', '硕士', '博士'],
    workArray: ['不选', '在校学生', '计算机/互联网/IT', '电子/通信', '销售/市场/公关/商务', '人力资源/行政/后勤', '财务/会计', '餐饮/旅游', '金融/证券/投资/保险', '公务员', '私营业主', '自由职业者', '其他'],
    feeArray: ['不选', '5万以下', '5~10万', '10~20万', '20~30万', '30~50万', '50万以上'],
    marryArray: ['未婚', '离异无小孩', '离异有小孩', '丧偶', '已婚'],
    photos1:[]
  },

  // 点击收藏
  liketap(){
    // console.log("收藏");
    var that=this;
    if (that.data.like) {
      //取消选择
      var url = util.U({ c: 'yqw/meet/user', a: 'delLike' },
        app.globalData.url);
      util.basePost(url, { openid: that.data.ownopenid, likeOpenid: that.data.openid }, function (res) {
        console.log(res)
          that.setData({
            like: !that.data.like
          })
          wx.showToast({
            title: '取消选择成功!',
            icon: 'success',
            duration: 2000
          })

      });
    }else{
      //选择
      var url = util.U({ c: 'yqw/meet/user', a: 'addLike' },
        app.globalData.url);
      util.basePost(url, { openid: that.data.ownopenid, likeOpenid: that.data.openid }, function (res) {
        console.log(res)
        if (res.data.errorcode == '0') {
          that.setData({
            like: !that.data.like
          })
          wx.showToast({
            title: '选择成功',
            icon: 'success',
            duration: 2000
          })

        } else {
          wx.showToast({
            title: '您已经选择超过10个嘉宾!',
            icon: 'error',
            duration: 2000
          })
        }
      });
    }
    

    
  },

  editUser:function(){
    wx.navigateTo({
      url: '/pages/useredit/useredit',
    })
  },

  // 预览图片
  // previewMoreImage(e){
  //   var that = this;
  //   console.log(e)
  //   var src = e.currentTarget.dataset.src;//获取data-src
  //   var imgList = that.data.photos1;//获取data-list
  //   console.log(imgList)
  //   wx.previewImage({
  //     current: src,
  //     urls: imgList
  //   })
  // },
  // 预览单个图片
  previewMoreImage(e) {
    let src = e.currentTarget.dataset.src;
    let urlarr = [];
    urlarr.push(src)
    wx.previewImage({
      current: src,
      urls: urlarr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var openid=options.openid;
    var ownopenid;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data);
        if (res.data) {
          ownopenid=res.data;
          that.setData({
            ownopenid: ownopenid,
            openid:openid
          })
        }
      }
    })
    var url = util.U({ c: 'yqw/meet/user', a: 'loadUser' },
      app.globalData.url);
    util.basePost(url, { openid: openid, appid: app.data.appId }, function (res) {
      console.log(res)
      console.log(res.data.photos.imgPath)
      that.setData({
        photos: res.data.photos,
        photos1: res.data.photos.imgPath,
        user: res.data.user,
        fuser: res.data.fuser
      })
    });
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
    var that=this;
    var sharetitle=that.data.fuser.nickname+" "+that.data.user.city+" "+that.data.user.age+"岁";
    return {
      title: sharetitle,
      desc: '',
      path: '/pages/member-info/info/info?openid=' + that.data.user.openid
    }
  },
})