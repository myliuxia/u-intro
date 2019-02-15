// miniprogram/pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introList:[],
    load:false,
    redirec_url:'',
    noticeList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],//公告内容
    noticeHeight:0,
    noticeIndex:0,
    recruitList:[],//招聘信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#noticeBox').boundingClientRect();
    query.exec((nodeRes) => {
      this.setData({
        noticeHeight: nodeRes[0].height
      })
    })


    /**接收参数 */
    this.setData({
      redirec_url: options.redirec_url ? options.redirec_url:''
    })
    if (app.globalData.header.Cookie){
      this.getIntroList()
      this.getRecruit()
      this.getNotice()
    }else{
      app.userInfoReadyCallback = () => {
        this.getIntroList()
        this.getRecruit()
        this.getNotice()
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
      url: 'https://www.kklei.com/recruit/suggest?size=5',
      header: app.globalData.header,
      success: (result) => {
        if (result.data.obj && result.data.obj.length > 0) {
          _this.setData({
            recruitList: result.data.obj,
          })
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
  }
  
})