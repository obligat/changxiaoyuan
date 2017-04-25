//index.js
var app = getApp()
var sort = require('../../utils/sort')
Page({
  data: {
    username: wx.getStorageSync('username') || '',
    searchInput: '',
    opacity: 1,
    courseMessage: wx.getStorageSync('courseMessage') || '',
    current: 0
  },
  handleKeyInput(e) {
    console.log(e)
    this.setData({
      searchInput: e.detail.value
    })
  },

  handConfirmSearch(e) {
    var words = e.detail.value
    if (words) {
      wx.navigateTo({
        url: '../bookList/bookList?words=' + encodeURIComponent(words)
      })
    }
  },
  handleLogin() {
    wx.navigateTo({
      url: '../loginZhiHuiClass/loginZhiHuiClass'
    })
  },
  clearSearchInput() {
    this.setData({
      searchInput: ''
    })
  },
  handleBorrow() {

    if (wx.getStorageSync('libInfo').username) {
      wx.navigateTo({
        url: '../borrow/borrow'
      })
    } else {
      wx.navigateTo({
        url: '../loginLibrary/loginLibrary'
      })
    }
  },
  onLoad: function () {
    console.log('index  onload : username: ' + this.data.username)
    console.log('index onload :courseMessage : ')
    console.log(this.data.courseMessage)
    var day = new Date()
    var week = day.getDay()
    if (week != 0 && week != 5) {
      this.setData({
        current: week - 1
      })
    }
  },
  onShow() {
    if (!this.data.username && wx.getStorageSync('username')) {
      this.setData({
        username: wx.getStorageSync('username')
      })
      var that = this
      wx.request({
        url: 'https://wwwxinle.cn/wechatapp/schedule.php',
        data: {
          session_3rd: wx.getStorageSync('session_3rd')
        },
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          var filterResult = sort.filterByWeekNum(res.data.Obj)
          var sortResult = sort.sortByJT_NO(filterResult)
          wx.setStorageSync('courseMessage', sort.formatWeek(sortResult))
          console.log('test====')
          console.log(sortResult)
          that.setData({
            courseMessage: wx.getStorageSync('courseMessage')
          })
        }
      })
    } else if (this.data.username && !wx.getStorageSync('username')) {
      this.setData({
        username: ''
      })
    }
  }
})
