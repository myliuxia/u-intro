var plugin = requirePlugin("myPlugin")
Page({
  data:{
    swiperHeight:0,
    swiperCurrent:0,
    myPhone:'',
    myName:'',
    myBirthday:'',
    myAddress: ['','',''],
    customItem: '全部'
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
  /** 绑定输入的电话号码 */
  phoneInput:function(e){
    console.log(123)
    this.setData({
      myPhone: e.detail.value,
    })
  },
  /** 绑定输入的姓名 */
  nameInput: function (e) {
    this.setData({
      myName: e.detail.value,
    })
  },
  birthdayInput:function(e){
    this.setData({
      myBirthday: e.detail.value
    })
  },
  addressInput:function(e){
    this.setData({
      myAddress: e.detail.value
    })
  },
  /** 提交填写信息 */
  submitIntro:function(){
    try {
      let introInfo = { 
        name: this.data.myName,
        birthday: this.data.myBirthday,
        address: this.data.myAddress.join(' '),
      }

      wx.setStorageSync('phone', this.data.myPhone);
      wx.setStorageSync('introInfo', introInfo);
      wx.navigateTo({ url: '../../pages/intro/intro'})

    } catch (e) { 

    }
    
  }

})