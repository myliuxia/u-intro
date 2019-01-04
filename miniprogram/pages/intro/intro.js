// miniprogram/pages/intro/intro.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introInfo:null,
    userInfo: app.globalData.userInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.userInfo)
    try {
      const phone = wx.getStorageSync('phone')
      const otherInfo = wx.getStorageSync('introInfo')
      
      this.setData({
        introInfo: { phone: phone, ...otherInfo}
      })
     
    } catch (e) {
      // Do something when catch error
    }
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

  }
})