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
        do: 'delete'
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      }, // 设置请求的 header
      success: function (res) {
        that.setData({
          username: ''
        })
        wx.setStorageSync('username', '')
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
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

    if (options.isBindAccount) {
      this.setData({
        isBindAccount: true
      })
    }

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    console.log('username' + this.data.username)
    this.setData({
      username: wx.getStorageSync('username')
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})