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
    wx.login({
      success:(res)=> {
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'https://www.kklei.com/wxlogin',
            data: {
              code: res.code
            },
            success:(result)=>{
              let cookie = 'JSESSIONID=' + result.data.msg;
              this.globalData.header.Cookie = cookie;
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getSetting({
      success:res=> {
        if (res.authSetting['scope.userInfo'] && path.path !== 'pages/login/login'){
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
            }
          })
        }else{
          //未授权
          wx.navigateTo({
            url: '/pages/login/login?redirec_url=' + encodeURIComponent(redirec_url),
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