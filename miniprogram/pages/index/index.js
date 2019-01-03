var plugin = requirePlugin("myPlugin")
Page({
  date:{
    
  },
  onLoad: function() {
    plugin.getData()
  },
  goPage:function(){
    wx.navigateTo({
      url: '../phone/phone',
    })
  }
})