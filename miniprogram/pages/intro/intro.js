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
    likeNum:0,
    phone:'',
    introId:'',


    showShareDialog:false,//控制对话框显示的开关
    grade:[
      { name: '普通', auth: '' },
      { name: '精英', auth: '一次人工帮助优化简历的服务' },
      { name: '天才', auth: '平台帮助加推简历50次' },
      { name: '名宿', auth: '平台帮助内top500强' },
    ],
    gradeIndex:0,

    buyLikeNum:10,//购买的升级包个数
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      //## 此为转发页面所显示的标题
      title: '点击助我简历升级', 
      //## 此为转发页面的描述性文字
      desc: '江湖救急，还请贵人伸手相助啊!',
      //## 此为转发给微信好友或微信群后，对方点击后进入的页面链接，可以根据自己的需求添加参数
      path: "pages/mine/mine?introId=" + options.target.dataset.id +"&redirec_url='/pages/share/share'",
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
          likeNum: result.data.obj.likeNum,
        })
        let grade = 0
        if (_this.data.likeNum<10){
          grade=0
        } else if (_this.data.likeNum >= 10 && _this.data.likeNum < 50) {
          grade = 1
        } else if (_this.data.likeNum >= 50 && _this.data.likeNum < 100) {
          grade = 2
        } else if (_this.data.likeNum >= 100) {
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
   * 修改简历
   */
  editIntro:function(){
    wx.navigateTo({
      url: '../../pages/index/index?introId=' + this.data.introId,
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
  },

  /**
   * 减少购买的升级包个数
   */
  minusBuyNum:function(){
    if(this.data.buyLikeNum>0){
      this.setData({
        buyLikeNum: this.data.buyLikeNum - 1
      })
    }
  },
  /**
   * 增加购买的升级包个数
   */
  addBuyNum: function () {
    this.setData({
      buyLikeNum: this.data.buyLikeNum + 1
    })
  }
 
})