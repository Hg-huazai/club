var app = getApp();
Component({
  properties: {
    imgUrls:{
      type:Object,
      value:[]
    }
  },
  data: {
    indicatorDots: false,
    circular: true,
    autoplay: false,
    interval: 3000,
    duration: 500,
    currents: "1",
    screenWidth: 0,
        screenHeight: 0,
  },
  attached:function(){
  },
  methods: {
    change: function (e) {
      this.setData({
        currents: e.detail.current + 1
      })
    },
    imageLoad: function (e) {
      var _this = this;
      var screenWidth;
      wx.getSystemInfo({
        success: function (res) {
          _this.setData({
            screenHeight: res.windowHeight,
            screenWidth: res.windowWidth,
          });
          var $width = e.detail.width,  //获取图片真实宽度
            $height = e.detail.height,
            ratio = $width / $height;  //图片的真实宽高比例
          console.log("height:" + $height + " $width:" + $width + " ratio:" + ratio + " screenWidth:" + _this.data.screenWidth);
          var viewWidth = _this.data.screenWidth,      //设置图片显示宽度，
            viewHeight = viewWidth / ratio;  //计算的高度值
          _this.setData({
            imgHeight: viewHeight
          })
        }
      });
      
    }
  },
  
})