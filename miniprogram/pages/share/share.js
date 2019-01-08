// miniprogram/pages/share/share.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introId:'',
    likeNum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**接收参数 */
    this.setData({
      introId: options.introId
    })
    //加载数据
    this.getIntro()
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
   * 根据id查询简历
   */
  getIntro: function () {
    let _this = this;
    wx.request({
      url: 'https://www.kklei.com/intro_info',
      data: {
        id: _this.data.introId
      },
      header: app.globalData.header,
      success: (result) => {
        //console.log(result)
        _this.setData({
          likeNum: result.data.obj.likeNum,
        })
      }
    })
  },

  /*点赞 */
  likeIntro:function(){
    let _this = this;
    wx.request({
      url: 'https://www.kklei.com/like',
      header: app.globalData.header,
      data: {
        id: _this.data.introId
      },
      success: (result) => {
        console.log(result)
        _this.getIntro()
       
      }
    })
  }
  
  
})