// miniprogram/pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redirect_url:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      redirect_url: options.redirec_url?decodeURIComponent(options.redirec_url):'pages/mine/mine'
    })
  },
  login:function(e){
    let that = this;
    //console.log(e.detail.userInfo)

    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    let prevPage = pages[pages.length - 2];

    if (e.detail.userInfo) {

      app.globalData.userInfo = e.detail.userInfo;
      that.addUserInfo()

      prevPage.setData({
        isAuth: true,
      })
      wx.navigateBack({
        delta: 1 
      })

    }else{
      //用户拒绝了授权
      prevPage.setData({
        isAuth: false,
      })
      wx.navigateBack({
        delta: 2 
      })
    }

  },
  getUserInfo:function(e){
    let _this = this;
    wx.getUserInfo({
      success(res) {
        //console.log(res.userInfo)
        app.globalData.userInfo = res.userInfo;
        _this.addUserInfo()
      }
    })
  },
  check:function(e){
    wx.request({
      url: 'https://www.kklei.com/date',
      header: app.globalData.header
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  }
})