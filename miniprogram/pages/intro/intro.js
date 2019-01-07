// miniprogram/pages/intro/intro.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    introInfo:null,
    phone:'',
    userInfo: app.globalData.userInfo,
    introId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(this.data.userInfo)

    /**接收参数 */
    this.setData({
      introId: options.introId
    })

    try {
      const phone = wx.getStorageSync('phone')
      const otherInfo = wx.getStorageSync('introInfo')
      
      this.setData({
        introInfo: { phone: phone, ...otherInfo}
      })
      this.getIntro()
     
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

  },
  getIntro:function(){
    let _this = this;
    wx.request({
      url: 'https://www.kklei.com/intro_info',
      data:{
        id: _this.data.introId
      },
      header: app.globalData.header,
      success: (result) => {
        console.log(result)
        _this.setData({
          phone: result.data.obj.phone,
          introInfo: JSON.parse(result.data.obj.introInfo),
        })
      }
    })

  }
 
})