// component/h-vip/h-vip.js
var util = require('../../utils/util_7.js');
var app = getApp();
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
    curren1: 0,
    curren2: 0,
    show1: true,
    set1: '男',
    add: '广州',
    ageSmall: 18,
    ageMax: 26,
    set2: [
      { name: "男", state: 1 },
      { name: "女", state: 2 },
    ],
    city: [
      { name: "北京", state: 1 },
      { name: "上海", state: 2 },
      { name: "广州", state: 3 },
      { name: "深圳", state: 4 },
      { name: "杭州", state: 5 },
      { name: "成都", state: 6 },
      { name: "南京", state: 7 },
      { name: "天津", state: 8 },
      { name: "武汉", state: 9 },
      { name: "其他内地", state: 10 },
      { name: "港澳台", state: 11 },
      { name: "海外", state: 12 },
    ],
    starArray: ['不选', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座'],
    eduArray: ['大专', '本科', '硕士', '博士'],
    feeArray: ['不选', '5万以下', '5~10万', '10~20万', '20~30万', '30~50万', '50万以上'],
    page: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    settap(e) {
      // console.log("点击了性别")
      console.log(e)
      // var set1 = this.data.set2[e.currentTarget.dataset.state].name
      var set1 = this.data.set2[e.currentTarget.dataset.curren].name
      this.setData({
        curren1: e.target.dataset.curren,
        set1
      })
      // console.log(e.currentTarget.dataset.curren)
      // console.log(set1)
    },
    citytap(e) {
      // console.log(e)
      // console.log("点击了城市");
      // var arr = this.data.city[e.currentTarget.dataset.state].name
      var arr = this.data.city[e.currentTarget.dataset.curren1].name
      this.setData({
        add: arr,
        curren2: e.currentTarget.dataset.curren1
      })
      // console.log(e.currentTarget.dataset.state);
    },
    // 点击了筛选
    saixuantap() {
      // console.log("点击了筛选")
      this.setData({
        show1: !this.data.show1
      })
    },
    // 点击背景关闭筛选
    bgtap() {
      this.setData({
        show1: true
      })
    },
    // 触发最小年龄
    ageSmall(e) {
      // console.log(e);
      // console.log(e.detail.value); 
      var ageSmall = e.detail.value;
      this.setData({
        ageSmall: ageSmall
      })
      // console.log(ageSmall); 
    },
    // 触发最大年龄
    ageMax(e) {
      // console.log(e);
      // console.log(e.detail.value); 
      var ageMax = e.detail.value;
      this.setData({
        ageMax
      })
    },

    loadUsers: function () {
      var that = this;
      var url = util.U({ c: 'yqw/meet/user', a: 'loadAllUserByPage' },
        app.globalData.url);
      var queryData = { page: that.data.page, appid: app.data.appId };
      util.basePost(url, queryData, function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.list,
          hasMore: res.data.hasMore
        })
      });
    },

    //加载更多
    loadMore: function (e) {
      var that = this;
      that.setData({
        hasRefesh: true,
      });
      if (!this.data.hasMore) return

      var url = util.U({ c: 'yqw/meet/user', a: 'loadAllUserByPage' },
        app.globalData.url);
      var queryData = { page: ++that.data.page, appid: app.data.appId };
      util.basePost(url, queryData, function (res) {
        console.log(res.data)
        that.setData({
          list: that.data.list.concat(res.data.list),
          hasMore: res.data.hasMore
        })
      });

    },

    touserdetail: function (e) {
      var openid = e.currentTarget.dataset.openid;
      wx.navigateTo({
        url: '/pages/vip/info/info?openid=' + openid
      })
    },
    
  },

  // 声明周期
  lifetimes:{
    attached: function (options) {
      // console.log('33')
      this.loadUsers();
      console.log(options)
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            windowHeight: res.windowHeight + 50,
            windowWidth: res.windowWidth
          })
        }
      })
    },
  },
  
})

