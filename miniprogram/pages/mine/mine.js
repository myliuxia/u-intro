// miniprogram/pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introList:[],
    redirec_url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**接收参数 */
    this.setData({
      redirec_url: options.redirec_url ? options.redirec_url:''
    })
    if (app.globalData.header.Cookie){
      this.getIntroList()
    }else{
      app.userInfoReadyCallback = () => {
        this.getIntroList()
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
          })
        }else{
          if (!_this.data.redirec_url){
            wx / wx.redirectTo({
              url: '../../pages/add/add',
            })
          }
        }

        wx.hideLoading()
      }
    })
  }
})