// miniprogram/pages/share/share.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introId:'',
    likeNum: 0,
    gapNum: 0,//距离升级差距的升级包数量
    btnDisable: false,
    grade: [
      { name: '普通', auth: '' },
      { name: '精英', auth: '一次人工帮助优化简历的服务' },
      { name: '天才', auth: '平台帮助加推简历50次' },
      { name: '名宿', auth: '平台帮助内top500强' },
    ],
    gradeIndex: 0,
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
    this.getIntro();
    this.hasLike();
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
      path: "pages/mine/mine?introId=" + options.target.dataset.id + "&redirec_url='/pages/share/share'",
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

  }, /**
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
          likeNum: result.data.obj.likeNum,
        })
        let grade = 0
        if (_this.data.likeNum < 10) {
          grade = 0
        } else if (_this.data.likeNum >= 10 && _this.data.likeNum < 50) {
          grade = 1
        } else if (_this.data.likeNum >= 50 && _this.data.likeNum < 100) {
          grade = 2
        } else if (_this.data.likeNum >= 100) {
          grade = 3
        }
        _this.setData({
          showShareDialog: false,
          gradeIndex: grade,
        })
        _this.countGap();
        wx.hideLoading()
      }
    })
  },

  /*点赞 */
  likeIntro:function(){
    let _this = this;
    _this.setData({
      btnDisable: true,
    })
    wx.request({
      url: 'https://www.kklei.com/like',
      header: app.globalData.header,
      data: {
        id: _this.data.introId
      },
      success: (result) => {
        console.log(result)
        if (result.data.errorcode == 1){
          wx.showToast({title: '升级成功！'});
          _this.getIntro()
        }else{
          wx.showToast({title: '请求失败！',icon: 'none',});
        }
      },
      fail:(err) =>{
        wx.showToast({ title: '网路请求失败！',icon: 'none',});
      }

    })
  },
  /**
   * 计算距离上一级的差距
   */
  countGap: function () {
    let gap = 0;
    if (this.data.likeNum < 10) {
      gap = 10 - this.data.likeNum
    } else if (this.data.likeNum < 50) {
      gap = 50 - this.data.likeNum
    } else if (this.data.likeNum < 100) {
      gap = 100 - this.data.likeNum
    }
    this.setData({
      gapNum: gap,
    })
  },
  /**
   * 查询是否已点赞
   */
  hasLike: function () {
    let _this = this;
    wx.request({
      url: 'https://www.kklei.com/has_like',
      header: app.globalData.header,
      data: {
        id: _this.data.introId
      },
      success: (result) => {
        _this.setData({
          btnDisable: result.data.obj,
        })
      },
      fail: (err) => {console.log(err)}
    })
  }
  
})