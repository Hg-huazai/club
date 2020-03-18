var app = getApp();
Component({
  properties: {
    iShidden: {
      type: Boolean,
      value: true,
    },
    //是否自动登录
    isAuto: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    cloneIner: null,
    url: app.globalData.url,
    loading: false,
  },
  pageLifetimes: {
    hide: function () {
      //关闭页面时销毁定时器
      if (this.data.cloneIner) clearInterval(this.data.cloneIner);
    },
    show: function () {
      //打开页面销毁定时器
      if (this.data.cloneIner) clearInterval(this.data.cloneIner);
    },
  },
  detached() {
    if (this.data.cloneIner) clearInterval(this.data.cloneIner);
  },
  attached() {
    //this.get_logo_url();
    this.setAuthStatus();
  },
  methods: {

    //监听登录状态
    WatchIsLogin: function () {
      this.data.cloneIner = setInterval(function () {
        //防止死循环,超过错误次数终止监听
        if (this.getErrorCount()) return clearInterval(this.data.cloneIner);
        if (app.globalData.token == '' && this.data.loading === false) this.setAuthStatus();
      }.bind(this), 800);
      this.setData({ cloneIner: this.data.cloneIner });
    },
    //检测登录状态并执行自动登录
    setAuthStatus() {
      var that = this;
      that.setErrorCount();
      wx.getSetting({
        success(res) {

          //自动登录
          that.setData({ iShidden: true });
          wx.showLoading({ title: '正在登录中' });
          that.getUserInfoBydecryptCode();

        }
      })
    },
    //访问服务器获得cache_key
    setCode(code, successFn, errotFn) {
      var that = this;
      that.setData({ loading: true });
      wx.request({
        url: getApp().globalData.url + '/yqw/auth_api/doLogin',
        data: {
          js_code: code,
          appId: app.data.appId
        },
        success: function (res) {
          console.log("openid:" + res.data.openid);
          console.log("spSession:" + res.data.spSession);
          that.setData({ loading: false });
          try {
            wx.setStorageSync('openid', res.data.openid);
            wx.setStorageSync('spSession', res.data.spSession);
          } catch (e) {
            console.log("setStorageSync fail");
          }
          successFn && successFn(res);
        }
      })
    },
    //获取code
    getSessionKey(code, successFn, errotFn) {
      console.log("getSessionKey code:" + code);
      var that = this;
      wx.checkSession({
        success: function (res) {
          wx.getStorage({
            key: 'openid',
            success: function (res) {
              if (res.data) {
                successFn && successFn();
              } else {
                that.setCode(code, successFn, errotFn);
              }
            },
            fail(res) {
              that.setCode(code, successFn, errotFn);
            },
          });
        },
        fail: function () {
          that.setCode(code, successFn, errotFn);
        }
      });
    },
    login: function () {
      //app.Tips({ title: 'login...' });
      var that = this;
      wx.login({
        success: function (res) {
          if (!res.code) return app.Tips({ title: '登录失败！' + res.errMsg });
          console.log("登录成功，获取code:" + res.code);

          //获取cache_key并缓存
          that.getSessionKey(res.code, function () {
            console.log("获取code成功");
            that.getUserInfoBydecryptCode();
          });
        },
        fail() {
          wx.hideLoading();
        }
      })
    },
    //授权
    setUserInfo(e) {
      wx.showLoading({ title: '正在授权中' });
      this.triggerEvent('onLoadFun', {});
      var that = this;
      console.log(e.detail.userInfo)
      getApp().globalData.userInfo = e.detail.userInfo;
      console.log('encryptedData:' + e.detail.encryptedData);
      console.log('iv:' + e.detail.iv);

      wx.getStorage({
        key: 'spSession',
        success: function (res) {
          if (res.data) {
            var spSession = res.data;
            console.log('spSession:' + spSession);
            //更新用户信息到服务器
            wx.request({
              url: getApp().globalData.url + '/yqw/auth_api/getUserInfo',
              data: {
                spSession: spSession,
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv
              },
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              success: function (res) {
                console.log("code:" + res.data.code);
                if (res.data.code == '1') {
                  that.setData({
                    iShidden: true
                  })
                  wx.showToast({
                    title: "授权成功",
                    icon: "none",
                    duration: 2e3
                  })
                }



              }
            })
          }
        },
        fail: function () {
          console.log("get spSession fail");
          //if (that.data.isAuto) that.login();
        }
      })

    },
    close: function () {
      if (this.data.isAuto) return;
      this.setData({ iShidden: true });
    },
    //登录获取访问权限
    getUserInfoBydecryptCode: function () {
      //app.Tips({ title: '自动登录中....！' });
      console.log("自动登录中2....！");
      var that = this;
      if (this.getErrorCount()) {
        this.setData({ iShidden: false, ErrorCount: 0 });
        return app.Tips({ title: '获取code失败,请重新授权尝试获取！' });
      }
      wx.getStorage({
        key: 'openid',
        success: function (res) {
          if (res.data) {
            wx.hideLoading();
            var openid = res.data;
            //判断openid是否有用户数据
            wx.request({
              url: getApp().globalData.url + '/yqw/auth_api/loadUser',
              data: {
                openid: openid,
                appid: getApp().data.appId
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res.data);
                if (res.data.hasUser == '0') {
                  that.setData({ iShidden: false });
                }

              }
            })
          } else {
            //没有openid,自动登录
            wx.hideLoading();
            wx.clearStorage();
            that.setErrorCount();

            if (that.data.isAuto) that.login();
            return false;
          }
        },
        fail: function () {
          wx.hideLoading();
          wx.clearStorage();
          that.setErrorCount();
          console.log("openid is null,login...");
          if (that.data.isAuto) that.login();
        }
      })
    },
    /**
     * 处理错误次数,防止死循环
     * 
    */
    setErrorCount: function () {
      if (!this.data.ErrorCount) this.data.ErrorCount = 1;
      else this.data.ErrorCount++;
      this.setData({ ErrorCount: this.data.ErrorCount });
    },
    /**
     * 获取错误次数,是否终止监听
     * 
    */
    getErrorCount: function () {
      return this.data.ErrorCount >= 10 ? true : false;
    }
  },
})