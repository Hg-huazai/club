// component/h-news/h-news.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    info: [
      { name: '源子柔1', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
      { name: '源子柔2', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
      { name: '源子柔3', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
      { name: '源子柔4', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
      { name: '源子柔5', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
      { name: '源子柔6', content: '你好，我可以认识你吗', url: '/static/home/images/active_03.png' },
    ]
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemtap(e) {
      console.log(e)
      var id = e.currentTarget.dataset
      console.log(id)
      wx.navigateTo({
        url: '/pages/news/message/message?id=' + id,
      })
    },
  }
})
