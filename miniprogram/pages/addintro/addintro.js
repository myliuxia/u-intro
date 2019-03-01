// miniprogram/pages/addintro/addintro.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGotoDetailPage:true,
    isAuth: true,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    username:'',
    sexs: [
      { name: '1', value: '男', checked: 'true' },
      { name: '2', value: '女' },
    ],
    needUploadHeadImage:"请上传头像",
    introImage:"../../images/v-icon.jpg",
    birthDay: '2016-09-01',
    region: ['广东省', '广州市', '海珠区'],
    detailAddress:"",
    myPhone: '',
    motto: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
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
              // _this.addUserInfo()
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
  login: function (e) {
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo);
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        isAuth: true,
      })
      this.addUserInfo()
    } else {
      //用户拒绝了授权
      this.setData({
        isAuth: false,
      })
    }
  }, 
  /**
   * 添加用户数据
   */
  addUserInfo: function () {
    wx.request({
      url: 'https://www.kklei.com/add_user_info',
      data: app.globalData.userInfo,
      header: app.globalData.header,
      success: (res) => {
        console.log("!!!!"+res)
      }
    })
  },
  chooseImage: function () {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        console.log(res)
        wx.uploadFile({
          url: 'https://www.kklei.com/save_img',
          filePath: res.tempFilePaths[0],
          name: 'introImage',
          header: app.globalData.header,
          success: (result) => {
            console.log(result)
            let resData = JSON.parse(result.data)
            this.setData({
              introImage: 'https://www.kklei.com/' + resData.obj,
              needUploadHeadImage:''
            })
          }
        })
      },
      fail: (err) => {

      }
    })
  },
  birthDayChange:function(e){
    this.setData({
      birthDay: e.detail.value
    })
  },
  phoneInput:function(e){
    this.setData({
      myPhone: e.detail.value
    })
  },
  nameInput:function(e){
    this.setData({
      username: e.detail.value
    })
  },
  detailAddressInput(e){
    this.setData({
      detailAddress: e.detail.value
    })
  },
  detailMottoInput(e) {
    this.setData({
      motto: e.detail.value
    })
  },
  notgotoDetailPage: function () {
    this.setData({
      isGotoDetailPage: true,
    })
  },
  gotoDetailPage:function(){
    wx.navigateTo({
      url: '../../pages/addintro/addintrodetail/addintrodetail'
    })
  },
  save:function(){
    let introInfo = {
      name: this.data.username,
      birthday: this.data.birthDay,
      address: this.data.region.join(' '),
      motto: this.data.motto,
      introImage: this.data.introImage,
      myPhone: this.data.myPhone
    }
    app.globalData.intro = introInfo;
    console.log(app.globalData.intro)
    this.setData({
      isGotoDetailPage: false,
    })
  },
  bindRegionChange(e){
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  }
})