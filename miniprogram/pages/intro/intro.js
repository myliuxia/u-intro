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
    introId:'',
    showShareDialog:false,//控制对话框显示的开关
    grade:[
      { name: '普通', auth: '' },
      { name: '精英', auth: '一次人工帮助优化简历的服务' },
      { name: '天才', auth: '平台帮助加推简历50次' },
      { name: '名宿', auth: '平台帮助内top500强' },
    ],
    gradeIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function (options) {
    
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      //## 此为转发页面所显示的标题
      //title: '好友代付', 
      //## 此为转发页面的描述性文字
      desc: '江湖救急，还请贵人伸手相助啊!',
      //## 此为转发给微信好友或微信群后，对方点击后进入的页面链接，可以根据自己的需求添加参数
      path: 'pages/share/share?introId=' + options.target.dataset.id,
      imageUrl: 'https://www.kklei.com/logo.jpg',
      //## 转发操作成功后的回调函数，用于对发起者的提示语句或其他逻辑处理
      success: function (res) {
        //这是我自定义的函数，可替换自己的操作
        util.showToast(1, '转发成功');
      },
      //## 转发操作失败/取消 后的回调处理，一般是个提示语句即可
      fail: function () {
        util.showToast(0, '转发失败...');
      }
    }
    
  },
  /**
   * 根据id查询简历
   */
  getIntro:function(){
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    wx.request({
      url: 'https://www.kklei.com/intro_info',
      data:{
        id: _this.data.introId
      },
      header: app.globalData.header,
      success: (result) => {
        //console.log(result)
        _this.setData({
          phone: result.data.obj.phone,
          introInfo: JSON.parse(result.data.obj.introInfo),
        })
        let grade = 0
        if (_this.data.introInfo.likeNum<10){
          grade=0
        } else if (_this.data.introInfo.likeNum >= 10 && _this.data.introInfo.likeNum < 50) {
          grade = 1
        } else if (_this.data.introInfo.likeNum >= 50 && _this.data.introInfo.likeNum < 100) {
          grade = 2
        } else if (_this.data.introInfo.likeNum >= 100) {
          grade = 3
        }
        if(grade<3){
          _this.setData({
            showShareDialog: true,
            gradeIndex: grade,
          })
        }else{
          _this.setData({
            showShareDialog: false,
            gradeIndex: grade,
          })
        }
        wx.hideLoading()
      }
    })
  },

  /**
   * 根据id删除简历
   */
  deleteIntro:function(){
    let _this = this;
    wx.request({
      url: 'https://www.kklei.com/delete_intro',
      data: {
        id: _this.data.introId
      },
      header: app.globalData.header,
      success: (result) => {
        wx.navigateTo({
          url: '../../pages/mine/mine',
        })
      }
    })
  },
  /**
   * 分享加速
   */
  shareIntro:function(){

  },

  /**
   * 关闭对话框
   */

  closeDialog:function(){
    this.setData({
      showShareDialog:false,
    })
  }
 
})