// miniprogram/pages/vipIntro/vipIntro.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    introInfo: null,
    phone: '',
    introId: '', 
    email:'',
    sendMailDialog: false,// 发送邮件弹框显示开关
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**接收参数 */
    this.setData({
      introId: options.introId,
    })
    this.getIntro()
  },
  /**
     * 根据id查询简历
     */
  getIntro: function () {
    wx.showLoading({
      title: '加载中',
    })
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
          phone: result.data.obj.phone,
          introInfo: JSON.parse(result.data.obj.introInfo),
        })
        wx.hideLoading()
      },
      fail: (err) => {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
        });
      }
    })
  },
  /**
   * 显示发送邮件弹框
   */
  showSendMail: function () {
    this.setData({
      sendMailDialog: true
    })
  },
  /**
   * 关闭发送邮件弹框
   */
  closeSendMail: function () {
    this.setData({
      sendMailDialog: false,
    })
  },

  /**
   * 发送邮件
   */
  sendmail: function () {
    let _this = this;

    this.setData({
      sendMailDialog: false,
    })
    wx.showLoading({
      title: '发送中',
    })
    wx.request({
      url: 'https://www.kklei.com/send_mail',
      data: {
        id: _this.data.introId,
        email: _this.data.email,
      },
      header: app.globalData.header,
      success: (result) => {
        wx.showToast({
          title: '邮件发送成功',
        });
      },
      fail: function () {
        wx.showToast({
          title: '发送失败失败',
          icon: 'none',
        });

      }
    })
  },

})