//app.js
App({
  onLaunch: function (path) {
    let redirec_url = '';
    let query = '';

    for(let i in path.query){
      if(i){
        query = query + i + '=' + path.query[i]+ '&'
      }
    }
    if(query){
      redirec_url = path.path + '?' + query;
    }else{
      redirec_url = path.path;
    }
    
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    })

    wx.login({
      success:(res)=> {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://www.kklei.com/wxlogin',
            data: {
              code: res.code
            },
            success: (result) => {
              let cookie = 'JSESSIONID=' + result.data.msg;
              this.globalData.header.Cookie = cookie;
              //this.globalData.header["Content-Type"] = "application/json;charset=UTF-8"
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] ){
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              wx.redirectTo({
                url: '/pages/mine/mine',
              })
            }
          })
        }
      }
    })
    
  },

  globalData: {
    userInfo: null,
    header:{
      Cookie: ''
    }
  }
})