//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    username: wx.getStorageSync('username') || ''
  },
  onLoad: function () {
    console.log('index  onload : ' + this.data.username)
  },
  onShow() {
    console.log('index onshow: ' + this.data.username)
  }
})
