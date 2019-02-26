// miniprogram/pages/post/postDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    postId:'',
    postDetail:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**接收参数 */
    this.setData({
      postId: options.postId
    })
    this.getPostById();
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
  onShareAppMessage: function (options) {

    return {
      //## 此为转发页面所显示的标题
      title: '点击助我简历升级',
      //## 此为转发页面的描述性文字
      desc: '江湖救急，还请贵人伸手相助啊!',
      //## 此为转发给微信好友或微信群后，对方点击后进入的页面链接，可以根据自己的需求添加参数
      path: "pages/mine/mine?postId=" + options.target.dataset.id + "&redirec_url='/pages/postDetail/postDetail'",
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
   * 根据id获得详情
   */
  getPostById:function(){

    let _this = this
    wx.request({
      url: 'https://www.kklei.com/post/'+this.data.postId,
      header: app.globalData.header,
      success: (result) => {
        _this.setData({
          postDetail: result.data.obj
        })
      }
    })
  }
})