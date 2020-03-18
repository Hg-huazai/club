// pages/details/details.js
//获取应用实例
var app = getApp();
var activityId;
//var spSession = wx.getStorageSync('spSession');
var spSession = app.globalData.spSession;
var title;
var userInfoObj;
var openid = wx.getStorageSync('openid');
var WxParse = require('../../../wxParse/wxParse.js');
var groupErcodeImg = "";

// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var startTop = 380;
var startLeft = 30;
var gapSize = 43;
var common = {
  left: `${startLeft}rpx`



};
var templateWidth = 414;
var templateHeight = 736;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    typeArray: ['美食', '电影', '桌游', '聚会', 'DIY', '户外', '运动', '音乐'],
    name: '',
    phone: '',
    longitude: 0,
    latitude: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [],
    hiddenmodalput: true,
    comment: '',
    myrich: "",
    mHidden: true,
    tempFilePaths: '',
    motto: '分享',
    userInfo: {},
    hasUserInfo: false,
    minPeoples: 0,
    typeid: 0,
    canIUse: wx.canIUse('bottom.open-type.getUserInfo'),
    typeimgs: ["https://xbyqw.oss-cn-shenzhen.aliyuncs.com/lx_ms.jpg", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/xia1.jpg?x-oss-process=style/wenzhang720", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/lx_q.jpg", "https://xbyqw.oss-cn-shenzhen.aliyuncs.com/lx_yj.jpg"],
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
    hidden: true,
    placeholder: "请输入留言...",
    commentid: "",
    isPay: 0,
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
    imageDialog: false,
    hideShareInfo: true,
    shareMoney: 0,
    // 点击二维码
    show: true,
    fromOpenid: '',
    title: '活动标题',
    fromOpenid: 'xbyqw'
  },
  bgtap() {
    // console.log("点击了图片背景")
    this.setData({
      show: true
    })
  },
  imgtap() {
    // console.log("点击了图片")
    this.setData({
      show: false
    })
  },
  product: {
    "item_code": "00003563372839_00000010154601",
    "title": "product_name",
    "desc": "product_description",
    "category_list": [
      "服装",
      "上衣",
      "短袖衬衫"
    ],
    "image_list": [
      "https://res.wx.qq.com/mpres/htmledition/images/xxxx.jpeg"
    ],
    "src_mini_program_path": "/detail?item_code=00003563372839_00000010154601",
    "sku_list": [
      {
        "sku_id": "SKU_ID",
        "price": 12345,
        "original_price": 67890,
        "status": 1,
        "poi_list": [
          {
            "longitude": 116.32676,
            "latitude": 40.003305,
            "radius": 5,
            "business_name": "XXX",
            "branch_name": "珠江新城店",
            "address": "新港中路123号"
          },
          {
            "longitude": 117.32676,
            "latitude": 41.003305,
            "radius": 5,
            "business_name": "CCC",
            "branch_name": "客村店",
            "address": "新港中路123号"
          }
        ],
        "sku_attr_list": [
          {
            "name": "颜色",
            "value": "白色"
          },
          {
            "name": "尺码",
            "value": "XXL"
          }
        ]
      }
    ],
    "brand_info": {
      "name": "品牌名、小程序名",
      "logo": "http://xxxxx"
    }
  },
  LYRight(e) {
    console.log('266262')
    var commentid = e.currentTarget.dataset.commentid;
    var re = e.currentTarget.dataset.re;
    this.setData({
      placeholder: "回复:" + re,
      commentid: commentid
    });
  },



  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.show = true;
    console.log(e);
  },

  showShareIg() {
    var that = this;
    that.setData({
      imageDialog: true
    })
  },

  hideShareModal() {
    var that = this;
    that.setData({
      imageDialog: false
    })
  },

  saveImage() {

    wx.saveImageToPhotosAlbum({
      filePath: this.imagePath,
    });
  },

  // 客服联系
  KeFu() {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },

  // 跳转首页
  lonBtn: function () {
    wx.switchTab({
      url: '/pages/activity/activity',
    })
  },
  gotoselect: function () {
    wx.navigateTo({
      url: '/pages/vip/vip/vip?activityId=' + activityId,
    })
  },
  // 跳转花名册
  Textroster: function () {
    wx.navigateTo({
      url: '/pages/roster/roster?activityId=' + activityId,
    })
  },
  toChat: function (e) {
    wx.navigateTo({
      url: '/pages/chat/chat?activityId=' + activityId,
    })
  },
  toSetting: function (e) {
    wx.navigateTo({
      url: '/pages/setting/setting?activityId=' + activityId,
    })
  },
  toBuy: function (e) {
    wx.navigateTo({
      url: '/pages/order_confirm/index?activityId=' + activityId,
    })
  },
  //进群
  showAction: function (e) {
    //this.setData({ hidden: false });
    if (groupErcodeImg != '') {
      wx.previewImage({
        current: groupErcodeImg, // 当前显示图片的http链接
        urls: [groupErcodeImg] // 需要预览的图片http链接列表
      })
    } else {
      wx.showModal({
        content: '该活动暂未配置群二维码,请先联系发起人',
        showCancel: false
      });
    }

    /*
    wx.navigateTo({
      url: '/pages/ercode/ercode?imgPath=' + groupErcodeImg,
    })
    */

  },
  confirm: function () {
    this.setData({
      hidden: true
    });
    console.log("clicked confirm");
  },

  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    that.setData({
      hideModal: true
    })

  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },

  // 分享
  Share() {
    this.setData({
      modalName: "bottomModal"
    })
    /*
    wx.navigateTo({
      url: '/pages/share/share?activityId=' + activityId + '&typeid=' + this.data.typeid,
    })*/
  },
  // 现场
  xianChang() {
    console.log('3365')
    wx.navigateTo({
      url: '/pages/Release/Release?activityId=' + activityId,
    })
    /*
    wx.switchTab({
      url: "/pages/scene/scene?activityId=" + activityId
   })
   */
  },

  signin() {
    wx.navigateTo({
      url: '/pages/signin/signin?activityId=' + activityId,
    })
  },
  // 关注
  Follow() {
    var that = this;
    wx.navigateTo({
      url: "/pages/follow/follow?fromOpenid=" + that.data.fromOpenid
    })
  },

  /**
     * 监听手机号输入
     */
  listenerPhoneInput: function (e) {
    this.data.phone = e.detail.value;
    //console.log(e.detail.value);
  },
  listenerNameInput: function (e) {
    this.data.name = e.detail.value;
    //console.log(e.detail.value);
  },
  formSubmit1: function (e) {
    var that = this;
    //订阅消息提醒
    wx.requestSubscribeMessage({
      tmplIds: getApp().globalData.tmplIds,
      success(res) {
        console.log('已授权接收订阅消息' + res);
        wx.navigateTo({
          url: '/pages/order_confirm/index?activityId=' + activityId,
        })
      }
    })

  },

  //事件处理函数 取消活动
  handleTapCanel: function () {
    wx.showModal({
      title: '确认',
      content: '您确定取消此活动吗?',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          wx.request({
            url: getApp().data.serviceUrl + '/yqw/api/activity/doCancel?id=' + activityId,
            data: {
              appid: getApp().data.appId,
              openid: openid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //console.log(res.data);
              //console.log(activityId);
              wx.redirectTo({
                url: '/pages/details/details?activityId=' + activityId
              })
            }
          })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' });


    var that = this;
    var fromOpenid = options.fromOpenid;
    console.log("fromOpenid:" + fromOpenid);
    wx.setStorageSync('fromOpenid', fromOpenid);//存入缓存
    activityId = options.activityId;
    getApp().globalData.activityId = activityId;
    console.log("spSession:" + spSession);



    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log("openid:" + res.data);
        openid = res.data;

        wx.request({
          url: getApp().data.serviceUrl + '/yqw/api/activity/loadActivity?activityId=' + options.activityId + '&openid=' + openid + '&fromOpenid=' + fromOpenid, //仅为示例，并非真实的接口地址
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //console.log(res.data);
            // console.log(res.data.list);
            title = res.data.activity.title;
            that.setData({ activity: res.data.activity });
            that.setData({ img: res.data.activity.img });
            that.setData({ content: res.data.activity.content });
            that.setData({ list: res.data.list });
            that.setData({ usercount: res.data.usercount });
            that.setData({ count: res.data.count });
            that.setData({ longitude: res.data.activity.longitude });
            that.setData({ latitude: res.data.activity.latitude });
            that.setData({ canJoin: res.data.canJoin });
            that.setData({ imgUrls: res.data.imgList });
            that.setData({ imgSize: res.data.imgSize });
            that.setData({ phone: res.data.activity.phone });
            that.setData({ fromOpenid: res.data.activity.openid });
            that.setData({ openid: openid });
            that.setData({ maxNum: res.data.activity.maxNum });
            that.setData({ isSex: res.data.activity.isSex });
            that.setData({ men: res.data.activity.men });
            that.setData({ women: res.data.activity.women });

            that.setData({ menPeoples: res.data.activity.menPeoples });
            that.setData({ womenPeoples: res.data.activity.womenPeoples });
            //that.setData({ minPeoples: res.data.activity.minPeoples });
            that.setData({ typename: that.data.typeArray[res.data.activity.typeid] });
            that.setData({ typeid: res.data.activity.typeid });
            that.setData({ hasCreateCount: res.data.hasCreateCount });
            that.setData({ timelines: res.data.timelines });
            that.setData({ favs: res.data.favs });

            that.setData({ isPay: res.data.activity.isPay });
            groupErcodeImg = res.data.activity.groupErCode;
            that.setData({ shareMoney: res.data.sharePriceStr });
            if (res.data.activity.openid == 'xbyqw') {
              that.setData({ hideShareInfo: false });
            }

            if (res.data.imgSize == 0) {
              var typeimgsarray = new Array();
              var obj = { "imgPath": that.data.typeimgs[res.data.activity.typeid] };
              typeimgsarray.push(obj);
              that.setData({ imgUrls: typeimgsarray });
              that.setData({ imgSize: 1 });
              //console.log(that.data.imgUrls);
            }
            console.log("member_count:" + res.data.size);
            //定义动态消息
            /*
            wx.updateShareMenu({
              withShareTicket: true,
              isUpdatableMessage: true,
              activityId: res.data.activity.wxActivityId, // 活动 ID
              templateInfo: {
                parameterList: [{
                  name: 'member_count',
                  value: '' + res.data.size
                }, {
                  name: 'room_limit',
                  value: '' + res.data.activity.maxNum
                }]
              }
            })
            */
            //替换标签中特殊字符  

            var article = res.data.activity.content;
            WxParse.wxParse('article', 'html', article, that, 5);

            //生成图片
            var title2 = res.data.activity.title;
            title2 = title2.substr(0, 18);
            var startTime = res.data.activity.startTime;
            var address = res.data.activity.addressName;
            address = address.substr(0, 18);
            var template = {
              width: '654rpx',
              height: '1000rpx',
              background: '#fff',
              views: [

                {
                  type: 'image',
                  url: 'https://xbyqw.oss-cn-shenzhen.aliyuncs.com/share7.jpg',
                  css: {
                    width: '654rpx',
                    height: '1000rpx',
                    mode: 'scaleToFill',
                  },
                },
                {
                  type: 'image',
                  url: res.data.activity.img,
                  css: {
                    width: '530rpx',
                    height: '320rpx',
                    mode: 'scaleToFill',
                    top: `90rpx`,
                    left: '60rpx'
                  },
                },
                {
                  type: 'text',
                  text: title2,
                  css: [{
                    top: `${startTop + 1 * gapSize}rpx`,
                    align: 'left',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }, common, { left: '80rpx' }],
                },
                {
                  type: 'text',
                  text: '活动时间：' + startTime,
                  css: [{
                    top: `${startTop + 2 * gapSize}rpx`,
                    align: 'left',
                    fontSize: '13px'
                  }, common, { left: '80rpx' }],
                },
                {
                  type: 'text',
                  text: '活动地址：' + address,
                  css: [{
                    top: `${startTop + 3 * gapSize}rpx`,
                    align: 'left',
                    fontSize: '13px'
                  }, common, { left: '80rpx' }],
                },
                {
                  type: 'text',
                  text: '活动达人：' + res.data.activity.nickname,
                  css: [{
                    top: `${startTop + 4 * gapSize}rpx`,
                    align: 'left',
                    fontSize: '13px'
                  }, common, { left: '80rpx' }],
                },
                {
                  type: 'text',
                  text: '下班一起玩',
                  css: [{
                    top: `650rpx`,
                    align: 'center',
                    fontSize: '14px',
                    color: '#FD673E'
                  }, common, { left: '420rpx' }],
                },
                {
                  type: 'text',
                  text: '都市白领兴趣交友平台',
                  css: [{
                    top: `700rpx`,
                    align: 'left',
                    fontSize: '14px',
                    width: '450rpx',
                    color: '#FD673E'
                  }, common, { left: '280rpx' }],
                },

                {
                  type: 'image',
                  url: res.data.activity.ercodeUrl,
                  css: {
                    top: '620rpx',
                    left: '90rpx',
                    borderRadius: '80rpx',
                    width: '160rpx',
                    height: '160rpx',
                  },
                },
                {
                  type: 'text',
                  text: '识别小程序报名',
                  css: [{
                    top: '780rpx',
                    align: 'left',
                    fontSize: '12px',
                    left: '100rpx'
                  }],
                },

              ],
            }
            //console.log("template:" + template);
            that.setData({
              template: template,
            });
            wx.hideLoading();



          }
        })



      }


    });




    //var that=this;


  },
  onShareAppMessage: function () {
    return {
      title: title,
      desc: '梦里花落邀请你参加这个好玩的活动，快来报名吧！',
      path: '/pages/details/details?activityId=' + activityId + '&fromOpenid=' + openid
    }
  },
  handleMap: function () {
    var that = this;
    wx.openLocation({
      latitude: that.data.latitude,
      longitude: that.data.longitude,
      name: that.data.address,
      scale: 20
    })
  },
  handleUser: function (event) {
    var id = event.currentTarget.id;
    // console.log("id："+event.currentTarget.id);
    wx.navigateTo({
      url: '../userview/userview?openid=' + id
    })
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  bindCommentChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      comment: e.detail.value
    })
    console.log("comment:" + this.data.comment);
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      //解密手机号码保存到服务器
      wx.request({
        url: getApp().data.serviceUrl + '/yqw/api/activity/getPhoneNumber',
        data: {
          spSession: spSession,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        },
        success: function (res) {
          console.log("code:" + res.data.code);
          if (res.data.code == '1') {

          }

        }
      })
    }
  },
  //留言
  formSubmitComment: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formId = e.detail.formId;
    if (e.detail.value.comments == '') {
      wx.showModal({
        content: '请输入留言',
        showCancel: false
      });
      return false;
    }
    console.log('form发生了submit事件，formId为：', e.detail.formId)
    var url = getApp().data.serviceUrl + '/yqw/api/activity/saveFormId';
    wx.request({
      url: url,
      data: {
        appId: getApp().data.appId,
        formId: e.detail.formId,
        openid: openid,
        commentid: that.data.commentid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
      }
    })
    wx.request({
      url: getApp().data.serviceUrl + '/yqw/api/activity/addComment',
      data: {
        appid: getApp().data.appId,
        openid: openid,
        activityId: activityId,
        comment: e.detail.value.comments,
        commentid: that.data.commentid,
        commentType: '1'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          comment: ""
        });
        wx.request({
          url: getApp().data.serviceUrl + '/yqw/api/activity/loadComment',
          data: {
            activityId: activityId,
            type: '1'
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data);
            that.setData({ commentList: res.data.list });

          }
        })

      }
    })


  },
  /**
   * 授权回调
  */
  onLoadFun: function () {
    this.getUserInfo();
  },

})
