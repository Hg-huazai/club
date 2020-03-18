Page({
  data: {
    show1: true,
    show2: false,
    // text:"这是一个页面"
    activitylist: [],
    dd: '',
    hidden: false,
    page: 1,
    size: 20,
    hasMore: true,
    hasRefesh: false,
    showSwiper: false,
    typeid: -1,
    imgUrls: [
      {
        link: '/pages/activity/activity',
        url: '../../images/banner1.jpg'
      }
    ],
    functions: [
      {
        url: '../../images/logo7.png',
        name: '美食',
        id: '1'
      },
      {
        url: '../../images/logo8.png',
        name: '电影',
        id: '2'
      },
      {
        url: '../../images/logo3.png',
        name: '桌游',
        id: '3'
      },
      {
        url: '../../images/logo5.png',
        name: '聚会',
        id: '4'
      },
      {
        url: '../../images/logo1.png',
        name: '户外',
        id: '5'
      },
      {
        url: '../../images/logo4.png',
        name: 'DIY',
        id: '6'
      }, {
        url: '../../images/logo2.png',
        name: '运动',
        id: '7'
      }, {
        url: '../../images/logo6.png',
        name: '其他',
        id: '8'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},

    // 轮播图
    index: 0,
    selectData: ['广州'],
    Record: [],
    Contents: [],
    typeArray: ['享美食', '玩桌游', 'DIY', '趣运动', '去户外', '交友聚会', '其他', '全部'],
    imgs: ["../../images/xia3.jpg", "../../images/xia2.jpg", "../../images/xia1.jpg"],
    typeimgs: ["https://xbyqw.oss-cn-shenzhen.aliyuncs.com/lx_ms.jpg", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/lx_q.jpg", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/lx_yj.jpg"],
    colors: ['美食', '电影', '桌游', '聚会', 'DIY', '户外', '运动'],


    // ------------------------------------------------H点击城市
    show: true,
    icon: true,
    name: '广州',
    city: [
      { name: '广州', icon: 'chengshiguanli-zaiban', src: 'https://xbyqw-1257190969.cos.ap-guangzhou.myqcloud.com/city/city1_03.png', state: 1 },
      { name: '深圳', icon: 'chengshiguanli-hecha', src: 'https://xbyqw-1257190969.cos.ap-guangzhou.myqcloud.com/city/city1_05.png', state: 2 },
      { name: '杭州', icon: 'hangzhou_fense', src: 'https://xbyqw-1257190969.cos.ap-guangzhou.myqcloud.com/city/city1_07.png', state: 3 },
      { name: '长沙', icon: 'chengdu_fense', src: 'https://xbyqw-1257190969.cos.ap-guangzhou.myqcloud.com/city/city1_09.png', state: 4 },
      { name: '佛山', icon: 'chengshiicon-da', src: 'https://xbyqw-1257190969.cos.ap-guangzhou.myqcloud.com/city/city2_03.png', state: 5 },
      { name: '东莞', icon: 'zhihuichengshi', src: 'https://xbyqw-1257190969.cos.ap-guangzhou.myqcloud.com/city/city2_05.png', state: 6 },
      { name: '中山', icon: 'chengshi1', src: 'https://xbyqw-1257190969.cos.ap-guangzhou.myqcloud.com/city/city2_07.png', state: 7 },
      { name: '惠州', icon: 'guanlianchengshi', src: 'https://xbyqw-1257190969.cos.ap-guangzhou.myqcloud.com/city/city2_09.png', state: 8 },
    ],
  },

  // -----------------------------------------------点击切换城市
  citytap() {
    // console.log("city")
    this.setData({
      show: false,
      icon: false
    })
  },
  bgtap() {
    // console.log("bg")
    this.setData({
      show: true,
      icon: true
    })
  },
  closetap() {
    // console.log('点击关闭')
    this.setData({
      show: true,
      icon: true
    })
  },
  // 点击了所属的城市
  nametap(e) {
    // console.log('城市')
    // console.log(e)
    // console.log(e.currentTarget.dataset.state)
    var arr = this.data.city[e.currentTarget.dataset.state].name
    this.setData({
      show: true,
      icon: true,
      name: arr
    })
    // console.log(arr)
    wx.showToast({
      title: '您选择了' + arr,
      duration: 2000
    })
  },

  tabNav: function (e) {
    let url = e.currentTarget.dataset.url;
    let type = e.currentTarget.dataset.type;
    console.log('url:' + url + "type:" + type);
    if (type == 'url') {
      wx.navigateTo({
        url: url
      })
    } else if (type == 'tab') {
      wx.switchTab({
        url: url,
      })
    }

  },
  // -----------------------------------------------end点击切换城市

  //下拉框
  // 点击下拉显示框
  selectTap() {
    this.setData({
      hidden: !this.data.hidden
    })
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      hidden: !this.data.hidden
    });
  },
  // 跳转详情页
  DetailsNav(e) {
    let userStr = JSON.stringify(e.currentTarget.dataset.item);
    //订阅消息提醒
    wx.requestSubscribeMessage({
      tmplIds: ['v4l8JCQCTHjltTPLgsnIVrFpKAtRtQuonCzArOev3FI'],
      success(res) {
        console.log('已授权接收订阅消息' + res);
        wx.navigateTo({
          url: '/pages/details/details?userStr=' + userStr
        })
      }
    })

  },

  handleTapJoin(e) {
    console.log('handleTapJoin:');
    let userStr = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '/pages/join/join?userStr=' + userStr
    })
  },



  onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight + 50,
          windowWidth: res.windowWidth
        })
      }
    });
    // console.log('userInfo！' + getApp().globalData.userInfo)
    // if (getApp().globalData.userInfo) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000
    });
    wx.request({
      url: getApp().data.serviceUrl + '/yqw/api/activity/loadApprovedActivity',
      data: { appId: getApp().data.appId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          activitylist: res.data.list,
          swiperList: res.data.swiperList,
          hidden: true,
          hasMore: res.data.hasMore
        });
        wx.hideToast();

      }
    })
    // } else {
    //   //跳转到登录页面
    //   wx.navigateTo({
    //     url: '../login/login'
    //   })
    // }

  },

  onLoad: function () {
    var that = this;
    // console.log("onLoad");
    //订阅消息提醒
    wx.requestSubscribeMessage({
      tmplIds: ['v4l8JCQCTHjltTPLgsnIVrFpKAtRtQuonCzArOev3FI'],
      success(res) {
        console.log('已授权接收订阅消息' + res);
      }
    })
    wx.login({
      success: function (res) {
        // console.log("code:" + res.code);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: getApp().data.serviceUrl + '/yqw/api/activity/doLogin',
            data: {
              js_code: res.code,
              token: "yqw"
            },
            success: function (res) {
              console.log("openid:" + res.data.openid);
              // console.log("spSession:" + res.data.spSession);
              getApp().globalData.spSession = res.data.spSession;
              try {
                wx.setStorageSync('openid', res.data.openid);
                wx.setStorageSync('spSession', res.data.spSession);
              } catch (e) {
              }

            }
          })
        } else {
          // console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // console.log('userInfo！' + getApp().globalData.userInfo)
    // if (getApp().globalData.userInfo){
    wx.request({
      url: getApp().data.serviceUrl + '/yqw/api/activity/loadApprovedActivity',
      data: { appId: getApp().data.appId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          activitylist: res.data.list,
          hidden: true,
          hasMore: res.data.hasMore,
        });
        var RecordList = [];
        var ContentLIst = [];
        for (var i = 0; i < 5; i++) {
          RecordList.push(res.data.list[i].img);
        };
        ContentLIst.push(res.data.list);
        that.setData({
          Record: RecordList,
          Contents: ContentLIst
        });
        console.log(ContentLIst);
      }
    });
    // }else{
    //   //跳转到登录页面
    //   wx.navigateTo({
    //     url: '../login/login'
    //   })
    // }
    // console.log("load....");

  },
  //加载更多
  loadMore: function (e) {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    if (!this.data.hasMore) return
    var url = getApp().data.serviceUrl + '/yqw/api/activity/loadApprovedActivity?page=' + (++that.data.page);
    wx.request({
      url: url,
      data: { appId: getApp().data.appId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          activitylist: that.data.activitylist.concat(res.data.list),
          hasMore: res.data.hasMore,
          hidden: true,
          hasRefesh: false,
        });

      }
    })

  },
  //刷新处理
  refesh: function (e) {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var url = getApp().data.serviceUrl + '/yqw/api/activity/loadApprovedActivity?page=1&ps=10';
    wx.request({
      url: url,
      data: { appId: getApp().data.appId },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data);
        that.setData({
          activitylist: res.data.list,
          hasMore: res.data.hasMore,
          hidden: true,
          page: 1,
          hasRefesh: false,
        });

      }
    })
  },
  handleTapActivity: function (e) {
    var id = e.currentTarget.id;
    console.log(e.currentTarget.id);

    wx.navigateTo({
      url: '../details/details?activityId=' + id
    })

  },
  handleSearchActivity: function (e) {
    console.log("refesh....");
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000
    });
    var typeid = e.currentTarget.id;
    console.log("typeid...." + typeid);
    var that = this;
    that.setData({
      typeid: typeid,
      hasRefesh: true,
    });
    var url = getApp().data.serviceUrl + '/yqw/api/activity/loadApprovedActivity?page=1&ps=20';
    wx.request({
      url: url,
      data: {
        appId: getApp().data.appId,
        typeid: that.data.typeid,
        sortBy: that.data.sortBy
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          activitylist: res.data.list,
          hasMore: res.data.hasMore,
          hidden: true,
          page: 0,
          hasRefesh: false,
        });
        wx.hideToast();

      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    console.log('form发生了submit事件，携带formid为：', e.detail.formId)
    var formId = e.detail.formId;
    var that = this;
    wx.request({
      url: getApp().data.serviceUrl + '/yqw/api/activity/saveFormId',
      data: {

        appId: getApp().data.appId,
        openid: openid,
        formId: formId


      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);



      }
    })


  },
  onShareAppMessage: function () {
    return {
      title: '下班一起玩',
      desc: '',
      path: '/pages/activity/activity'
    }
  },
  bgtap() {
    // console.log("点击了图片背景")
    this.setData({
      show1: true
    })
  },
  imgtap() {
    // console.log("点击了图片")
    this.setData({
      show1: false
    })
  },
  guanbitap() {
    // console.log("点击了错号")
    this.setData({
      show2: true
    })
  }

});