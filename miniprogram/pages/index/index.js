var plugin = requirePlugin("myPlugin")
const app = getApp();
Page({
  data:{
    swiperHeight:0,
    swiperCurrent:0,
    myPhone:'',
    myName:'',
    myBirthday:'',
    myAddress: ['','',''],
    seniorHighSchool: {//高中信息
      beginDate:'',
      endDate:'',
      schoolName:'',
      hasAward:0,//是否获得奖励0:否；1:是
      awardes:[],
    },
    university: {//大学信息
      beginDate: '',
      endDate: '',
      schoolName: '',
      hasAward: 0,//是否获得奖励0:否；1:是
      awardes: [],
    },
    motto:'',
    imgCode:''

  },
  onLoad: function() {
    plugin.getData();
    var _this = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#stepId').boundingClientRect();
    query.exec(function (nodeRes) {
      
      wx.getSystemInfo({
        success: function (res) {
          //取高度
          _this.setData({
            swiperHeight: res.windowHeight - nodeRes[0].top,
          })
        },
      })
      
    })

    this.getImgCode()
    
    

  },
  /** 获取验证码图片 */
  getImgCode:function(){
    let _this = this;
    wx.request({
      url: 'https://www.kklei.com/image_code',
      header: app.globalData.header,
      success: (result) => {
        _this.setData({
          imgCode: 'data:image/jpeg;base64,'+result.data.msg
        })
      }
    })
  },

  /**跳转页面 */
  goPage:function(){
    wx.navigateTo({
      url: '../phone/phone',
    })
  },
  /**阻止swiper滑动 */
  stopSwiper:function(){},

  /**下一个滑块 */
  nextSwiper: function () {
    this.setData({
      swiperCurrent: this.data.swiperCurrent+1
    })
  },
  /**上一个滑块 */
  previousSwiper: function () {
    this.setData({
      swiperCurrent: this.data.swiperCurrent - 1
    })
  },
  /** 绑定输入的信息 */
  bindInputByKey: function (e) {
    let key = e.currentTarget.dataset.key // 对应字段
    this.setData({
      [key]: e.detail.value,
    })
  },
  /** 提交填写信息 */
  submitIntro:function(){
    try {
      let introInfo = { 
        name: this.data.myName,
        birthday: this.data.myBirthday,
        address: this.data.myAddress.join(' '),
        seniorHighSchool: this.data.seniorHighSchool,
        university: this.data.university,
        motto: this.data.motto,
      }

      wx.setStorageSync('phone', this.data.myPhone);
      wx.setStorageSync('introInfo', introInfo);
      wx.navigateTo({ url: '../../pages/intro/intro'})

    } catch (e) { 

    }
    
  }

})