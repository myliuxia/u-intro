// miniprogram/pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.header.Cookie){
      this.getIntroList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
            return { id: item.id, phone: item.phone }
          })
          _this.setData({
            introList: list,
          })
        }else{
          wx/wx.redirectTo({
            url: '../../pages/index/index',
          })
        }

        wx.hideLoading()
      }
    })
  }
})