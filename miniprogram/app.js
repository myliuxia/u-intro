//app.js
App({
  onLaunch: function (path) {
    let redirec_url = '';
    let query = '';
    let hasRedirec=false;
    //console.log(path)
    for(let i in path.query){
      if (i != 'redirec_url'){
        query = query + i + '=' + path.query[i]+ '&'
      }else{
        redirec_url = decodeURIComponent(path.query[i]);
        hasRedirec = true;
      }
    }

    if (hasRedirec){
      if (query) {
        redirec_url = redirec_url + '?' + query;
      } else {
        redirec_url = redirec_url;
      }
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
              //console.log(redirec_url)
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              if (redirec_url){
                wx.navigateTo({
                  url: redirec_url,
                })
              }
              
              // wx.getSetting({
              //   success: res => {
              //     if (res.authSetting['scope.userInfo']) {
              //       wx.getUserInfo({
              //         success: res => {
              //           this.globalData.userInfo = res.userInfo;
              //           wx.redirectTo({
              //             url: redirec_url,
              //           })
              //         }
              //       })
              //     }else{

              //     }
              //   }
              // })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
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