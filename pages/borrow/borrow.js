// pages/borrow/borrow.js
Page({
  data: {
    username: wx.getStorageSync('libInfo').username || '',
    borrowInfo: wx.getStorageSync('libInfo').borrowInfo || ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('borrow onload')
    console.log(this.data.borrowInfo)
    // wx.clearStorageSync()
  },
  onReady: function () {
    // 页面渲染完成
    console.log('borrow onready')
    console.log(wx.getStorageInfoSync())
  },
  onShow: function () {
    // 页面显示
    console.log('borrow onshow')
    if (!this.data.username && wx.getStorageSync('libInfo').username) {
      this.setData({
        username: wx.getStorageSync('libInfo').username,
        borrowInfo: wx.getStorageSync('libInfo').borrowInfo
      })
    }
  },
  onHide: function () {
    // 页面隐藏
    console.log('borrow onhide')
  },
  onUnload: function () {
    // 页面关闭
    console.log('borrow onunload')
  }
})