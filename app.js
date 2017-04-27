//app.js
var util = require('utils/util')
var {WeToast} = require('src/wetoast/wetoast.js')
App({
  WeToast,
  onLaunch: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.modelMessage = res
        console.log(that.globalData.modelMessage)
      }
    })

    wx.checkSession({
      success: function () {
        console.log('checkSession is valid.')
      },
      fail: function () {
        console.log('checkSession is not valid.')
        util.weixinLogin()
      }
    })

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    modelMessage: ''
  }
})