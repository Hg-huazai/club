//app.js
const URL = 'https://yqw.namicity.cn';
//const URL = 'http://localhost';

const util = require('utils/util_7.js');
App({
  data: {
    serviceUrl: URL,
    //serviceUrl: "http://localhost",
    latitude: "",
    longitude: "",
    appId: 'wx4e8ef14263d01359',
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    var app = this;
    wx.setStorageSync('logs', logs)

    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        getApp().data.latitude = res.latitude;
        getApp().data.longitude = res.longitude;
        // console.log("latitude:" + res.latitude + " longitude:" + res.longitude);
      }
    })

  },
  getUserInfo: function (cb) {
    var that = this
    var spSession = that.globalData.spSession;
    // console.log('spSession:' + spSession);
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      //跳转到登录页面
      //判断数据库是否有数据
      var openid = wx.getStorageSync('openid');
      // console.log('getUserInfo openid:' + openid);
      wx.request({
        url: getApp().data.serviceUrl + '/yqw/api/activity/checkUserInfo',
        data: {
          appid: getApp().data.appId,
          openid: openid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data);
          if (res.data.code == '0') {
            wx.navigateTo({
              url: '../login/login'
            })
          }

        }
      })

    }
  },
  globalData: {
    userInfo: null,
    spSession: null,
    activityId: null,
    navHeight: 0,
    routineStyle: '#ffffff',
    openPages: '',
    spid: 0,
    code: 0,
    urlImages: '',
    url: URL,
    token: '',
    isLog: false,
    MyMenus: [],
    header: {
      'content-type': 'application/json',
      'token': ''
    },
    tmplIds: ["v4l8JCQCTHjltTPLgsnIVrFpKAtRtQuonCzArOev3FI", "fk6Hf0NGCO2pFAW0ycGZMtAPM4jYCflet5z5jtbnh8U"]
  },
  /**
   * 
   * 获取个人中心图标
  */
  getMyMenus: function () {
    var that = this;
    if (that.globalData.MyMenus.legnth) return;
    that.baseGet(that.U({ c: 'public_api', a: 'get_my_naviga' }, that.globalData.url), function (res) {
      that.globalData.MyMenus = res.data.routine_my_menus;
    });
  },
  /*
  * POST 访问快捷方法
  * @param string | object url 访问地址
  * @param callable successCallback 成功执行函数
  * @param callable errorCallback 失败执行函数
  * @param object header 访问header头
  */
  basePost: function (url, data, successCallback, errorCallback, header) {
    if (header == undefined) header = this.globalData.header;
    header['token'] = this.globalData.token;
    util.basePost(url, data, successCallback, errorCallback, header);
  },
  /*
  * GET 访问快捷方法
  * @param string | object url 访问地址
  * @param callable successCallback 成功执行函数
  * @param callable errorCallback 失败执行函数
  * @param isMsg 错误信息提醒 默认提醒
  * @param object header 访问header头
  */
  baseGet: function (url, successCallback, errorCallback, isMsg, header) {
    if (header == undefined) header = this.globalData.header;
    header['token'] = this.globalData.token;
    util.baseGet(url, successCallback, errorCallback, isMsg, header);
  },
  /*
  * 信息提示 + 跳转
  * @param object opt {title:'提示语',icon:''} | url
  * @param object to_url 跳转url 有5种跳转方式 {tab:1-5,url:跳转地址}
  */
  Tips: function (opt, to_url) {
    return util.Tips(opt, to_url);
  },
  /*
  * 访问Url拼接
  * @param object opt {c:'控制器',a:'方法',q:{get参数},p:{parma参数}}
  * @param url 接口访问地址
  * @return string
  */
  U: function (opt, url) {
    return util.U(opt, url);
  },
  /**
   * 快捷调取助手函数
  */
  help: function () {
    return util.$h;
  },
  /*
  * 合并数组
  * @param array list 请求返回数据
  * @param array sp 原始数组
  * @return array
  */
  SplitArray: function (list, sp) { return util.SplitArray(list, sp) },
  /** 
  * 点击tab切换 
  */
  swichNav: function (e) {

    var that = this;
    //  console.log(e);
    if (thisdatacurrentTab === etargetdatasetcurrent) {
      return false;
    } else {
      thatsetData({
        currentTab: etargetdatasetcurrent
      })
    }
  }
})