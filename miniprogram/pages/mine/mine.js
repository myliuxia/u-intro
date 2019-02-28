// miniprogram/pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    introList:[],
    load:false,
    redirec_url:'',
    noticeList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],//公告内容
    noticeHeight:0,
    noticeIndex:0,
    recruitList:[],//招聘信息
    postPage:{
      page:0,
      size:4,
    },
    postList:[],
    recruitIndex:0,
    showMb:false,
    mBStep:1,
    isAuth:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#noticeBox').boundingClientRect();
    query.exec((nodeRes) => {
      this.setData({
        noticeHeight: nodeRes[0].height
      })
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //已经授权
          _this.setData({
            isAuth: true,
          })
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo;
              _this.addUserInfo()
            }
          })
        } else {
          // 未授权或拒接授权
          _this.setData({
            isAuth: false,
          })
        }
      }
    })

    /**接收参数 */
    this.setData({
      redirec_url: options.redirec_url ? options.redirec_url:''
    })
    if (app.globalData.header.Cookie){
      this.getIntroList()
      this.getRecruit()
      this.getNotice()
      this.getPost()
      this.getCourse()
    }else{
      app.userInfoReadyCallback = () => {
        this.getIntroList()
        this.getRecruit()
        this.getNotice()
        this.getPost()
        this.getCourse()
      };
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      //## 此为转发页面所显示的标题
      title: '优简历',
      //## 此为转发页面的描述性文字
      desc: '如何轻松得到一份漂亮的简历',
      //## 此为转发给微信好友或微信群后，对方点击后进入的页面链接，可以根据自己的需求添加参数
      path: "pages/mine/mine",
      imageUrl: 'https://www.kklei.com/logo.jpg',
      //## 转发操作成功后的回调函数，用于对发起者的提示语句或其他逻辑处理
      success: function (res) {
        wx.showToast({
          title: '转发成功',
        });
      },
      fail: function () {
        wx.showToast({
          title: '转发失败',
          icon: 'none',
        });
      }
    }
  },
  /**
   * 获得简历列表
   */
  getIntroList:function(){
    let _this = this
    wx.showLoading({title:"加载中"})
    wx.request({
      url: 'https://www.kklei.com/intro_list', 
      header: app.globalData.header,
      success: (result) => {
        if (result.data.obj && result.data.obj.length>0){
          let list = result.data.obj.map((item) => {
            return { id: item.id, phone: item.phone,type:item.type }
          })
          _this.setData({
            introList: list,
            load:true,
          })
        }
        _this.setData({
          load: true,
        })
        wx.hideLoading()
      }
    })
  },
  /**
   * 获得招聘信息
   */
  getRecruit:function(){
    let _this = this
    wx.request({
      url: 'https://www.kklei.com/recruit/suggest?size=100',
      header: app.globalData.header,
      success: (result) => {
        if (result.data.obj && result.data.obj.length > 0) {
          _this.setData({
            recruitList: result.data.obj,
          })
          //_this.listAnimation()
        }

      }
    })
  },
  /**
   * 获得公告
   */
  getNotice:function(){
    let _this = this
    wx.request({
      url: 'https://www.kklei.com/notice/last?size=10',
      header: app.globalData.header,
      success: (result) => {
        if (result.data.obj && result.data.obj.length > 0) {
          _this.setData({
            noticeList: result.data.obj,
          })
          _this.setIntervalScroll()
        }
      }
    })
  },
  /**
   * 开启定时任务
   */
  setIntervalScroll:function(){
    let _this = this;
    setInterval(function () {
      let nextIndex = _this.data.noticeIndex
      if (_this.data.noticeIndex < _this.data.noticeList.length - 1) {
        nextIndex = nextIndex + 1
      } else {
        nextIndex = 0
      }
      _this.setData({
        noticeIndex: nextIndex
      })
    }, 3000) //循环时间 这里是1秒  
  },

  notVip:function(){
    wx.showModal({
      title: '提示',
      content: '达到天才级别，获得精修简历机会，加油扩散吧！',
      showCancel: false,//是否显示取消按钮
      confirmColor: '#0081ff',//确定文字的颜色
      success: function (res) {},
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
    
  },

  /** 点击招聘信息 */
  recruitClick:function(){
    wx.showModal({
      title: '提示',
      content: '精修简历可以提高内推机会哦！',
      showCancel: false,//是否显示取消按钮
      confirmColor: '#0081ff',//确定文字的颜色
      success: function (res) { },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  getPost:function(){
    let _this = this
    wx.request({
      url: 'https://www.kklei.com/post/find',
      data: this.data.postPage,
      header: app.globalData.header,
      success: (result) => {
        console.log(result.data.obj.empty)
        if (!result.data.obj.empty){
          _this.setData({
            postList: [...this.data.postList, ...result.data.obj.content]
          })
        }
      }
    })
  },
  
  listAnimation:function(){
    if (this.data.recruitList.length>3){
      setInterval(() => {
        this.setData({
          recruitIndex: this.data.recruitList.length-1 > this.data.recruitIndex ? this.data.recruitIndex + 1 : 0,
        })

      }, 3000)
    }
  },

  stopTouchMove: function () {
    return false;
  },
  /**
   * 影藏分享提示
   */
  hideMb:function(){
    this.setData({
      showMb:false,
    })
  },

  /**
   * 判断是否是初次打开小程序
   */
  getCourse:function(){
    wx.request({
      url: 'https://www.kklei.com/usercourse/current',
      header: app.globalData.header,
      success: (result) => {
        this.setData({
          showMb: !result.data.obj,
        })
        
      }
    })
  },
  /**
   * 判断是否是初次打开小程序
   */
  addCourse: function () {
    this.setData({
      showMb: false,
    })
    wx.request({
      url: 'https://www.kklei.com/usercourse/add',
      header: app.globalData.header,
      success: (result) => {
        console.log(result)
      }
    })
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e)
    let _this = this
    wx.request({
      url: 'https://www.kklei.com/sendMessage',
      data: { formId: e.detail.formId},
      header: app.globalData.header,
      success: (result) => {
        console.log(result)
      }
    })
  },
  formReset() {
    console.log('form发生了reset事件')
  },
  /**
   * 添加用户数据
   */
  addUserInfo: function () {
    wx.request({
      url: 'https://www.kklei.com/add_user_info',
      data: app.globalData.userInfo,
      header: app.globalData.header,
      success: (result) => {
        console.log(result)
      }
    })
  },
  nextStep:function(e){
    this.setData({
      mBStep:2
    })
  }
})