// miniprogram/pages/addintro/addintrodetail/addintrodetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seniorHighSchool: {//高中信息
      beginDate: '2018-12-1',
      schoolName: '',
      award: {},
    },
    university: {//大学信息
      beginDate: '2018-12-1',
      schoolName: '',
      award: {},
    },
    graduate: {//研究生
      beginDate: '2018-12-1',
      //endDate: '',
      schoolName: '',
      award: {},
    }, 
    work: [{
      beginDate: '2018-01-01',
      endDate: '2018-01-01',
      companyName: '金网',
      post: '12321',//岗位,
      workContent:''
    },{
      beginDate: '2018-01-01',
      endDate: '2018-01-01',
      companyName: '金网',
      post: '12321',//岗位,
        workContent: ''
    }],
    tempWork:{
      beginDate: '',
      endDate: '',
      companyName: '',
      post: '',//岗位
      workContent: ''
    },
    currentTab:"education",
    addWork:false,
    editWorkIndex:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  showEducation:function(){
    this.setData({
      currentTab: this.data.currentTab == "education" ? "" : "education",
    })
  },
  showWork: function () {
    this.setData({
      currentTab: this.data.currentTab == "work" ? "" : "work",
    })
  },
  seniorHighSchoolDateChange:function(e){
    this.setData({
      seniorHighSchool:{
        schoolName: this.data.seniorHighSchool.schoolName,
        award: this.data.seniorHighSchool.award,
        beginDate: e.detail.value
      }
    })
  },
  seniorHighSchoolNameChange: function (e) {
    this.setData({
      seniorHighSchool: {
        schoolName: e.detail.value,
        beginDate: this.data.seniorHighSchool.beginDate,
        award: this.data.seniorHighSchool.award,
      }
    })
  },
  seniorHighSchoolRewardChange:function(e){
    this.setData({
      seniorHighSchool: {
        award: e.detail.value,
        beginDate: this.data.seniorHighSchool.beginDate,
        schoolName: this.data.seniorHighSchool.schoolName,
      }
    })
  },
  seniorHighSchoolDateChange: function (e) {
    this.setData({
      seniorHighSchool: {
        schoolName: this.data.seniorHighSchool.schoolName,
        award: this.data.seniorHighSchool.award,
        beginDate: e.detail.value
      }
    })
  },
  seniorHighSchoolNameChange: function (e) {
    this.setData({
      seniorHighSchool: {
        schoolName: e.detail.value,
        beginDate: this.data.seniorHighSchool.beginDate,
        award: this.data.seniorHighSchool.award,
      }
    })
  },
  seniorHighSchoolRewardChange: function (e) {
    this.setData({
      seniorHighSchool: {
        award: e.detail.value,
        beginDate: this.data.seniorHighSchool.beginDate,
        schoolName: this.data.seniorHighSchool.schoolName,
      }
    })
  },
  //------------------
  universitylDateChange:function(e){
    this.setData({
      university:{
        schoolName: this.data.university.schoolName,
        award: this.data.university.award,
        beginDate: e.detail.value
      }
    })
  },
  universityNameChange: function (e) {
    this.setData({
      university: {
        schoolName: e.detail.value,
        beginDate: this.data.university.beginDate,
        award: this.data.university.award,
      }
    })
  },
  universityRewardChange:function(e){
    this.setData({
      university: {
        award: e.detail.value,
        beginDate: this.data.university.beginDate,
        schoolName: this.data.university.schoolName,
      }
    })
  },
  //------------
  graduateDateChange: function (e) {
    this.setData({
      graduate: {
        schoolName: this.data.graduate.schoolName,
        award: this.data.graduate.award,
        beginDate: e.detail.value
      }
    })
  },
  graduateNameChange: function (e) {
    this.setData({
      graduate: {
        schoolName: e.detail.value,
        beginDate: this.data.graduate.beginDate,
        award: this.data.graduate.award,
      }
    })
  },
  graduateRewardChange: function (e) {
    this.setData({
      graduate: {
        award: e.detail.value,
        beginDate: this.data.graduate.beginDate,
        schoolName: this.data.graduate.schoolName,
      }
    })
  },
  companyBeginDateChange:function(e){
    this.setData({
      tempWork: {
        beginDate: e.detail.value,
        endDate: this.data.tempWork.endDate,
        companyName: this.data.tempWork.companyName,
        post: this.data.tempWork.post,
        workContent: this.data.tempWork.workContent,
      }
    })
  },
  companyEndDateChange: function (e) {
    this.setData({
      tempWork: {
        beginDate: this.data.tempWork.beginDate,
        endDate: e.detail.value,
        companyName: this.data.tempWork.companyName,
        post: this.data.tempWork.post,
        workContent: this.data.tempWork.workContent,
      }
    })
  },
  companycompanyNameChange: function (e) {
    this.setData({
      tempWork: {
        beginDate: this.data.tempWork.beginDate,
        endDate: this.data.tempWork.endDate,
        companyName: e.detail.value,
        post: this.data.tempWork.post,
        workContent: this.data.tempWork.workContent,
      }
    })
  },
  companyPostChange: function (e) {
    this.setData({
      tempWork: {
        beginDate: this.data.tempWork.beginDate,
        endDate: this.data.tempWork.endDate,
        companyName: this.data.tempWork.companyName,
        post: e.detail.value,
        workContent: this.data.tempWork.workContent,
      }
    })
  },
  companyworkContentChange:function(e){
    this.setData({
      tempWork: {
        beginDate: this.data.tempWork.beginDate,
        endDate: this.data.tempWork.endDate,
        companyName: this.data.tempWork.companyName,
        post: e.detail.value,
        workContent: e.detail.value,
      }
    })
  },
  editWork(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      addWork:true,
      editWorkIndex: e.currentTarget.dataset.index,
      tempWork: {
        beginDate: this.data.work[e.currentTarget.dataset.index].beginDate,
        endDate: this.data.work[e.currentTarget.dataset.index].endDate,
        companyName: this.data.work[e.currentTarget.dataset.index].companyName,
        post: this.data.work[e.currentTarget.dataset.index].post,
      }
    })
  },
  addWork(e) {
    this.setData({
      addWork: true,
      tempWork: {
        beginDate: "2018-01-01",
        endDate: "2018-01-01",
        companyName: "",
        post: "",
      }
    })
  },
  sureAddwork(){
    if(this.data.editWorkIndex>=0){
      var printPrice = "work[" + this.data.editWorkIndex + "]";
      this.setData({
        addWork: false,
        [printPrice + '.beginDate']: this.data.tempWork.beginDate,
        [printPrice + '.endDate']: this.data.tempWork.endDate,
        [printPrice + '.companyName']: this.data.tempWork.companyName,
        [printPrice + '.post']: this.data.tempWork.post,
      })
    }else{
      this.setData({
        addWork: false,
        work: this.data.work.concat([{
          'beginDate': this.data.tempWork.beginDate,
          'endDate': this.data.tempWork.endDate,
          'companyName': this.data.tempWork.companyName,
          'post': this.data.tempWork.post,
          'workContent': this.data.tempWork.workContent,
          }
        ])
      })
    }
  },
  cancelAddwork() {
    this.setData({
      addWork: false,
      tempWork: {
        beginDate: "2018-01-01",
        endDate: "2018-01-01",
        companyName: "",
        post: "",
        workContent: ''
      },
      editWorkIndex: -1
    })
  },
  saveIntro(){
    let data={
      introId:null,
      name: app.globalData.intro.name,
      birthday: app.globalData.intro.birthday,
      address: app.globalData.intro.address,
      seniorHighSchool: this.data.seniorHighSchool,
      university: this.data.university,
      graduate: this.data.graduate,
      otherAward: this.data.otherAward,
      hasWork: this.data.hasWork,
      work: this.data.work,
      motto: app.globalData.intro.motto,
      introImage: app.globalData.intro.introImage
    }
    console.log(data)
    wx.request({
      url: 'https://www.kklei.com/submit',
      header: app.globalData.header,
      method: "POST",
      data: {
        phone: app.globalData.intro.myPhone, 
        introInfo: JSON.stringify(data),
      },
      success: (result) => {
        console.log(result)
        
      }
    })
  }
})