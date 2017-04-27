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
    var that = this
    var username = wx.getStorageSync('libInfo').username
    var password = wx.getStorageSync('libInfo').password
    this.setData({
      username: username
    })
    wx.request({
      url: 'https://libapi.changxiaoyuan.com/index.php?do=user&username=' + username + '&password=' + password,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (res.data) {
          var borrowInfo = res.data.book
          borrowInfo.forEach(function (item) {
            var days = util.getIntervalDays(item.time)
            if (days >= 0) {
              Object.assign(item, { returnInfo: '剩余 ' + days + ' 天' })
            } else {
              Object.assign(item, { returnInfo: '超期 ' + (-days) + ' 天' })
            }
          })
          that.setData({
            borrowInfo: borrowInfo
          })
        }
      }
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
      method: 'GET',
      success: function (res) {
        var currentBook = borrowInfo.find(function (item) {
          if (item.bookid == bookid) {
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
      }
    })
  }
})