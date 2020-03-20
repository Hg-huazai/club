// pages/member/useredit/useredit.js
var util = require('../../../utils/util_7.js');
var app = getApp();
Page({
  data: {
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    starArray: ['不选', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座'],
    startIndex: 0,
    eduArray: ['大专', '本科', '硕士', '博士'],
    workArray: ['不选', '在校学生', '计算机/互联网/IT', '电子/通信', '销售/市场/公关/商务', '人力资源/行政/后勤', '财务/会计', '餐饮/旅游', '金融/证券/投资/保险', '公务员', '私营业主', '自由职业者', '其他'],
    workIndex: 0,
    feeArray: ['不选', '5万以下', '5~10万', '10~20万', '20~30万', '30~50万', '50万以上'],
    feeIndex: 0,
    marryArray: ['未婚', '离异无小孩', '离异有小孩', '丧偶', '已婚'],
    sexArray: ['男', '女'],
    sexIndex: 0,
    marryIndex: 0,
    index: 0,
    eduIndex: 0,
    hasLocation: false,
    locationAddress: "",
    addressName: '选择地点',
    imageList: [],
    count: 8,
    title: '',
    nums: 10,
    priceDesc: '',
    phone: '',
    detail: '',
    longitude: '',
    latitude: '',
    imagePath: '',
    erimage: '',
    minPeoples: 5,
    showCon: false,
    multiIndex: [0, 0, 0],
    date: '1970-01-01',
    region: ['广东省', '广州市', '天河区'],
    customItem: '全部',
    keyword1: '性格',
    keyword2: '兴趣爱好',
    keyword3: '喜欢的异性类型',
    keyword4: '音乐',
    keyword5: '电影',
    likes: '请选择兴趣爱好'
  },
  //编辑
  bindKeyword: function (e) {
    console.log('picker发送选择改变，携带值为', e.currentTarget.dataset.type)
    wx.navigateTo({
      url: '../keyword/keyword?type=' + e.currentTarget.dataset.type
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindWorkChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      workIndex: e.detail.value
    })
  },
  bindSexChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindFeeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      feeIndex: e.detail.value
    })
  },
  bindMarryChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      marryIndex: e.detail.value
    })
  },
  bindStarChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startIndex: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindEduChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      eduIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //编辑
  bindKeyword: function (e) {
    console.log('picker发送选择改变，携带值为', e.currentTarget.dataset.type)
    wx.navigateTo({
      url: '../useredit/keyword?type=' + e.currentTarget.dataset.type
    })
  },
  uploadImgs: function () {
    var that = this;
    var url = util.U({ c: 'yqw/simplewxupload', a: 'upload' }, app.globalData.url);
    //console.log("url:"+url);
    util.uploadImageOne(url, function (res) {
      console.log(res)
      var imgs = that.data.imageList;
      imgs.push(res.data);
      that.setData({
        imageList: imgs
      })
    });
  },
  deleteImage: function (e) {
    var that = this;
    var images = that.data.imageList;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    console.log("index:" + index);
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          imageList: images
        });
      }
    })
  },
  onShow: function (e) {
    var that = this;
    wx.getStorage({
      key: 'keywords',
      success: function (res) {
        if (res.data) {
          that.setData({
            likes: res.data
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        if (res.data) {
          var openid = res.data;
          var url = util.U({ c: 'yqw/meet/user', a: 'loadUser' },
            app.globalData.url);
          util.basePost(url, { openid: openid, appid: app.data.appId }, function (res) {
            console.log(res)
            that.setData({
              user: res.data.user,
              fuser: res.data.fuser,
              date: res.data.user.birthday,
              eduIndex: res.data.user.edu,
              workIndex: res.data.user.work,
              feeIndex: res.data.user.money,
              marryIndex: res.data.user.marry,
              startIndex: res.data.user.star,
              likes: res.data.user.likes,
              sexIndex: res.data.fuser.sex - 1

            })
            var imgs = that.data.imageList;
            var photos = res.data.photos;
            for (var j = 0; j < photos.length; j++) {
              imgs.push(photos[j].imgPath);
            }
            that.setData({
              imageList: imgs
            })
          });
        }
      }
    })
  },
  //提交表单
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formId = e.detail.formId;
    if (that.data.imageList.length == 0) {
      wx.showModal({
        content: '请上传照片',
        showCancel: false
      });
      return false;
    }
    if (e.detail.value.name == '') {
      wx.showModal({
        content: '请输入真实姓名',
        showCancel: false
      });
      return false;
    }
    if (e.detail.value.webchat == '') {
      wx.showModal({
        content: '请输入微信号',
        showCancel: false
      });
      return false;
    }
    if (e.detail.value.high == '') {
      wx.showModal({
        content: '请输入身高',
        showCancel: false
      });
      return false;
    }
    if (e.detail.value.intro == '') {
      wx.showModal({
        content: '请输入个人独白',
        showCancel: false
      });
      return false;
    }
    if (e.detail.value.standard == '') {
      wx.showModal({
        content: '请输入择偶标准',
        showCancel: false
      });
      return false;
    }

    wx.getStorage({
      key: 'openid',
      success: function (res) {
        if (res.data) {
          var openid = res.data;
          var id = '';
          if (that.data.user) {
            id = that.data.user.id
          }
          var formData = {
            id: id,
            openid: openid,
            appid: getApp().data.appId,
            imgPaths: that.data.imageList.join(","),
            nickname: e.detail.value.nickname,
            name: e.detail.value.name,
            webchat: e.detail.value.webchat,
            birthday: that.data.date,
            high: e.detail.value.high,
            edu: that.data.eduIndex,
            school: e.detail.value.school,
            work: that.data.workIndex,
            money: that.data.feeIndex,
            marry: that.data.marryIndex,
            star: that.data.startIndex,
            likes: that.data.likes,
            intro: e.detail.value.intro,
            standard: e.detail.value.standard,
            sex: that.data.sexIndex,
            province: that.data.region[0],
            city: that.data.region[1],
            area: that.data.region[2]
          }
          console.log(formData);
          var url = util.U({ c: '/yqw/meet/user', a: 'updateUser' },
            app.globalData.url);
          //console.log("url:"+url);

          util.basePost(url, formData, function (res) {
            console.log(res)
            wx.showModal({
              content: '提交成功!',
              showCancel: false,
              duration: 2000,//显示时长
            });
            wx.navigateBack({

            });
          });

        }
      }
    });





  },
})