// component/H-tabbar/H-tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type:Boolean,
      value: true,
    },
    tabcurren: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabbar1: [
      { name: '活动', icon: 'icon-huodong', url: '/pages/home/index/index?tabbar=0' },
      { name: '消息', icon: 'icon-xiaoxi6', url: '/pages/news/index/index?tabbar=1' },
      { name: '我的', icon: 'icon-wodedangxuan', url: '/pages/member/index/index?tabbar=2' },
    ],
    tabbar2: [
      { name: '活动', icon: 'icon-huodong', url: '/pages/home/index/index?tabbar=0' },
      { name: '嘉宾', icon: 'icon-jiabin', url: '/pages/vip/index/index?tabbar=1' },
      { name: '消息', icon: 'icon-xiaoxi6', url: '/pages/news/index/index?tabbar=2' },
      { name: '我的', icon: 'icon-wodedangxuan', url: '/pages/member/index/index?tabbar=3' },
    ],
    tabbar: true,
    tabcurren: 0,
  },
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabbar(e) {
      // console.log(e)
      this.setData({
        tabcurren: e.currentTarget.dataset.curren
      })
    },
  }
})
