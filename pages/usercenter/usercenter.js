// pages/usercenter/usercenter.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    isBindAccount: false,
    username: ''
  },

  logout: function () {
    var that = this
    wx.request({
      url: 'https://wwwxinle.cn/wechatapp/cancel.php',
      data: {
        id: this.data.username,
        type: 'delete'
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          username: ''
        })
        wx.setStorageSync('username', '')
      }
    })
  },
  onLoad: function (options) {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onShow: function () {
    this.setData({
      username: wx.getStorageSync('username')
    })
  }
})