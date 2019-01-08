const app = getApp()
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
      //endDate:'',
      schoolName:'',
      award:{},
    },
    university: {//大学信息
      beginDate: '',
      //endDate: '',
      schoolName: '',
      award: {},
    },
    graduate: {//研究生
      beginDate: '',
      //endDate: '',
      schoolName: '',
      award: {},
    },
    otherAward:[],//其他奖励
    hasWork: 0,// 是否有工作经验0:否；1:是
    work:[{
      beginDate:'',
      endDate:'',
      companyName: '',
      post: '',//岗位
    }],
    motto:'',
    imgCode:''

  },
  onLoad: function() {
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
      let _this = this;
      let introInfo = { 
        name: this.data.myName,
        birthday: this.data.myBirthday,
        address: this.data.myAddress.join(' '),
        seniorHighSchool: this.data.seniorHighSchool,
        university: this.data.university,
        graduate: this.data.graduate,
        otherAward: this.data.otherAward,
        hasWork: this.data.hsWork,
        work: this.data.work,
        motto: this.data.motto,
      }
      wx.request({
        url: 'https://www.kklei.com/submit',
        header: app.globalData.header, 
        method:"POST",
        data: { 
          phone: _this.data.myPhone, 
          introInfo: JSON.stringify(introInfo) 
        },
        success: (result) => {
          //console.log(result)
          wx.redirectTo({ url: '../../pages/success/success?introId=' + result.data.obj})
        }
      })
    } catch (err) { 
      console.log(err)
    }
    
  }

})