// pages/borrow/borrow.js
var util = require('../../utils/util')
Page({
  data: {
    username: '',
    borrowInfo: ''
  },
  logoutLibrary() {
    wx.setStorageSync('libInfo', "")
    wx.redirectTo({
      url: '../loginLibrary/loginLibrary'
    })
  },
  onLoad: function (options) {
    var borrowInfo = wx.getStorageSync('libInfo').borrowInfo
    borrowInfo.forEach(function (item) {
      var days = util.getIntervalDays(item.time)
      if (days >= 0) {
        Object.assign(item, { returnInfo: '剩余 ' + days + ' 天' })
      } else {
        Object.assign(item, { returnInfo: '超期 ' + (-days) + ' 天' })
      }
    })
    this.setData({
      username: wx.getStorageSync('libInfo').username,
      borrowInfo: borrowInfo
    })
  },
  handleRenew(e) {
    console.log(e.target.dataset)
    var that = this
    var bookid = e.target.dataset.bookid
    var borrowInfo = this.data.borrowInfo
    wx.request({
      url: 'https://libapi.changxiaoyuan.com/index.php?do=renew&ctrlid=' + bookid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var currentBook = borrowInfo.find(function (item) {
          if (item.bookid == bookid) {
            item.time = '2017/05/24'
            item.returnInfo = '剩余 30 天'
            item.renew = false
            return item
          }
        })
        that.setData({
          borrowInfo: borrowInfo
        })
        wx.showToast({
          title: '续借成功'
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
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