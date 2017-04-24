// pages/borrow/borrow.js
Page({
  data: {
    username: wx.getStorageSync('libInfo').username || '',
    borrowInfo: wx.getStorageSync('libInfo').borrowInfo || ''
  },
  logoutLibrary() {
    wx.setStorageSync('libInfo', "")
    wx.navigateTo({
      url: '../loginLibrary/loginLibrary',
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
    console.log('logoutLibrary')
    console.log(wx.getStorageSync('libInfo'))
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('borrow onload')
    console.log(wx.getStorageSync('libInfo'))
  },
  onReady: function () {
    // 页面渲染完成
    console.log('borrow onready')
    console.log(wx.getStorageInfoSync())
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})