// component/h-member/h-member.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  }
})
